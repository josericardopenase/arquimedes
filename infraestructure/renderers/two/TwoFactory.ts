import {IRendererPlugin} from "../IRendererPlugin";
import Two from "two.js";

export interface Options {
    container?: HTMLElement;
    plugins?: IRendererPlugin[];
}

export class TwoFactory{
    static fromOptions(options: Options = {}) {
        return new Two({
            type: Two.Types.webgl,
            fullscreen: !options?.container,
            height: options?.container?.offsetHeight ?? document.body.offsetHeight,
            width: options?.container?.offsetWidth ?? document.body.offsetWidth,
        }).appendTo(options?.container || document.body);
    }
}