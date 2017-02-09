#!/usr/bin/env node

// make package.json accessible
const pkg    = require('../package.json');

// require the dependencies
const docopt = require('docopt').docopt;
const fs     = require('fs');
const path   = require('path');

// subcommands
const cmd = {
  config: require('./cmd-config'),
  render: require('./cmd-render'),
};

// generate and parse the command-line options
const doc     = fs.readFileSync(path.join(__dirname, 'docopt.txt'), 'utf8');
const options = docopt(doc, { version: pkg.version });

// execute the appropriate function
const fn = 
  (options.config) ? cmd.config :
  (options.render) ? cmd.render : function() {
    console.warn('Invalid subcommand.');
    process.exit(1);
};
fn(options);
