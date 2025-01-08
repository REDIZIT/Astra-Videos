import { CODE, makeScene2D, Layout, Spline, Txt, word, Img, Rect, lines } from '@motion-canvas/2d';
import { DEFAULT, Direction, Reference, ThreadGenerator, all, chain, createRef, delay, easeInCubic, slideTransition, useLogger, waitFor } from '@motion-canvas/core';
import { CodeBlock } from '../components/codeblock';


export default makeScene2D(function* (view) {

    const ref_layout = createRef<Layout>()

    const ref_lexerRect = createRef<Rect>()
    const ref_lexerText = createRef<Txt>()

    const ref_parserRect = createRef<Rect>()
    const ref_parserText = createRef<Txt>()

    const ref_generatorRect = createRef<Rect>()
    const ref_generatorText = createRef<Txt>()

    const ref_arrow1 = createRef<Spline>()
    const ref_arrow2 = createRef<Spline>()
    const ref_arrow3 = createRef<Spline>()
    const ref_arrow4 = createRef<Spline>()

    const ref_code = createRef<CodeBlock>()
    const ref_code2 = createRef<CodeBlock>()

    const code_token = `public class Token_MathExpression : Token
{
    public string expression;
    public string variableToAssign;

    public override string Generate(ScopeContext ctx)
    {
        string asm = MathExpressions.Generate(expression, ctx);

        if (variableToAssign == null)
        {
            // Put (don't touch) result of calculation into rax
            return $"{asm}";
        }
        else
        {
            // Put result of calculation into variable
            return $"{asm}mov {ctx.GetRSPIndex(variableToAssign)}, rbx";
        }
    }
}`

    const code_1 = `print "abc"`

    const ref_layout_ast = createRef<Layout>()
    const ref_nasm = createRef<CodeBlock>()

    const codes = [
        `; alloc tmp1
sub rsp, 4

; tmp1 = c * 2
mov qword [rbp-16], [rbp-12]
imul [rbp-16], 2

; myFunc(a, b, tmp1)
push qword [rbp-12]
push qword [rbp-8]
push qword [rbp-4]
call myFunc
add rbp, 12

; alloc tmp2
sub rsp, 4

; tmp2 = myFunc(a, b, tmp1)
mov [rbp-20], rdx

; alloc tmp3
sub rsp, 4

; tmp3 = tmp2 + 5
mov qword [rbp-24], [rbp-20]
add [rbp-24], 5

; alloc value
sub rsp, 4

; value = tmp3
mov qword [rbp-28], [rbp-24]
`
    ]


    const arrow_width = 70

    const ast: Array<Reference<Layout>> = []
    for (var i = 0; i < 15; i++) {
        ast.push(createRef<Layout>())
    }

    view.add(<>

        <Layout ref={ref_layout} opacity={0}>
            <Rect ref={ref_lexerRect} fill="#242424" layout radius={16} padding={[16, 24, 12, 24]} shadowColor="#0c0c0c" shadowBlur={25} shadowOffset={[0, 10]}>
                <Txt ref={ref_lexerText} text="Лексер" fill="#eee" fontSize={22} />
            </Rect>
            <Rect ref={ref_parserRect} fill="#242424" layout radius={16} padding={[16, 24, 12, 24]} shadowColor="#0c0c0c" shadowBlur={25} shadowOffset={[0, 10]}>
                <Txt ref={ref_parserText} text="Парсер" fill="#eee" fontSize={22} />
            </Rect>
            <Rect ref={ref_generatorRect} fill="#242424" layout radius={16} padding={[16, 24, 12, 24]} shadowColor="#0c0c0c" shadowBlur={25} shadowOffset={[0, 10]}>
                <Txt ref={ref_generatorText} text="Генератор" fill="#eee" fontSize={22} />
            </Rect>

            <Spline ref={ref_arrow1} points={[[-arrow_width, 0], [arrow_width, 0]]} stroke={"#555"} lineWidth={8} smoothness={0} endArrow arrowSize={10}>
                <Txt text="Символы" fill="#888" fontSize={22} y={-28} />
            </Spline>
            <Spline ref={ref_arrow2} points={[[-arrow_width, 0], [arrow_width, 0]]} stroke={"#555"} lineWidth={8} smoothness={0} endArrow arrowSize={10}>
                <Txt text="Токены" fill="#888" fontSize={22} y={-28} />
            </Spline>
            <Spline ref={ref_arrow3} points={[[-arrow_width, 0], [arrow_width, 0]]} stroke={"#555"} lineWidth={8} smoothness={0} endArrow arrowSize={10}>
                <Txt text="AST" fill="#888" fontSize={22} y={-28} />
            </Spline>
            <Spline ref={ref_arrow4} points={[[-arrow_width, 0], [arrow_width, 0]]} stroke={"#555"} lineWidth={8} smoothness={0} endArrow arrowSize={10}>
                <Txt text="Машинный код" fill="#888" fontSize={22} y={-28} />
            </Spline>
        </Layout>

        <CodeBlock ref={ref_code} codeContent={code_token} extension="c#" opacity={0} custom_refTypes={new Set(["MathExpressions", "ScopeContext"])} />
        <CodeBlock ref={ref_code2} codeContent={code_1} extension="astra" opacity={0} />


        <Layout ref={ref_layout_ast} opacity={0}>
            <Txt ref={ast[0]} text="=" fill="#eee" fontSize={28} fontWeight={1000} />

            <Spline ref={ast[1]} points={[[20, 20], [120, 70]]} stroke={"#aaa"} lineWidth={3} smoothness={0} lineCap="round"/>
            <Txt ref={ast[2]} text="alloc i32 value" fill="#eee" fontSize={26} y={100} x={-150} />
            <Spline ref={ast[3]} points={[[-20, 20], [-120, 70]]} stroke={"#aaa"} lineWidth={3} smoothness={0} lineCap="round" />
            <Txt ref={ast[4]} text="+" fill="#eee" fontSize={26} y={100} x={150} fontWeight={1000} />

            <Spline ref={ast[5]} points={[[150 + 30, 100 + 20], [270, 100 + 70]]} stroke={"#aaa"} lineWidth={3} smoothness={0} lineCap="round" />
            <Txt ref={ast[6]} text="5" fill="#eee" fontSize={28} y={200} x={150 + 150} />
            <Spline ref={ast[7]} points={[[150 - 30, 100 + 20], [10, 100 + 70]]} stroke={"#aaa"} lineWidth={3} smoothness={0} lineCap="round" />
            <Txt ref={ast[8]} text="myFunc(a, b, tmp1)" fill="#eee" fontSize={26} y={200} x={150 - 150} />

            <Spline ref={ast[9]} points={[[0, 200 + 30], [0, 200 + 70]]} stroke={"#aaa"} lineWidth={3} smoothness={0} lineCap="round" />
            <Txt ref={ast[10]} text="*" fill="#eee" fontSize={28} y={300 + 10} x={0} fontWeight={1000} />

            <Spline ref={ast[11]} points={[[20, 300 + 30], [130, 300 + 70]]} stroke={"#aaa"} lineWidth={3} smoothness={0} lineCap="round" />
            <Txt ref={ast[12]} text="2" fill="#eee" fontSize={28} y={400} x={150} />
            <Spline ref={ast[13]} points={[[-20, 300 + 30], [-130, 300 + 70]]} stroke={"#aaa"} lineWidth={3} smoothness={0} lineCap="round" />
            <Txt ref={ast[14]} text="c" fill="#eee" fontSize={26} y={400} x={-150} />

        </Layout>

        <CodeBlock ref={ref_nasm} codeContent={codes[0]} extension="nasm" opacity={0} />
    
    </>)



    yield* slideTransition(Direction.Right, 0.5)


    yield* all(
        delay(0.2, ref_layout().opacity(1, 0.5)),

        ref_arrow1().x(-450, 0.5),
        ref_lexerRect().x(-300, 0.5),
        ref_arrow2().x(-150, 0.5),
        ref_parserRect().x(0, 0.5),
        ref_arrow3().x(150, 0.5),
        ref_generatorRect().x(16 + 300, 0.5),
        ref_arrow4().x(16 * 2 + 450, 0.5),
    )

    yield* waitFor(1)


    yield* all(
        ref_parserRect().opacity(0, 0.5),
        ref_arrow2().opacity(0, 0.5),
        ref_arrow3().opacity(0, 0.5),
    )

    yield* waitFor(0.25)


    yield* all(
        ref_lexerText().text("Tokenizer", 0.5),
        ref_generatorText().text("Generator", 0.5),
    )

    yield* waitFor(0.5)


    ref_arrow2().x(0)
    yield* all(
        ref_arrow2().opacity(1, 0.5),
        ref_lexerRect().x(-160, 0.5),
        ref_generatorRect().x(160, 0.5),
        ref_arrow1().x(-318, 0.5),
        ref_arrow4().x(318, 0.5),
    )

    yield* waitFor(0.5)


    ref_code().y(1000)
    yield* all(
        ref_layout().y(-350, 0.5),
        ref_code().opacity(1, 0.5),
        ref_code().y(90, 0.5),
    )

    yield* waitFor(1)




    ref_code2().y(1000)
    yield* all(
        ref_code2().opacity(1, 0.5),
        ref_code2().y(0, 0.5),
        ref_code().opacity(0, 0.5),
        ref_code().y(1000, 0.5),
    )

    yield* waitFor(1)



    yield* ref_code2().animateCode(`reverse "123"`, 0.5)

    yield* waitFor(1)



    yield* all(
        ref_code2().animateCode(`int value = myFunc(a, b, c * 2) + 5`, 0.5),
        ref_code2().y(-200, 0.5),
        ref_layout().y(-1000, 0.5),
    )
    yield* waitFor(1)



    ref_layout_ast().y(-150)
    yield* all(
        ref_layout_ast().opacity(1, 0.5),
        ref_layout_ast().y(-50, 0.5),
    )
    yield* waitFor(1)


    ref_nasm().x(1000)
    ref_nasm().y(-460)
    ref_nasm().offset([0, -1])
    ref_nasm().minWidth(480)
    yield* all(
        ref_layout_ast().x(-340, 0.5),
        ref_code2().x(-340, 0.5),
        ref_code2().y(-300, 0.5),
        ref_layout_ast().y(-100, 0.5),
        ref_nasm().opacity(1, 0.5),
        ref_nasm().x(380, 0.5),
    )
    yield* waitFor(1)


    const tasks: Array<ThreadGenerator> = []
    for (var i = 0; i < ast.length; i++) {
        tasks.push(ast[i]().opacity(0.15, 0.5))
    }
    tasks.push(ref_nasm().code().selection(word(0, 0, 0), 0.5))

    yield* all(...tasks)
    yield* waitFor(1)



    yield* all(
        ast[14]().opacity(1, 0.5),
        ref_nasm().code().selection(lines(0, 1), 0.5)
    )
    yield* waitFor(0.25)

    yield* all(
        ast[12]().opacity(1, 0.5),
        ast[13]().opacity(1, 0.5),
        ast[11]().opacity(1, 0.5),
        ast[10]().opacity(1, 0.5),
        ref_nasm().code().selection(lines(0, 5), 0.5)
    )
    yield* waitFor(0.25)

    yield* all(
        ast[9]().opacity(1, 0.5),
        ast[8]().opacity(1, 0.5),
        ref_nasm().code().selection(lines(0, 18), 0.5)
    )
    yield* waitFor(0.25)

    yield* all(
        ast[7]().opacity(1, 0.5),
        ast[6]().opacity(1, 0.5),
        ast[5]().opacity(1, 0.5),
        ast[4]().opacity(1, 0.5),
        ref_nasm().code().selection(lines(0, 25), 0.5)
    )
    yield* waitFor(0.25)

    yield* all(
        ast[2]().opacity(1, 0.5),
        ref_nasm().code().selection(lines(0, 28), 0.5)
    )
    yield* waitFor(0.25)

    yield* all(
        ast[3]().opacity(1, 0.5),
        ast[1]().opacity(1, 0.5),
        ast[0]().opacity(1, 0.5),
        ref_nasm().code().selection(DEFAULT, 0.5)
    )
    yield* waitFor(0.25)



    yield* waitFor(1)
});
