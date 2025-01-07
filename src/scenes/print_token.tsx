import { CODE, makeScene2D, Layout, Spline, Txt, word } from '@motion-canvas/2d';
import { all, chain, createRef, delay, easeInCubic, waitFor } from '@motion-canvas/core';
import { CodeBlock } from '../components/codeblock';


export default makeScene2D(function* (view) {

    const ref_print = createRef<CodeBlock>()
    const ref_asm = createRef<CodeBlock>()
    const ref_cs = createRef<CodeBlock>()

    const code_asm = CODE`mov rax, 1
mov rdi, 1
mov rsi, msg
mov rdx, 14
syscall`

    const ref_arrow = createRef<Spline>()
    const ref_arrow2 = createRef<Spline>()

    const arrow_width = 60;

    const layout_1 = createRef<Layout>()
    const layout_2 = createRef<Layout>()

    const ref_cs_token = createRef<CodeBlock>()
    const ref_cs_tokenizer = createRef<CodeBlock>()
    const ref_cs_main = createRef<CodeBlock>()
    const ref_cs_generator = createRef<CodeBlock>()
    const ref_nasm_result_1 = createRef<CodeBlock>()

    const code_cs_token = `public abstract class Token
{
	public abstract string Generate();
}

public class Token_Print : Token
{
	public override string Generate()
	{
		return @"mov rax, 1
mov rdi, 1
mov rsi, msg
mov rdx, 14
syscall
";
	}
}`

    const code_cs_tokenizer = `public static class Tokenizer 
{
	public static List<Token> Tokenize(string text)
	{
		List<Token> tokens = new();
		
		string[] lines = text.Split("\\n");
		for (int i = 0; i < lines.Length; i++)
		{
			Token token = TokenizeLine(lines[i]);
			tokens.Add(token);
		}
		
		return tokens;
	}
	public static Token TokenizeLine(string line)
	{
		if (line == "print") return new Token_Print();
		
		throw new Exception("Failed to tokenize line: '" + line + "'");
	}
}`

    const code_cs_main = `public static string source = "print";

public static void Main()
{
	string asm = Compile(source);
	Console.WriteLine(asm);
}
	
public static string Compile(string source)
{
	List<Token> tokens = Tokenizer.Tokenize(source);
}`

    const code_cs_generator = `public static class Generator
{
	public static string Generate(List<Token> tokens)
	{
		StringBuilder b = new();
		
		for (int i = 0; i < tokens.Count; i++)
		{
			Token token = tokens[i];
			string asm = token.Generate();
			b.AppendLine(asm);
		}
		
		return b.ToString();
	}
}`

    const code_cs_main_2 = `public static string source = "print";

public static void Main()
{
	string asm = Compile(source);
	Console.WriteLine(asm);
}
	
public static string Compile(string source)
{
	List<Token> tokens = Tokenizer.Tokenize(source);
	string asm = Generator.Generate(tokens);
	return asm;
}`

    const code_result_1 = `mov rax, 1
mov rdi, 1
mov rsi, msg
mov rdx, 14
syscall`


    const code_cs_main_3 = `public static string source = "print";

public static string header = @"section .data
	msg db ""Example string"", 0

section .bss
	buffer resb 32

section .text
_start:
";

public static void Main()
{
	string asm = Compile(source);
	Console.WriteLine(header + asm);
}
	
public static string Compile(string source)
{
	List<Token> tokens = Tokenizer.Tokenize(source);
	string asm = Generator.Generate(tokens);
	return asm;
}`

    const code_result_2 = `section .data
	msg db "Example string", 0

section .bss
	buffer resb 32

section .text
_start:
	mov rax, 1
	mov rdi, 1
	mov rsi, msg
	mov rdx, 14
	syscall`

    const code_tokenizer_2 = `public static class Tokenizer 
{
	public static List<Token> Tokenize(string text)
	{
		List<Token> tokens = new();
		
		string[] lines = text.Split("\\n");
		for (int i = 0; i < lines.Length; i++)
		{
			string line = lines[i];
			Token token = TokenizeLine(line);
			tokens.Add(token);
		}
		
		return tokens;
	}
	public static Token TokenizeLine(string line)
	{
		string[] words = line.Split(" ");
		if (words[0] == "print")
		{
			return new Token_Print()
			{
				pointer = words[1]
			};
		}
		
		throw new Exception("Failed to tokenize line: '" + line + "'");
	}
}`

    const code_token_2 = `public abstract class Token
{
	public abstract string Generate();
}

public class Token_Print : Token
{
	public string pointer;

	public override string Generate()
	{
		return @$"$mov rax, 1
mov rdi, 1
mov rsi, {pointer}
mov rdx, 14
syscall
";
	}
}`

    const code_result_3 = `section .data
	msg_first db "My first string", 0
	msg_second db "My second string", 0
	msg_third db "The last one", 0

section .bss
	buffer resb 32

section .text
_start:
	mov rax, 1
	mov rdi, 1
	mov rsi, msg_first
	mov rdx, 14
	syscall`


    view.add(
        <>
            <Layout ref={layout_1}>
                <CodeBlock ref={ref_print} codeContent={CODE`print`} extension="astra" width={160} />
                <CodeBlock ref={ref_asm} codeContent={code_asm} extension="nasm" width={240} />
                <CodeBlock ref={ref_cs} codeContent={CODE`Token_Print`} extension="c#" width={220} />
                <Spline ref={ref_arrow} points={[[-arrow_width, 0], [arrow_width, 0]]} stroke={"#555"} lineWidth={8} smoothness={0} endArrow arrowSize={10} />
                <Spline ref={ref_arrow2} points={[[-arrow_width, 0], [arrow_width, 0]]} stroke={"#555"} lineWidth={8} smoothness={0} endArrow arrowSize={10} />
            </Layout>
            <Layout ref={layout_2}>
                <CodeBlock ref={ref_cs_token} codeContent={code_cs_token} extension="c#" />
                <CodeBlock ref={ref_cs_tokenizer} codeContent={code_cs_tokenizer} extension="c#" />
                <CodeBlock ref={ref_cs_main} codeContent={code_cs_main} extension="c#" />
                <CodeBlock ref={ref_cs_generator} codeContent={code_cs_generator} extension="c#" />
                <CodeBlock ref={ref_nasm_result_1} codeContent={code_result_1} extension="nasm" minWidth={240} />
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
    ref_cs_tokenizer().opacity(0)
    ref_cs_main().opacity(0)
    ref_cs_generator().opacity(0)
    ref_nasm_result_1().opacity(0)

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



    // 5

    ref_cs_tokenizer().y(1000)
    ref_cs_tokenizer().x(-360)
    yield* all(
        layout_1().y(-400, 0.5),
        ref_cs_tokenizer().y(100, 0.5),
        ref_cs_tokenizer().opacity(1, 0.5),
        ref_cs_token().x(480, 0.5),
    )

    yield* waitFor(1)



    // 6

    ref_cs_main().y(-100)
    ref_cs_main().x(-400)
    yield* all(
        ref_cs_main().opacity(1, 0.5),
        ref_cs_main().y(100, 0.5),
        ref_cs_tokenizer().y(1000, 0.5),
        ref_cs_tokenizer().opacity(0, 0.5),
    )

    yield* waitFor(1)



    // 7

    ref_cs_generator().y(-100)
    ref_cs_generator().x(480)
    yield* all(
        ref_cs_generator().opacity(1, 0.5),
        ref_cs_generator().y(100, 0.5),
        ref_cs_token().y(1000, 0.5),
        ref_cs_token().opacity(0, 0.5),
    )

    yield* waitFor(1)



    // 8
    yield* ref_cs_main().code().code(code_cs_main_2.replace(/\t/g, "    "), 0.5)

    yield* waitFor(1)



    // 9

    ref_nasm_result_1().y(0)
    ref_nasm_result_1().x(480)
    yield* all(
        ref_nasm_result_1().opacity(1, 0.5),
        ref_nasm_result_1().y(100, 0.5),
        ref_cs_generator().y(1000, 0.5),
        ref_cs_generator().opacity(0, 0.5),
    )

    yield* waitFor(1)



    // 10
    yield* ref_cs_main().code().code(code_cs_main_3.replace(/\t/g, "    "), 0.5)

    yield* waitFor(1)



    // 11
    yield* ref_nasm_result_1().code().code(code_result_2.replace(/\t/g, "    "), 0.5)

    yield* waitFor(1)



    // 12

    ref_cs_tokenizer().y(0)
    //ref_cs_tokenizer().x(-400)
    yield* all(
        ref_cs_tokenizer().opacity(1, 0.5),
        ref_cs_tokenizer().y(100, 0.5),
        ref_cs_main().y(1000, 0.5),
        ref_cs_main().opacity(0, 0.5),
    )

    yield* waitFor(1)



    // 13

    yield* ref_cs_tokenizer().code().code(code_tokenizer_2.replace(/\t/g, "    "), 0.5)

    yield* waitFor(1)



    // 14

    ref_cs_token().y(0)
    ref_cs_token().x(-400)
    yield* all(
        ref_cs_token().opacity(1, 0.5),
        ref_cs_token().y(100, 0.5),
        ref_cs_tokenizer().y(1000, 0.5),
        ref_cs_tokenizer().opacity(0, 0.5),
    )

    yield* waitFor(1)



    // 15

    yield* ref_cs_token().code().code(code_token_2.replace(/\t/g, "    "), 0.5)

    yield* waitFor(1)



    // 16

    yield* ref_nasm_result_1().code().code(code_result_3.replace(/\t/g, "    "), 0.5)

    yield* waitFor(1)


    // 17

    yield* ref_nasm_result_1().code().code.replace(word(12, 13, 'msg_first'.length), 'msg_second', 0.6);
    yield* ref_nasm_result_1().code().code.replace(word(12, 13, 'msg_second'.length), 'msg_third', 0.6);



    // Fin

    yield* all(
        ref_print().opacity(0, 1),
        ref_cs().opacity(0, 1),
        ref_asm().opacity(0, 1),
        ref_arrow().opacity(0, 1),
        ref_arrow2().opacity(0, 1),
        ref_cs_main().opacity(0, 1),
        ref_nasm_result_1().opacity(0, 1),
        ref_cs_token().opacity(0, 1),
    )
});
