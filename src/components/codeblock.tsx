import { Code, CodeTag, Layout, LezerHighlighter, Rect, RectProps, Txt, signal } from "@motion-canvas/2d";
import { Reference, SignalValue, SimpleSignal, createRef } from "@motion-canvas/core";
//import { parser } from '@lezer/java';
import { parser } from '../parser/lang';
import { colors } from '../utils/colorscheme'

export interface CodeBlockProps extends RectProps {
    extension: SignalValue<string>;
    codeContent: SignalValue<CodeTag[]>;
}

export class CodeBlock extends Rect {
    @signal()
    public declare readonly extension: SimpleSignal<string, this>;

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

        const code = createRef<Code>();

        this.code = code;

        let highlighter = null
        if (this.extension() == "c#") {
            highlighter = new LezerHighlighter(parser, colors.codeStyle)
        }

        this.add(<>
            <Rect layout fontSize={18} height={0}>
                <Layout grow={1} />
                <Txt text={this.extension} fill="#aaa" />
            </Rect>
            <Code
                ref={code}
                code={this.codeContent}
                fill="#eee"
                fontSize={22}
                highlighter={highlighter}
            />
        </>);
    }
}