import fs from 'fs';
import { fontSplit } from 'cn-font-split';

// https://github.com/KonghaYao/cn-font-split/blob/release/packages/ffi-js/README.md
// https://cnb.cool/lgh06/mirrors/cn-font-split/-/blob/release/packages/ffi-js/README.md

const inputBuffer = new Uint8Array(
    fs.readFileSync('./original_fonts/LXGWWenKaiGB-Regular.ttf').buffer,
);
console.time('node');
await fontSplit({
    input: inputBuffer,
    outDir: './dist/LXGWWenKaiGB_Regular',

    maxAllowSubsetsCount: 100,
    renameOutputFont: '[index]_[hash:6].[ext]',
    silent:false,
});
console.timeEnd('node');