import { CODE, makeScene2D, Layout, Code, LezerHighlighter, Rect, Img } from '@motion-canvas/2d';
import { Direction, all, chain, createRef, delay, easeInCubic, easeOutBack, linear, slideTransition, useLogger, waitFor } from '@motion-canvas/core';
import { CodeBlock } from '../components/codeblock';
import logo from '../../external/HarmonyLogo.png';


export default makeScene2D(function* (view) {

	const ref_logo = createRef<Img>()

	view.add(<>
		<Img ref={ref_logo} src={logo} opacity={0} />
	</>)

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
});