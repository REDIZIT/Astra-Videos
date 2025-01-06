import {makeProject} from '@motion-canvas/core';

import nasm_pick from './scenes/nasm_pick?scene';
import print_token from './scenes/print_token?scene';

export default makeProject({
    scenes: [nasm_pick, print_token],
});
