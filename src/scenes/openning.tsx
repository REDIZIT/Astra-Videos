import { CODE, makeScene2D, Layout, Code, LezerHighlighter, Rect, Img, Txt } from '@motion-canvas/2d';
import { Direction, all, chain, createRef, delay, easeInCubic, easeOutBack, easeOutCubic, linear, slideTransition, useLogger, waitFor } from '@motion-canvas/core';
import { CodeBlock } from '../components/codeblock';


export default makeScene2D(function* (view) {

	const ref_1 = createRef<Txt>()
	const ref_2 = createRef<Txt>()
	const ref_3 = createRef<Txt>()

	view.add(<>
		<Txt ref={ref_1} text="СВОЙ" fontWeight={1000} fontSize={110} fill="#eee" opacity={0} letterSpacing={0} x={-240} />
		<Txt ref={ref_2} text="ЯЗЫК" fontWeight={1000} fontSize={110} fill="#eee" opacity={0} letterSpacing={0} x={240} />
		<Txt ref={ref_3} text="ПРОГРАММИРОВАНИЯ" fontWeight={1000} fontSize={110} fill="#eee" opacity={0} letterSpacing={0} />
	</>)

	ref_1().y(-100 + 100)
	ref_2().y(-100 + 100)
	ref_3().y(100 + 100)
	yield* all(
		ref_1().y(-100, 0.5),
		ref_1().opacity(1, 0.5),
		ref_1().letterSpacing(10, 2, easeOutCubic),
		delay(0.1, all(
			ref_2().y(-100, 0.5),
			ref_2().opacity(1, 0.5),
			ref_2().letterSpacing(10, 2, easeOutCubic),
		)),
		delay(0.2, all(
			ref_3().y(100, 0.5),
			ref_3().opacity(1, 0.5),
			ref_3().letterSpacing(5, 2, easeOutCubic),
		)),
	)

	yield* waitFor(1)
});