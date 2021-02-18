import { ISchema } from "../lib/model/field-options-schema";
import { IOptionsModel } from "../lib/model/options-model";
export declare function diff(lhs: Object, rhs: Object, schema: ISchema | undefined, options: IOptionsModel | undefined, next: any): void;
export declare function diffAsXml(lhs: string, rhs: string, schema: ISchema | undefined, options: IOptionsModel | undefined, next: any): void;
