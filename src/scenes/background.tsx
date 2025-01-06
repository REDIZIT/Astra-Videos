import { CODE, makeScene2D, Layout, Txt, Spline, Knot } from '@motion-canvas/2d';
import { all, chain, useLogger, createRef, easeInCubic, waitFor, PossibleVector2, makeRef, ThreadGenerator } from '@motion-canvas/core';
import { createNoise2D } from 'simplex-noise';

export default makeScene2D(function* (view) {



    const ref_spline = createRef<Spline>();

    const knotPositions: PossibleVector2[] = [];
    const knots: Knot[] = [];

    const width = 1920;
    const halfWidth = width / 2
    const wave_resoultion = 1000;
    const width_per_res = width / wave_resoultion
    const points = wave_resoultion + 2

    const logger = useLogger()
    const noise = createNoise2D();

    for (var i = 0; i < points; i++) {
        const x = i * width / knots.length - halfWidth 
        knotPositions.push([x, 0])
    }

    view.add(
        <Spline
            ref={ref_spline}
            lineWidth={10}
            stroke={'#fff'}
            smoothness={0.5}
            fill={"#555"}>
            {knotPositions.map((pos, i) => (
                <Knot ref={makeRef(knots, i)} position={pos} />
            ))}
        </Spline>
    )

    
    function* anim() {

        const loopTasks: Array<ThreadGenerator> = []

        for (var fi = 0; fi < 10; fi++) {
            const frameTasks: Array<ThreadGenerator> = []

            for (var i = 0; i < knots.length; i++) {

                const value = noise((i + fi * 500) / 500, 0) * 100

                //const pos = [i * width / knots.length - halfWidth, value]

                //ref_spline().points()[i].position.x(i * width_per_res - halfWidth)
                //ref_spline().points()[i].position.y(value, 1)

                //ref_spline().points()[i] = pos

                //tasks.push(knots[i].position.x(i * width / knots.length - halfWidth))
                frameTasks.push(knots[i].position.y(value, 1))
            }

            loopTasks.push(all(...frameTasks))
        }
        

        yield* chain(...loopTasks)
    }

    yield* anim()

    //yield* all(
    //    knots[1].position.y(80, 1)
    //)

    yield* waitFor(1)
});