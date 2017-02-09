module.exports = function(options) {

  var yaml = '---\nstages:\n\n';

  // determine the number of stages to configure
  const count = parseInt(options['<number-of-stages>']) || 5;

  // aggregate the markup
  for (var i = 1; i <= count ; i++) {
    yaml += "  - file : stage-" + i + ".mp4\n";
    yaml += "    start: '00:00:00'\n";
    yaml += "    file : '00:00:00'\n";
    yaml += "\n";
  }

  console.log(yaml.trim());
};
