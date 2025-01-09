import { CODE, makeScene2D, Layout, Code, LezerHighlighter, Rect, Img } from '@motion-canvas/2d';
import { Direction, all, chain, createRef, delay, easeInCubic, easeOutBack, linear, slideTransition, useLogger, waitFor } from '@motion-canvas/core';
import { CodeBlock } from '../components/codeblock';
import logo from '../../external/HarmonyLogo.png';


export default makeScene2D(function* (view) {

	const ref_logo = createRef<Img>()
	const ref_codeApp = createRef<CodeBlock>()
	const ref_codePatch = createRef<CodeBlock>()

	const code_app = `using math_utils

class calculator
{
	calculate(expression expr): result
	{
		return math.evaluate(expr)
	}
}`
	const code_patch = `using system
using patches

main()
{
	app instance = system.get_app_by_id("calculator")

	method_info method = instance.get_type().get_method("calculate")
	var token = method.tokens.find("return")
	var expr = method.get_node_after(token)

	patch method_patch = new patch(instance, method)

	var result = method_patch.create_variable_for(expr).relink(token)

	method_patch.insert_as_body(check_builder, result).after(result).before(token)

	method_patch.apply()
}

check_builder(double result_to_check)
{
	if result_to_check == (double.NaN or double.infinity_positive or double.infinity_negative)
	{
		return result("Expression is invalid")
	}
}`

	const code_app2 = `using math_utils

class calculator
{
	calculate(expression expr): result
	{
		result = math.evaluate(expr)

		if result_to_check == (double.NaN or double.infinity_positive or double.infinity_negative)
		{
			return result("Expression is invalid")
		}

		return result
	}
}`

	const customTypes = new Set(["math", "patch", "method_info", "app", "expression"])

	view.add(<>
		<Img ref={ref_logo} src={logo} opacity={0} />
		<CodeBlock ref={ref_codeApp} codeContent={code_app} extension="astra" opacity={0} x={-900} offset={[-1, 0]} custom_refTypes={customTypes} />
		<CodeBlock ref={ref_codePatch} codeContent={code_patch} extension="astra" opacity={0} x={320} custom_refTypes={customTypes} />
	</>)

	yield* slideTransition(Direction.Right, 0.5)

	ref_logo().scale(0.9)
	yield* all(
		ref_logo().opacity(1, 0.25),
		ref_logo().scale(1, 0.25),
	)
	yield* ref_logo().scale(0.9, 3, linear)
	yield* all(
		ref_logo().opacity(0, 0.5),
		ref_logo().scale(0.5, 0.5),
	)
	yield* waitFor(1)


	ref_codeApp().y(100)
	yield* all(
		ref_codeApp().y(0, 0.5),
		ref_codeApp().opacity(1, 0.5),
	)
	yield* waitFor(1)


	ref_codePatch().y(100)
	yield* all(
		ref_codePatch().y(0, 0.5),
		ref_codePatch().opacity(1, 0.5),
	)
	yield* waitFor(1)


	yield* all(
		ref_codePatch().x(-300, 0.5),
		ref_codePatch().opacity(0, 0.5),
	)
	yield* ref_codeApp().animateCode(code_app2, 0.5)
	yield* waitFor(1)


	yield* all(
		ref_codeApp().opacity(0, 0.5),
		ref_codeApp().y(100, 0.5),
	)
	yield* waitFor(1)
});