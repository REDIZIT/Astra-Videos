import { CODE, makeScene2D, Layout, Spline, Txt } from '@motion-canvas/2d';
import { all, chain, createRef, delay, easeInCubic, waitFor } from '@motion-canvas/core';
import { CodeBlock } from '../components/codeblock';


export default makeScene2D(function* (view) {

    const ref_print = createRef<CodeBlock>()
    const ref_asm = createRef<CodeBlock>()
    const ref_cs = createRef<CodeBlock>()

    const code_asm = CODE`mov rax, 1
mov rdi, 1
mov rsi, msg
mov rdx, 13
syscall`

    const ref_arrow = createRef<Spline>()
    const ref_arrow2 = createRef<Spline>()

    const arrow_width = 60;

    const layout_1 = createRef<Layout>()
    const layout_2 = createRef<Layout>()

    const ref_cs_token = createRef<CodeBlock>()

    const code_cs_token = `public abstract class Token
{
\tpublic abstract string Generate();
}
public class Token_Print : Token
{
\tpublic override string Generate()
\t{
\t\treturn @"mov rax, 1
mov rdi, 1
mov rsi, msg
mov rdx, 13, true, ffalse
syscall
";
\t}
}`


    view.add(
        <>
            <Layout ref={layout_1}>
                <Txt text={code_cs_token.toString()} fontSize={24} fill={"white"} columnGap={999 } />
                <CodeBlock ref={ref_print} codeContent={CODE`print`} extension="astra" width={160} />
                <CodeBlock ref={ref_asm} codeContent={code_asm} extension="nasm" width={240} />
                <CodeBlock ref={ref_cs} codeContent={CODE`Token_Print`} extension="c#" width={220} />
                <Spline ref={ref_arrow} points={[[-arrow_width, 0], [arrow_width, 0]]} stroke={"#555"} lineWidth={8} smoothness={0} endArrow arrowSize={10} />
                <Spline ref={ref_arrow2} points={[[-arrow_width, 0], [arrow_width, 0]]} stroke={"#555"} lineWidth={8} smoothness={0} endArrow arrowSize={10} />
            </Layout>
            <Layout ref={layout_2}>
                <CodeBlock ref={ref_cs_token} codeContent={code_cs_token} extension="c#" />
            </Layout>
        </>
       
    )

    

    // 1

    ref_print().opacity(0)
    ref_asm().opacity(0)
    ref_cs().opacity(0)
    ref_arrow().opacity(0)
    ref_arrow2().opacity(0)
    ref_cs_token().opacity(0)

    yield* waitFor(1)

    yield* ref_print().opacity(1, 0.2)

    yield* waitFor(1)

    
    // 2

    ref_asm().x(200 + 40)

    yield* all(
        ref_print().x(-200, 0.5),
        delay(0.2, ref_asm().opacity(1, 0.5)),
        delay(0.2, ref_arrow().opacity(1, 0.5)),
    )

    yield* waitFor(1)


    // 3

    ref_arrow2().x(200 + 40)

    yield* all(
        ref_arrow().x(-200 - 40, 0.5),
        ref_print().x(-400 - 40, 0.5),
        ref_asm().x(400 + 90, 0.5),
        delay(0.2, ref_arrow2().opacity(1, 0.5)),
        delay(0.2, ref_cs().opacity(1, 0.5)),
    )

    yield* waitFor(1)



    // 4

    ref_cs_token().y(1000)
    yield* all(
        layout_1().y(-300, 0.5),
        ref_cs_token().y(100, 0.5),
        ref_cs_token().opacity(1, 0.5),
    )

    yield* waitFor(1)
});
