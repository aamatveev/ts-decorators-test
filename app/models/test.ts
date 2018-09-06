import { TestChild } from "./test-child";
import { model } from "../decorators/model.decorator";
import { prop } from "../decorators/prop.decorator";

@model()
export class Test {
    @prop() id!: number;
    @prop() name!: string;
    @prop() arrStr!: string[];
    @prop() obj: TestChild = new TestChild();

    @prop(TestChild) arrObj: TestChild[] = new Array<TestChild>();

    // tslint:disable-next-line:no-empty
    constructor(params?: Partial<Test>) { }
}
