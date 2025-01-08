import { CODE, makeScene2D, Layout, Code, LezerHighlighter, Rect, Img, lines, word } from '@motion-canvas/2d';
import { DEFAULT, all, chain, createRef, delay, easeInCubic, easeOutBack, easeOutCubic, linear, useLogger, waitFor } from '@motion-canvas/core';
import { CodeBlock } from '../components/codeblock';
import chatgptIcon from '../../external/chatgpt-icon.webp';


export default makeScene2D(function* (view) {

    const ref_code = createRef<CodeBlock>()
    const ref_nasm = createRef<CodeBlock>()

    const code_1 = `int myValue`
	const nasm_1 = `_start:
	mov rbp, rsp
	
	; var myValue
	sub rsp, 4
	mov qword [rbp-4], 0
	
	mov rsp, rbp
	ret`

	const code_2 = `var myValue
var mySecondValue = 42`

	const nasm_2 = `_start:
	mov rbp, rsp
	
	; var myValue
	sub rsp, 4
	mov qword [rbp-4], 0
	
	; var mySecondValue
	sub rsp, 4
	mov qword [rbp-8], 42
	
	mov rsp, rbp
	ret`


	const codes = [
		`print "My message"`,
		`var myBool = 1
if myBool
{
	print "My message"
}`,
		`var myBool = 0
if myBool
{
	print "That's true"
}
else
{
	print "That's false"
}`,
		`var myBool = (2 + 4) * 3
if myBool
{
	print "More than zero"
}
else
{
	print "Less or equal than zero"
}`,
		`var myBool = (2 + 4) * 3
if myBool > 10
{
	print "More than 10"
}
else
{
	print "Less or equal than 10"
}`,
		`var myBool = (2 + 4) * 3
var mySecondBool = (myBool - 1) * 2

if myBool > 10 and mySecondBool < 100
{
	print "True"
}
else
{
	print "False"
}`,
		`while 1
{
	print "Infinite while loop"
}`,
		`var i = 0
while i < 100
{
	print "Finite while loop"
	i = i + 1
}`,
		`for (var i = 0; i < 100; i = i + 1)
{
	print "For loop"
}`,
		`main()
{
	print "main"
}`,
		`main()
{
	myFunc()
	print "main"
}
myFunc()
{
	print "myFunc"
}`,
		`struct program
{
	main()
	{
		print "main"
	}
}`,
		`struct program
{
	main()
	{
		myStruct inst
		inst.myFunc()
		print "main"
	}
}
struct myStruct
{
	myFunc()
	{
		print "myFunc from struct instance"
	}
}`,
		`struct program
{
	main()
	{
		myStruct inst
		print inst.myField
	}
}
struct myStruct
{
	var myField = 42
}`,
		`struct program
{
	main()
	{
		myStruct inst

		inst.myValue = 123

		print inst.myField
	}
}
struct myStruct
{
	var myValue = 42
}`
	]

	const codes_2 = [
		`struct program
{
	main()
	{
		myStruct inst

		inst.someFunction(a, b, c * 2).anotherField += someArray[2]

		print inst.myField
	}
}
struct myStruct
{
	var myValue = 42
}`,
		`struct program
{
	main()
	{
		myStruct inst

		tmp1 = c * 2
		tmp2 = inst.someFunction(a, b, tmp1)
		tmp3 = someArray[2]
		tmp2.anotherField = tmp2.anotherField + tmp3

		print inst.myField
	}
}
struct myStruct
{
	var myValue = 42
}`,
	]








    view.add(<>

		<CodeBlock ref={ref_code} codeContent={code_1} extension="astra" opacity={0} minWidth={234} />
		<CodeBlock ref={ref_nasm} codeContent={nasm_1} extension="nasm" opacity={0} />

	</>)

	ref_code().y(100)
	yield* all(
		ref_code().opacity(1, 0.5),
		ref_code().y(0, 0.5),
	)

	yield* waitFor(1)



	ref_nasm().y(200)
	yield* all(
		ref_nasm().opacity(1, 0.5),
		ref_nasm().y(100, 0.5),
		ref_code().y(-150, 0.5),
	)

	yield* waitFor(1)



	yield* ref_nasm().code().selection(lines(4), 0.5);
	yield* waitFor(1)

	

	yield* ref_nasm().code().selection(lines(5), 0.5);
	yield* waitFor(1)


	yield* ref_nasm().code().selection(DEFAULT, 0.6);
	yield* waitFor(1)



	yield* all(
		ref_code().animateCode(code_2, 0.5)
	)
	yield* waitFor(0.5)
	yield* all(
		ref_nasm().animateCode(nasm_2.replace(/\t/g, "    "), 0.5),
		ref_nasm().y(125, 0.5),
		ref_code().y(-165, 0.5),
	)
	yield* waitFor(1)


	yield* ref_nasm().code().selection(word(9, 14, 7), 0.5)
	yield* waitFor(1)

	yield* ref_nasm().code().selection(DEFAULT, 0.5)
	yield* waitFor(1)

	yield* all(
		ref_nasm().opacity(0, 0.5),
		ref_nasm().y(500, 0.5),
	)
	yield* waitFor(1)



	yield* all(
		ref_code().offset([0, -1], 0.5),
		ref_code().y(-140, 0.5),
	)
	for (var i = 0; i < codes.length; i++) {
		yield* ref_code().animateCode(codes[i], 0.25)
		yield* waitFor(0.25)
    }



	yield* ref_code().code().selection(lines(6), 0.5)
	yield* waitFor(1)


	yield* ref_code().animateCode(codes_2[0], 0.5)
	yield* waitFor(1)

	yield* all(
		ref_code().animateCode(codes_2[1], 0.5),
		ref_code().code().selection(lines(6, 9), 0.5),
	)
	yield* waitFor(1)


	yield* ref_code().code().selection(DEFAULT, 0.5)
	yield* waitFor(1)


	yield* all(
		ref_code().x(2000, 2, easeOutCubic),
		ref_code().y(-1500, 2, easeOutCubic),
		ref_code().rotation(1000, 2, easeOutCubic),
	)
	yield* waitFor(1)


	yield* waitFor(1)
});