import {makeProject} from '@motion-canvas/core';

import nasm_pick from './scenes/nasm_pick?scene';
import print_token from './scenes/print_token?scene';
import math from './scenes/math?scene';
import features from './scenes/features?scene';

export default makeProject({
    scenes: [features/*nasm_pick, print_token, math, features*/],
});
