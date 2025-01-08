import {makeProject} from '@motion-canvas/core';

import nasm_pick from './scenes/nasm_pick?scene';
import print_token from './scenes/print_token?scene';
import math from './scenes/math?scene';
import features from './scenes/features?scene';
import book from './scenes/book?scene';
import arch from './scenes/arch?scene';
import llvm from './scenes/llvm?scene';
import try2 from './scenes/try2?scene';
import current from './scenes/current?scene';
import intro from './scenes/intro?scene';

export default makeProject({
    scenes: [intro, nasm_pick, print_token, math, features, book, arch, llvm, try2, current],
});
