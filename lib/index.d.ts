import {Logs} from './log';

export {default as plugins} from './plugins';

export interface Output {
    result: {
        html: string;
        title: string;
        headings: any[];
        assets: any[];
        meta: object;
    };
    logs: Logs;
}

export interface Options {
    [key: string]: any;
}

export default function transform(input: string, options?: Options): Output;
