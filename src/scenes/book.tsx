import { CODE, makeScene2D, Layout, Spline, Txt, word, Img } from '@motion-canvas/2d';
import { all, chain, createRef, delay, easeInCubic, waitFor } from '@motion-canvas/core';
import bookIcon from '../../external/book.png';


export default makeScene2D(function* (view) {

    const ref_bookIcon = createRef<Img>()
    const ref_c5 = createRef<Txt>()
    const ref_c6 = createRef<Txt>()
    const ref_c7 = createRef<Txt>()
    const ref_c8 = createRef<Txt>()
    const ref_c9 = createRef<Txt>()

    view.add(<Layout y={-60}>
        <Img ref={ref_bookIcon} src={bookIcon} width={800} radius={24} opacity={0} />
        <Txt ref={ref_c5} text="Глава 5 - Representing Code" fill="#a68af9" fontSize={24} opacity={0} fontFamily="Segoe UI" textAlign="left" width={750}/>
        <Txt ref={ref_c6} text="Глава 6 - Parsing Expressions" fill="#a68af9" fontSize={24} opacity={0} fontFamily="Segoe UI" textAlign="left" width={750} />
        <Txt ref={ref_c7} text="Глава 7 - Evaluating Expressions" fill="#a68af9" fontSize={24} opacity={0} fontFamily="Segoe UI" textAlign="left" width={750} />
        <Txt ref={ref_c8} text="Глава 8 - Statements and State" fill="#a68af9" fontSize={24} opacity={0} fontFamily="Segoe UI" textAlign="left" width={750} />
        <Txt ref={ref_c9} text="Глава 9 - Control Flow" fill="#a68af9" fontSize={24} opacity={0} fontFamily="Segoe UI" textAlign="left" width={750} />
    </Layout>)



    yield* all(
        ref_bookIcon().opacity(1, 0.5)
    )
    yield* waitFor(1)

    ref_c5().y(400)
    ref_c6().y(400)
    ref_c7().y(400)
    ref_c8().y(400)
    ref_c9().y(400)
    yield* all(
        all(
            ref_c5().opacity(1, 0.5),
            ref_c5().y(220, 0.5),
        ),
        delay(0.1, all(
            ref_c6().opacity(1, 0.5),
            ref_c6().y(260, 0.5),
        )),
        delay(0.2, all(
            ref_c7().opacity(1, 0.5),
            ref_c7().y(300, 0.5),
        )),
        delay(0.3, all(
            ref_c8().opacity(1, 0.5),
            ref_c8().y(340, 0.5),
        )),
        delay(0.4, all(
            ref_c9().opacity(1, 0.5),
            ref_c9().y(380, 0.5),
        )),
    )


    yield* waitFor(1)
});
