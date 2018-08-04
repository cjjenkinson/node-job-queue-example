const path = require('path');

const dir = process.env.DIR;

if (!dir) throw new Error('Define directory in scripts to build');

module.exports = {
  webpack: (config) => {
    config.entry.main = [`./${dir}/index.js`];
    config.output.path = path.join(process.cwd(), `build-${dir}`);

    return config;
  },
};
