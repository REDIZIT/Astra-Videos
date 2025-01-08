import { CODE, makeScene2D, Layout, Code, LezerHighlighter, Rect, Img, Txt } from '@motion-canvas/2d';
import { Direction, all, chain, createRef, delay, easeInCubic, easeOutBack, fadeTransition, linear, slideTransition, useLogger, waitFor } from '@motion-canvas/core';
import { CodeBlock } from '../components/codeblock';
import image from '../../external/acceptable.png'


export default makeScene2D(function* (view) {

	const ref_layout = createRef<Layout>()
	const ref_llvm = createRef<CodeBlock>()
	const ref_label = createRef<Txt>()
	const ref_ssa = createRef<Txt>()

	const ref_img = createRef<Img>()

	const code_llvm = `%custom_struct = type { i8, i32, i32 }

define i32 @sum(i32 %a, i32 %b)
{
	%result = add i32 %a, %b
	ret i32 %result
}`

	const ssa = "SSA (англ. Static single assignment form) — промежуточное представление, используемое компиляторами, в котором каждой переменной значение присваивается лишь единожды. Переменные исходной программы разбиваются на версии, обычно с помощью добавления суффикса, таким образом, что каждое присваивание осуществляется уникальной версии переменной."

	view.add(<>
		<Layout ref={ref_layout} opacity={1}>
			<Txt ref={ref_label} text="LLVM" fontSize={64} fontWeight={1000} fill="#eee" y={-200} letterSpacing={6} opacity={0} />
			<CodeBlock ref={ref_llvm} codeContent={code_llvm} extension="llvm ir" opacity={0} />
			<Txt ref={ref_ssa} text={ssa} fontSize={22} fill="#888" y={500} width={1100} height={300} textWrap={true} textAlign="center" opacity={0} />
		</Layout>
		<Img ref={ref_img} src={image} opacity={0} />
	</>)

	yield* slideTransition(Direction.Right, 0.5)
	yield* waitFor(1)


	yield* ref_label().opacity(1, 0.5)
	yield* waitFor(1)


	yield* ref_llvm().opacity(1, 0.5)
	yield* waitFor(1)


	yield* ref_ssa().opacity(1, 0.5)
	yield* waitFor(1)


	yield* ref_layout().opacity(0, 0.5)
	yield* waitFor(1)


	yield* ref_img().opacity(1, 0.15)
	yield* waitFor(1.5)
	yield* ref_img().opacity(0, 0.3)
	yield* waitFor(1)
});