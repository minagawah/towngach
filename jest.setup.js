// jest.setup.js
const { Console } = require('console');

// This forces a brand-new console instance attached to system streams,
// completely breaking through Jest's internal interceptor/silent wrapper.
global.console = new Console({
  stdout: process.stdout,
  stderr: process.stderr,
});
