const fs = require('fs');
const path = require('path');
const watch = require('watch');
const clip = require('./clip');

if (process.argv.includes('--port')) {
  process.env.PORT = process.argv[process.argv.indexOf('--port') + 1];
}

require('./server');

watch.watchTree('./chart', (f, curr, prev)=>{
  if (typeof f == "object" && prev === null && curr === null) {
    // Finished walking the tree
    clip();
  } else if (prev === null) {
    // f is a new file
    clip();
  } else if (curr.nlink === 0) {
    // f was removed
    const filename = f.split('/')[1];
    const filepath = path.resolve('./dist', `${filename}.png`);

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  } else {
    // f was changed
    clip();
  }
});
