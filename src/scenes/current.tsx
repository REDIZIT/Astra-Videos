import { CODE, makeScene2D, Layout, Code, LezerHighlighter, Rect, Img } from '@motion-canvas/2d';
import { Direction, all, chain, createRef, delay, easeInCubic, easeOutBack, linear, slideTransition, useLogger, waitFor } from '@motion-canvas/core';
import { CodeBlock } from '../components/codeblock';


export default makeScene2D(function* (view) {

	const ref_astra = createRef<CodeBlock>()
	const ref_llvm = createRef<CodeBlock>()

	const code_astra = `class program
{
	public main(): i32
	{
		i32 a = 10
		i32 b = 2
		i32 c = a * (2 + b)

		if (a > (b + 1) * 2)
		{
			return 100 - 1
		}

		return 42
	}
}`

	const code_llvm = `define i32 @main()
{
	%ptr_0_i32 = alloca i32
	store i32 10, ptr %ptr_0_i32
	
	%a = alloca i32
	%tmp_0_ptr = load i32, ptr %ptr_0_i32
	store i32 %tmp_0_ptr, ptr %a
	
	%ptr_1_i32 = alloca i32
	store i32 2, ptr %ptr_1_i32
	
	%b = alloca i32
	%tmp_1_ptr = load i32, ptr %ptr_1_i32
	store i32 %tmp_1_ptr, ptr %b
	
	%ptr_2_i32 = alloca i32
	store i32 2, ptr %ptr_2_i32
	
	%tmp_2_i32 = load i32, ptr %ptr_2_i32
	%tmp_3_i32 = load i32, ptr %b
	%tmp_4_i32 = add i32 %tmp_2_i32, %tmp_3_i32
	
	%tmp_5_i32 = load i32, ptr %a
	%tmp_6_i32 = mul i32 %tmp_5_i32, %tmp_4_i32
	
	%c = alloca i32
	store i32 %tmp_6_i32, ptr %c
	
	%ptr_3_i32 = alloca i32
	store i32 1, ptr %ptr_3_i32
	
	%tmp_7_i32 = load i32, ptr %b
	%tmp_8_i32 = load i32, ptr %ptr_3_i32
	%tmp_9_i32 = add i32 %tmp_7_i32, %tmp_8_i32
	
	%ptr_4_i32 = alloca i32
	store i32 2, ptr %ptr_4_i32
	
	%tmp_10_i32 = load i32, ptr %ptr_4_i32
	%tmp_11_i32 = mul i32 %tmp_9_i32, %tmp_10_i32
	
	%tmp_12_i32 = load i32, ptr %a
	%tmp_13_i1 = icmp sgt i32 %tmp_12_i32, %tmp_11_i32
	
	br i1 %tmp_13_i1, label %if_true, label %if_end
if_true:
	
	%ptr_5_i32 = alloca i32
	store i32 100, ptr %ptr_5_i32
	
	%ptr_6_i32 = alloca i32
	store i32 1, ptr %ptr_6_i32
	
	%tmp_14_i32 = load i32, ptr %ptr_5_i32
	%tmp_15_i32 = load i32, ptr %ptr_6_i32
	%tmp_16_i32 = sub i32 %tmp_14_i32, %tmp_15_i32
	
	ret i32 %tmp_16_i32
	br label %if_end
if_end:
	
	
	%ptr_7_i32 = alloca i32
	store i32 42, ptr %ptr_7_i32
	
	%tmp_17_i32 = load i32, ptr %ptr_7_i32
	ret i32 %tmp_17_i32
}`

	view.add(<>
		<CodeBlock ref={ref_astra} codeContent={code_astra} extension="astra" opacity={0} width={440} />
		<CodeBlock ref={ref_llvm} codeContent={code_llvm} extension="llvm ir" opacity={0} />
	</>)


	ref_astra().y(100)
	yield* all(
		ref_astra().opacity(1, 0.5),
		ref_astra().y(0, 0.5),
	)
	yield* waitFor(1)


	ref_llvm().y(1000)
	yield* all(
		ref_astra().y(-1000, 0.6),
		ref_llvm().opacity(1, 0.25),
		ref_llvm().y(-2000, 1),
	)
	yield* waitFor(1)
});