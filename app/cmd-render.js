const path    = require('path');
const seconds = require('runtime-to-seconds');
const yaml    = require('yamljs');

module.exports = function(options) {

  // TODO: externalize
  //const framerate = 59.94;
  const framerate = 60;
  const fade      = framerate * 1;
  
  // read and parse the config file
  var config = {};
  try {
    config = yaml.load(options['<config>']);
  } catch (e) {
    console.warn(e.message);
    process.exit(1);
  }

  // transform the stage data
  config.stages = config.stages.map(function(stage) {
    return {
      file  : path.join(options['<video-dir>'], stage.file),
      start : seconds(stage.start) * framerate,
      end   : seconds(stage.end)   * framerate,
    };
  });

  /*
  // identify the first, middle, and last stage files
  const files = {
    first  : config.stages.shift(),
    middle : config.stages,
    last   : config.stages.pop(),
  };
  */

  // count the total number of frames in the video 
  var length = 0;

  // assemble a melt command
  var cmd    = 'melt ';
  // TODO: format these long lines in a readable way on the shell
  config.stages.forEach(function(stage) {
    length += stage.end - stage.start; 
    cmd    += [
      `colour:black out=${ fade - 1} ${ stage.file } in=${ stage.start } out=${ stage.end } -mix ${ fade } -mixer luma`,
      `colour:black out=${ fade - 1} -mix ${ fade } -mixer luma`,
    ].join(' ') + ' ';
  });

  // optionally apply an audio track
  if (options['--audio']) {
    cmd += [
      `-audio-track ${ options['--audio'] } out=${ length } -attach-track volume:0db end=-70db in=${ length - fade } out=${ length }`,
      `-transition mix in=0 out=${ length }`,
    ].join(' ');
  }

  // optionally save to <outfile>
  if (options['<outfile>']) {
    cmd += ` -consumer avformat:${ options['<outfile>']}`;
  }

  // echo to shell
  console.log(cmd);

};
