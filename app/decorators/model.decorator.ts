import { setKnownFields } from "./set-known-fields.decorator";

export function model() {
    return <T>(constructor: new (params?: T) => T) => {
        // tslint:disable-next-line:no-eval
        const newConstructor = eval(
            function(this: T, ...args: any[]) {
                const params = args[0];
                constructor.apply(this, args);
                setKnownFields(this, params);
            }.toString().replace("function", `function ${constructor.name}`) + constructor.name,
        ) as any as new (params?: Partial<T>) => T;
        newConstructor.prototype = constructor.prototype;
        newConstructor.prototype.constructor = newConstructor;
        return newConstructor;
    };
}
