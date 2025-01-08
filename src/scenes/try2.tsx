import { CODE, makeScene2D, Layout, Code, LezerHighlighter, Rect, Img, lines, word } from '@motion-canvas/2d';
import { DEFAULT, Direction, all, chain, createRef, delay, easeInCubic, easeOutBack, fadeTransition, linear, slideTransition, useLogger, waitFor } from '@motion-canvas/core';
import { CodeBlock } from '../components/codeblock';


export default makeScene2D(function* (view) {

	const ref_layout = createRef<Layout>()
	const ref_code_1 = createRef<CodeBlock>()
	const ref_code_2 = createRef<CodeBlock>()
	const ref_code_3 = createRef<CodeBlock>()
	const ref_code_4 = createRef<CodeBlock>()
	const ref_code_5 = createRef<CodeBlock>()
	const ref_code_6 = createRef<CodeBlock>()

	const customTypes = new Set(["Token", "Node", "Tokenizer", "AbstractSyntaxTreeBuilder", "Generator", "Token_Class", "Token_Identifier", "Token_Visibility", "Context", "VariableRawData", "Utils", "Token_Constant", "PrimitiveTypeInfo"])

	const code_1 = `public static class Compiler
{
    public static string Compile_Astra_to_LLVM(string astraCode)
    {
        List<Token> tokens = Tokenizer.Tokenize(astraCode);

        List<Node> ast = AbstractSyntaxTreeBuilder.Parse(tokens);

        string llvm = Generator.Generate(ast);

        return llvm;
    }
}`

	const code_2 = `public static class AbstractSyntaxTreeBuilder
{
    private static List<Token> tokens;
    private static int current;

    public static List<Node> Parse(List<Token> tokens)
    {
        AbstractSyntaxTreeBuilder.tokens = tokens;
        current = 0;

        List<Node> statements = new();

        while (IsAtEnd() == false)
        {
            statements.Add(Declaration());
        }
        
        return statements;
    }
	private static Node Declaration()
	{
	    if (Match(typeof(Token_Class))) return ClassDeclaration();
	
	    return FunctionsAndFieldsDeclaration();
	}
	private static Node FunctionsAndFieldsDeclaration()
	{
	    if (Match(typeof(Token_Identifier))) return VariableDeclaration();
	    if (Match(typeof(Token_Visibility))) return FunctionDeclaration();
	
	    return Statement();
	}
	// < ... >
}`

	const code_3 = `public static class Generator
{
	public static string Generate(List<Node> statements)
	{
		Context ctx = new();
	
		foreach (Node statement in statements)
		{
			statement.Generate(ctx);
		}
	
		return ctx.b.ToString();
	}
}`

	const code_4 = `public abstract class Node
{
    public string generatedVariableName;

    public virtual void Generate(Generator.Context ctx)
    {
    }
}

public class Node_VariableDeclaration : Node
{
    public VariableRawData variable;
    public Node initValue;

    public override void Generate(Generator.Context ctx)
    {
        base.Generate(ctx);

        generatedVariableName = ctx.NextPointerVariableName(variable.type, variable.name);

		// < ... >
		
		Generate_WithInit_AnyExpression(ctx);
    }

    private void Generate_WithInit_AnyExpression(Generator.Context ctx)
	{
	    initValue.Generate(ctx);
	
	    ctx.b.AppendLine($"{generatedVariableName} = alloca {variable.type}");
	    Utils.MoveValue(initValue.generatedVariableName, generatedVariableName, ctx);
	}
}`

	const code_5 = `public class Node_Literal : Node
{
    public Token_Constant constant;

    public override void Generate(Generator.Context ctx)
    {
        base.Generate(ctx);

		// < ... >

        PrimitiveTypeInfo literalType = PrimitiveTypeInfo.INT;

        generatedVariableName = ctx.NextPointerVariableName(literalType);
        ctx.b.AppendLine($"{generatedVariableName} = alloca {literalType.asmName}");
        ctx.b.AppendLine($"store {literalType.asmName} {constant.value}, {PrimitiveTypeInfo.PTR} {generatedVariableName}");
    }
}`

	const code_6 = `i32 my_value = 123`

	const code_7 = `define void @main()
{
	%ptr_0_i32 = alloca i32
	store i32 123, ptr %ptr_0_i32
	
	%my_value = alloca i32
	%tmp_0_ptr = load i32, ptr %ptr_0_i32
	store i32 %tmp_0_ptr, ptr %my_value
	
	ret void
}`

	view.add(<Layout ref={ref_layout}>
		<CodeBlock ref={ref_code_1} codeContent={code_1} extension="c#" opacity={0} offset={[-1, 0]} custom_refTypes={customTypes} />
		<CodeBlock ref={ref_code_2} codeContent={code_2} extension="c#" opacity={0} offset={[-1, 0]} custom_refTypes={customTypes} />
		<CodeBlock ref={ref_code_3} codeContent={code_4} extension="c#" opacity={0} offset={[-1, 0]} custom_refTypes={customTypes} />
		<CodeBlock ref={ref_code_4} codeContent={code_5} extension="c#" opacity={0} offset={[-1, 0]} custom_refTypes={customTypes} />
		<CodeBlock ref={ref_code_5} codeContent={code_6} extension="astra" opacity={0} />
		<CodeBlock ref={ref_code_6} codeContent={code_7} extension="llvm ir" opacity={0} />
	</Layout>)

	yield* fadeTransition(0.5)
	yield* waitFor(1)

	ref_code_1().x(-420)
	ref_code_1().y(100)
	yield* all(
		ref_code_1().opacity(1, 0.5),
		ref_code_1().y(0, 0.5)
	)
	yield* waitFor(1)


	yield* ref_code_1().code().selection(lines(4), 0.5)
	yield* waitFor(1)

	yield* ref_code_1().code().selection(lines(6), 0.5)
	yield* waitFor(1)

	ref_code_2().x(-30)
	ref_code_2().y(100)
	yield* all(
		ref_code_1().x(-910, 0.5),
		ref_code_2().opacity(1, 0.5),
		ref_code_2().y(0, 0.5)
	)
	yield* waitFor(1)


	yield* all(
		ref_code_2().opacity(0, 0.5),
		ref_code_2().y(100, 0.5)
	)
	yield* waitFor(1)


	yield* ref_code_1().code().selection(lines(8), 0.5)
	yield* waitFor(1)


	ref_code_2().x(80)
	yield* ref_code_2().animateCode(code_3, 0)
	yield* all(
		ref_code_2().opacity(1, 0.5),
		ref_code_2().y(0, 0.5)
	)
	yield* waitFor(1)



	yield* ref_layout().x(-1024, 0.5)

	ref_code_3().x(826)
	yield* all(
		ref_code_3().opacity(1, 0.5),
		ref_code_3().y(0, 0.5)
	)
	yield* waitFor(1)



	yield* ref_code_2().code().selection(word(6, 17, 14), 0.5)
	yield* waitFor(1)

	yield* ref_code_2().code().selection(lines(8), 0.5)
	yield* waitFor(1)


	yield* ref_code_3().code().selection(lines(14, 24), 0.5)
	yield* waitFor(1)


	yield* ref_code_3().code().selection(lines(25, 31), 0.5)
	yield* waitFor(0.5)

	yield* ref_code_3().code().selection(lines(27), 0.5)
	yield* waitFor(1)

	//yield* ref_code_3().code().selection(lines(28, 30), 0.5)
	//yield* waitFor(1)


	yield* all(
		ref_layout().x(-1780, 0.5),
		ref_code_3().x(1200, 0.5),
	)
	yield* waitFor(1)

	ref_code_4().x(1000)
	ref_code_4().y(100)
	ref_code_5().x(1750)
	ref_code_5().y(100)
	yield* all(
		ref_code_5().opacity(1, 0.5),
		ref_code_5().y(-300, 0.5),
	)
	yield* waitFor(1)

	yield* all(
		ref_code_4().opacity(1, 0.5),
		ref_code_4().y(10, 0.5),
	)
	yield* waitFor(1)


	yield* ref_code_4().code().selection(lines(2), 0.5)
	yield* waitFor(1)

	yield* ref_code_4().code().selection(lines(12), 0.5)
	yield* waitFor(1)

	yield* ref_code_4().code().selection(lines(13, 14), 0.5)
	yield* waitFor(1)

	yield* ref_code_4().code().selection(DEFAULT, 0.5)
	yield* waitFor(1)


	yield* all(
		ref_code_4().opacity(0, 0.5),
		ref_code_5().opacity(0, 0.5),
	)
	yield* waitFor(1)




	yield* ref_code_3().code().selection(lines(29, 30), 0.5)
	yield* waitFor(1)

	yield* ref_code_3().code().selection(word(30, 24, 31), 0.5)
	yield* waitFor(1)

	yield* ref_code_3().code().selection(DEFAULT, 0.5)
	yield* waitFor(1)


	yield* all(
		ref_layout().x(-1024, 0.5),
		ref_code_3().x(826, 0.5)
	)
	yield* waitFor(1)



	yield* ref_code_2().code().selection(DEFAULT, 0.5)
	yield* waitFor(1)


	yield* all(
		ref_layout().x(0, 0.5),
		ref_code_3().x(1000, 0.5)
	)
	yield* waitFor(1)


	yield* ref_code_1().code().selection(DEFAULT, 0.5)
	yield* waitFor(1)

	yield* all(
		ref_code_2().x(1000, 0.5),
		ref_code_1().x(-420, 0.5),
	)
	yield* waitFor(1)


	ref_code_6().y(100)
	ref_code_5().y(-100)
	ref_code_5().x(0)
	yield* all(
		ref_code_1().opacity(0, 0.5),
		ref_code_1().y(100, 0.5),
		ref_code_5().opacity(1, 0.5),
		ref_code_5().y(-260, 0.5),
		ref_code_6().opacity(1, 0.5),
		ref_code_6().y(20, 0.5),
	)
	yield* waitFor(1)



	yield* ref_code_6().code().selection(lines(2, 3), 0.5)
	yield* waitFor(1)


	yield* ref_code_6().code().selection(lines(4, 7), 0.5)
	yield* waitFor(1)

	yield* ref_code_6().code().selection(DEFAULT, 0.5)
	yield* waitFor(1)


	yield* ref_layout().opacity(0, 0.5)
	yield* waitFor(1)
});