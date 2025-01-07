import { CODE, parseCodeScope, Code, CodeTag, Layout, LezerHighlighter, Rect, RectProps, Txt, signal } from "@motion-canvas/2d";
import { Reference, SignalValue, SimpleSignal, createRef, useLogger } from "@motion-canvas/core";
import { parser as parser_cs } from '../parser/cs/lang';
import { parser as parser_cs2 } from 'lezer-csharp-simple';
import { parser as parser_nasm } from '../parser/nasm/nasm';
import { parser as parser_cpp } from '@lezer/cpp';
import { colors } from '../utils/colorscheme'
import { CSharpCodeHighlighter } from '../scenes/CSharpCodeHighlighter';
import { NasmCodeHighlighter } from '../scenes/NasmCodeHighlighter';

export interface CodeBlockProps extends RectProps {
    extension?: SignalValue<string>
    codeContent: SignalValue<CodeTag[]>
    custom_refTypes?: Set<string>
    tab_width?: number
}

export function ToCode(
    strings: string,
    ...tags: CodeTag[]
): CodeTag[] {
    const result: CodeTag[] = [];

    result.push(strings);
    const tag = tags[0];
    if (tag !== undefined) {
        if (Array.isArray(tag)) {
            result.push(...tag);
        } else {
            result.push(tag);
        }
    }

    return result;
}

export class CodeBlock extends Rect {
    @signal()
    public declare readonly extension?: SimpleSignal<string, this>;

    @signal()
    public declare readonly codeContent: SimpleSignal<CodeTag[], this>;

    code: Reference<Code>;

    public constructor(props: CodeBlockProps) {
        super({
            fill: "#242424",
            radius: 12,
            padding: [16, 24, 10, 24],
            scale: 1,
            shadowColor: "#0c0c0c",
            shadowBlur: 25,
            shadowOffset: [0, 10],
            ...props,
            layout: true,
            direction: "column",
        });

        const ref_code = createRef<Code>();

        this.code = ref_code;


        let highlighter = null
        if (this.extension() != null) {
            if (this.extension() == "c#") {
                highlighter = new CSharpCodeHighlighter(props.custom_refTypes)
            }
            else if (this.extension().endsWith("asm") || this.extension() == "gas") {
                highlighter = new NasmCodeHighlighter(props.custom_refTypes)
            }
        }

        this.add(<>
            <Rect layout fontSize={18} height={0}>
                <Layout grow={1} />
                <Txt text={this.extension} fill="#aaa" />
            </Rect>
            <Code
                ref={ref_code}
                fill="#eee"
                fontSize={22}
                highlighter={highlighter}
            />
        </>);

        const tab_width = props.tab_width > 0 ? props.tab_width : 4

        ref_code().code(this.codeContent().toString().replace(/\t/g, ' '.repeat(tab_width)))
    }
}