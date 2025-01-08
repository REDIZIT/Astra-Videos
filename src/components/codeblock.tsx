import { CODE, parseCodeScope, Code, CodeTag, Layout, LezerHighlighter, Rect, RectProps, Txt, signal, CodeSignal, PossibleCodeScope } from "@motion-canvas/2d";
import { Reference, SignalGenerator, SignalValue, SimpleSignal, ThreadGenerator, all, createRef, useLogger } from "@motion-canvas/core";
import { parser as parser_cs } from '../parser/cs/lang';
import { parser as parser_cs2 } from 'lezer-csharp-simple';
import { parser as parser_nasm } from '../parser/nasm/nasm';
import { parser as parser_cpp } from '@lezer/cpp';
import { colors } from '../utils/colorscheme'
import { CSharpCodeHighlighter } from '../scenes/CSharpCodeHighlighter';
import { NasmCodeHighlighter } from '../scenes/NasmCodeHighlighter';
import { AstraCodeHighlighter } from "../scenes/AstraCodeHighlighter";
import llvm from "../scenes/llvm";
import { LLVMCodeHighlighter } from "../scenes/LLVMCodeHighlighter";

export interface CodeBlockProps extends RectProps {
    extension?: SignalValue<string>
    codeContent: SignalValue<string>
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
    tab_width: number

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
        const ext = this.extension()
        if (ext != null) {
            if (ext == "c#") {
                highlighter = new CSharpCodeHighlighter(props.custom_refTypes)
            }
            else if (ext == "astra") {
                highlighter = new AstraCodeHighlighter(props.custom_refTypes)
            }
            else if (ext.endsWith("asm") || ext == "gas") {
                highlighter = new NasmCodeHighlighter(props.custom_refTypes)
            }
            else if (ext == "llvm ir") {
                highlighter = new LLVMCodeHighlighter(props.custom_refTypes)
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

        this.tab_width = props.tab_width > 0 ? props.tab_width : 4
        
        this.setCode(this.codeContent().toString())
    }


    animateCode(codeString: string, duration: number = 0) {

        // Rude first line measure text (extension space + char width * chars count in first line)
        const extensionLength = this.extension() ? this.extension().toString().length + 4 : 0
        const firstLineWidth = 12 * extensionLength + 12 * codeString.split('\n')[0].length

        return all(
            this.code().code(codeString.replace(/\t/g, ' '.repeat(this.tab_width)), duration),
            this.minWidth(firstLineWidth, duration)
        )
    }
    setCode(codeString: string) {

        // Rude first line measure text (extension space + char width * chars count in first line)
        const extensionLength = this.extension() ? this.extension().toString().length + 4 : 0
        const firstLineWidth = 12 * extensionLength + 12 * codeString.split('\n')[0].length

        this.code().code(codeString.replace(/\t/g, ' '.repeat(this.tab_width)))
        this.minWidth(firstLineWidth)
    }
}