const { FuseBox, TypeScriptHelpers, Sparky } = require('fuse-box');

let fuse = FuseBox.init({
  homeDir: './src',
  output: 'app.js',
  tsConfig: 'tsconfig.json',
  plugins: [
    TypeScriptHelpers()
  ]
});

Sparky.task('default', () => {
  return Sparky.watch('index.html', {base: 'src'}).dest('./')
});

fuse
  .bundle('app.js')
  .instructions('> index.tsx')
  // .hmr()
  .watch();


fuse
  .dev({
    hmr: false,
    port: 4444,
    root: './'
  })

fuse.run();