if (process.argv.includes('--port')) {
  process.env.PORT = process.argv[process.argv.indexOf('--port') + 1];
}

require('./server');
require('./clip');
