// index.html + motions/*.js 를 하나의 HTML 파일로 묶습니다.
// 사용법: node build.mjs            → dist/motion-dogam.html
//        node build.mjs <경로>     → 위 파일 + <경로>에 문서 뼈대(<html>, <head>, <body>)를 뺀 버전
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const root = new URL('.', import.meta.url);
let html = readFileSync(new URL('index.html', root), 'utf8');

html = html.replace(/<script src="(motions\/[^"]+)"><\/script>/g, (_, file) => {
  const js = readFileSync(new URL(file, root), 'utf8')
    .replace(/<\/script/gi, '<\\/script')
    .replace(/<!--/g, '<\\!--');
  return '<script>\n' + js + '\n</script>';
});

mkdirSync(new URL('dist/', root), { recursive: true });
writeFileSync(new URL('dist/motion-dogam.html', root), html);
console.log('dist/motion-dogam.html', (html.length / 1024).toFixed(0) + 'KB');

const bare = process.argv[2];
if (bare) {
  const stripped = html
    .replace(/<!doctype html>\s*/i, '')
    .replace(/<html[^>]*>\s*/i, '')
    .replace(/<\/html>\s*$/i, '')
    .replace(/<head>\s*/i, '')
    .replace(/<\/head>\s*/i, '')
    .replace(/<body>\s*/i, '')
    .replace(/<\/body>\s*/i, '')
    .replace(/<meta charset="utf-8">\s*/i, '')
    .replace(/<meta name="viewport"[^>]*>\s*/i, '');
  writeFileSync(bare, stripped);
  console.log(bare, (stripped.length / 1024).toFixed(0) + 'KB');
}
