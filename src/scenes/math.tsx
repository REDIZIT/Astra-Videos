import { CODE, makeScene2D, Layout, Code, LezerHighlighter, Rect } from '@motion-canvas/2d';
import { all, chain, createRef, easeInCubic, useLogger, waitFor } from '@motion-canvas/core';
import { CodeBlock } from '../components/codeblock';


export default makeScene2D(function* (view) {

    const ref_math = createRef<CodeBlock>()
    const ref_nasm = createRef<CodeBlock>()

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
    </>)



    yield* waitFor(1)

    ref_math().y(40)
    yield* all(
        ref_math().opacity(1, 0.5),
        ref_math().y(0, 0.5),
    )
    yield* waitFor(1)


	ref_nasm().y(300)
	yield* all(
		ref_nasm().opacity(1, 0.5),
		ref_nasm().y(80, 0.5),
		ref_math().y(-350, 0.5),
	)
	yield* waitFor(1)

});