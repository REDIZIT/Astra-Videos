import { CODE, makeScene2D, Layout, Img } from '@motion-canvas/2d';
import { all, chain, createRef, easeInCubic, waitFor } from '@motion-canvas/core';
import { CodeBlock } from '../components/codeblock';
import regs from '../../external/regs.png';


export default makeScene2D(function* (view) {

	const nasm = CODE`section .data
	msg db "Hello, World!", 0

section .text
	global _start

_start:
	mov rax, 1
	mov rdi, 1
	mov rsi, msg
	mov rdx, 13
	syscall

	mov rax, 60
	xor rdi, rdi
	syscall`;

	const masm = CODE`.data
	msg db "Hello, World!", 0

.code
main PROC
	mov edx, OFFSET msg
	call WriteString
	invoke ExitProcess, 0
main ENDP
END main`;

	const fasm = CODE`format ELF64
entry _start

section '.data' writeable
	msg db "Hello, World!", 0

section '.text' executable
_start:
	mov rax, 1
	mov rdi, 1
	mov rsi, msg
	mov rdx, 13
	syscall

	mov rax, 60
	xor rdi, rdi
	syscall`;

	const gas = CODE`.section .data
msg:
	.asciz "Hello, World!"

.section .text
.global _start
_start:
	mov $1, %rax
	mov $1, %rdi
	lea msg(%rip), %rsi
	mov $13, %rdx
	syscall

	mov $60, %rax
	xor %rdi, %rdi
	syscall`;

	const tasm = CODE`.model small
.stack 100h
.data
	msg db "Hello, World!", "$"

.code
main PROC
	mov ah, 09h
	lea dx, msg
	int 21h

	mov ah, 4Ch
	int 21h
main ENDP
END main`;

	const ref_nasm = createRef<CodeBlock>();
	const ref_masm = createRef<CodeBlock>();
	const ref_fasm = createRef<CodeBlock>();
	const ref_gas = createRef<CodeBlock>();
	const ref_tasm = createRef<CodeBlock>();

	const ref_layout = createRef<Layout>();
	const ref_regs = createRef<Img>()

	view.add(<Layout ref={ref_layout} scale={0.915}>
		<Img ref={ref_regs} src={regs} scale={1.35} radius={24} opacity={0} />
		<CodeBlock ref={ref_nasm} extension="nasm" codeContent={nasm} offset={[-1, 0]} height={480} />
		<CodeBlock ref={ref_masm} extension="masm" codeContent={masm} offset={[-1, 0]} height={480} />
		<CodeBlock ref={ref_fasm} extension="fasm" codeContent={fasm} offset={[-1, 0]} height={480} />
		<CodeBlock ref={ref_gas} extension="gas" codeContent={gas} offset={[-1, 0]} height={480} />
		<CodeBlock ref={ref_tasm} extension="tasm" codeContent={tasm} offset={[-1, 0]} height={480} />
	</Layout>);

	const gap = 16;
	const start_y = 1000;
	const delay = 0.15;
        
	ref_nasm().y(start_y);
	ref_masm().y(start_y);
	ref_fasm().y(start_y);
	ref_gas().y(start_y);
	ref_tasm().y(start_y);


	ref_nasm().x(-1046 + gap + 8);
	ref_masm().x(ref_nasm().x() + ref_nasm().width() + gap);
	ref_fasm().x(ref_masm().x() + ref_masm().width() + gap);
	ref_gas().x(ref_fasm().x() + ref_fasm().width() + gap);
	ref_tasm().x(ref_gas().x() + ref_gas().width() + gap);


	ref_regs().y(100)
	yield* all(
		ref_regs().opacity(1, 0.75),
		ref_regs().y(0, 0.5),
	)
	yield* waitFor(1)

	yield* ref_regs().opacity(0, 0.5)


	yield* all(
		chain(
			waitFor(0),
			ref_nasm().y(0, 1),
		),
		chain(
			waitFor(delay),
			ref_masm().y(0, 1),
		),
		chain(
			waitFor(delay * 2),
			ref_fasm().y(0, 1),
		),
		chain(
			waitFor(delay * 3),
			ref_gas().y(0, 1),
		),
		chain(
			waitFor(delay * 4),
			ref_tasm().y(0, 1),
		),
	);

	//yield* code().code().selection(
 //       code().code().findAllRanges(/mov rax, 60*/g),
 //       0.5,
	//   );

	yield* waitFor(1);

	const delay_away = 0.05
	const nasm_showcase_duration = 1

	yield* all(
		chain(
			waitFor(delay_away * 0),
			ref_tasm().x(5000, 1),
		),
		chain(
			waitFor(delay_away * 1),
			ref_gas().x(5000, 1),
		),
		chain(
			waitFor(delay_away * 2),
			ref_fasm().x(5000, 1),
		),
		chain(
			waitFor(delay_away * 3),
			ref_masm().x(5000, 1),
		),
		chain(
			all(
				ref_nasm().offset(0, 0.5),
				ref_nasm().x(0, nasm_showcase_duration * 0.8),
				ref_nasm().y(0, nasm_showcase_duration * 1.25),
				ref_nasm().scale(1.75, nasm_showcase_duration * 1.5),
				ref_nasm().height(460, nasm_showcase_duration),
			)
		),
	);

	yield* waitFor(1);

	yield* ref_nasm().y(1000, 0.5, easeInCubic)
});
