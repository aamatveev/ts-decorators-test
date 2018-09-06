import { model } from "../decorators/model.decorator";
import { prop } from "../decorators/prop.decorator";

@model()
export class TestChild {
    @prop() id!: number;
    @prop() name!: string;
    @prop() description!: string;
    // tslint:disable-next-line:no-empty
    constructor(params?: Partial<TestChild>) { }
}
