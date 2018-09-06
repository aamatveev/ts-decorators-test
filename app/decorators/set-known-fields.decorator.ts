import "reflect-metadata";

import { constructorMetadataKey, descriptorMetadataKey, propertiesMetadataKey } from "./symbols";

const STANDARD_DESCRIPTOR = Object.getOwnPropertyDescriptor({ field: undefined }, "field");

export function setKnownFields<T>(model: T, params?: Partial<T>) {
    const properties = (Reflect.getMetadata(propertiesMetadataKey, model) || []) as [keyof T];
    properties.forEach((key) => {
        const descriptor = Reflect.getMetadata(descriptorMetadataKey, model, key as string);
        Object.defineProperty(model, key, { ...STANDARD_DESCRIPTOR, value: model[key], ...descriptor });
    });

    if (params) {
        properties
            .filter((key) => params[key] !== undefined)
            .filter((key) => {
                const propConstructor = Reflect.getMetadata("design:type", model, key as any);
                const value = params[key];

                const isChecked = (
                    false
                    || (value === null && propConstructor !== Object)
                    || propConstructor.name === "Array"
                    || value.constructor.name === "Object"
                    || value.constructor === propConstructor
                    || value instanceof propConstructor
                );

                if (!isChecked) {
                    // tslint:disable-next-line:no-console
                    console.warn(
                        `Object aren't assignable by key - ${key} `,
                        `must be ${propConstructor.name}, `,
                        `but get ${typeof value}`,
                    );
                }
                return isChecked;
            })
            .forEach((key) => {
                // if property is Array
                if (params[key] instanceof Array) {
                    const valueArray: any[] = params[key] as any as any[];
                    if (valueArray.length > 0) {
                        const testType = valueArray[0];
                        if (typeof testType !== "object") {
                            // if array of primitives
                            model[key] = params[key] as T[keyof T];
                        } else {
                            // if array of objects
                            const constructor = Reflect.getMetadata(constructorMetadataKey, model, key as string);
                            const propAsArray = (model[key] as any as any[]);

                            if (constructor) {
                                valueArray.forEach((item: any, index: number) => {
                                    propAsArray.push(new constructor());
                                    setKnownFields(propAsArray[index], item);
                                });
                            } else {
                                // tslint:disable-next-line:no-console
                                console.warn(
                                    `decorator @prop must have parametr 'ctor' for property,`,
                                    `that type is Array,`,
                                    `class: ${model.constructor.name},`,
                                    `property: ${key}`,
                                );
                            }
                        }
                    }
                } else if (model[key] && typeof model[key] === "object") {
                    // if property is object
                    setKnownFields(model[key], params[key]);
                } else {
                    // if property is primitive
                    model[key] = params[key] as T[keyof T];
                }
            },

        );
    }
}
