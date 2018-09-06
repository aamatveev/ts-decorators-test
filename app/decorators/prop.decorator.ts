import "reflect-metadata";

import { constructorMetadataKey, descriptorMetadataKey, propertiesMetadataKey } from "./symbols";

/**
 * @param descriptor
 */
export function prop<T>(ctor?: new (params?: T) => T) {
    return (target: any, propertyKey: string) => {
        const prevDescriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        const properties: string[] = Reflect.getMetadata(propertiesMetadataKey, target) || [];

        Reflect.defineMetadata(propertiesMetadataKey, properties.concat([propertyKey]), target);
        Reflect.defineMetadata(descriptorMetadataKey, prevDescriptor, target, propertyKey);
        Reflect.defineMetadata(constructorMetadataKey, ctor, target, propertyKey);
    };
}
