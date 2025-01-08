import { CODE, makeScene2D, Layout, Code, LezerHighlighter, Rect, Img } from '@motion-canvas/2d';
import { all, chain, createRef, delay, easeInCubic, easeOutBack, linear, useLogger, waitFor } from '@motion-canvas/core';
import { CodeBlock } from '../components/codeblock';
import chatgptIcon from '../../external/chatgpt-icon.webp';


export default makeScene2D(function* (view) {

    const ref_math = createRef<CodeBlock>()
	const ref_nasm = createRef<CodeBlock>()
	const ref_icon = createRef<Img>()

	const code_nasm = `_start:
	mov rbp, rsp
	
	; (2 + 4) * 3
	push qword 2
	push qword 4
	push qword 3
	pop rcx
	pop rbx
	imul rbx, rcx
	push qword rbx
	pop rcx
	pop rbx
	add rbx, rcx
	push qword rbx
	pop rbx

	; result (rbp-4) = rbx
	sub rsp, 4
	mov qword [rbp-4], rbx
	
	mov rsp, rbp
	ret`

    view.add(<>
        <CodeBlock ref={ref_math} codeContent="(2 + 4) * 3" opacity={0} />
		<CodeBlock ref={ref_nasm} codeContent={code_nasm} opacity={0} extension="nasm" tab_width={2} />
		<Img ref={ref_icon} src={chatgptIcon} opacity={0} />
    </>)



    yield* waitFor(1)

    ref_math().y(40)
    yield* all(
        ref_math().opacity(1, 0.5),
        ref_math().y(0, 0.5),
    )
    yield* waitFor(1)


	ref_icon().scale(0.2)
	ref_icon().y(200)
	yield* all(
		ref_icon().opacity(1, 0.5),
		ref_icon().scale(0.35, 0.5),
		ref_icon().y(200, 0.5),
	)

	yield* ref_icon().scale(0.3, 6 , linear)


	ref_nasm().y(300)
	yield* all(
		all(
			ref_icon().opacity(0, 0.5),
			ref_icon().scale(0.2, 0.5),
			ref_icon().y(240, 0.5),
		),
		all(
			ref_nasm().opacity(1, 1),
			ref_nasm().y(80, 1),
			ref_math().y(-350, 1),
		)
	)

	yield* waitFor(1)

});