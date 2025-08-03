import fs from 'fs';
import { fontSplit } from 'cn-font-split';
import { rm } from 'fs/promises';

// https://github.com/KonghaYao/cn-font-split/blob/release/packages/ffi-js/README.md
// https://cnb.cool/lgh06/mirrors/cn-font-split/-/blob/release/packages/ffi-js/README.md

let configs = [
  {
    src: './original_fonts/LXGWWenKaiGB-Regular.ttf',
    outDir: './dist/LXGWWenKaiGB_Regular',
    chunkSize: 400 * 1024,
  },
  {
    src: './original_fonts/LXGWWenKaiGB-Regular.ttf',
    outDir: './dist/LXGWWenKaiGB_Regular',
    chunkSize: 200 * 1024,
  },
  {
    src: './original_fonts/LXGWWenKaiGB-Regular.ttf',
    outDir: './dist/LXGWWenKaiGB_Regular',
    chunkSize: 100 * 1024,
  },
]

async function exec(config) {
  const inputBuffer = new Uint8Array(
      fs.readFileSync(config.src).buffer,
  );
  console.time('node');
  await fontSplit({
      input: inputBuffer,
      outDir: config.outDir + "_max" + config.chunkSize / 1024 + "k",
  
      chunkSize: config.chunkSize,
      renameOutputFont: '[index]_[hash:6].[ext]',
  });
  console.timeEnd('node');
  
}

async function main() {
// 清空 ./dist 文件夹，如果文件夹不存在则创建
try {
  await rm('./dist', { recursive: true, force: true });
} catch (err) {
  console.error('清空 ./dist 文件夹时出错:', err);
}
  for await (const config of configs) {
    await exec(config);
  }
}

main();
