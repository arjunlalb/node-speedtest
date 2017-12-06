var exec = require('child_process').exec;
var schedule = require('node-schedule');

// Run, execute bash script (node app) every 1 minute
var j = schedule.scheduleJob('*/1 * * * *', function(){
  var child = exec('./speedtest.sh', function(error, stdout, stderr) {
    if (error) console.log(error);
    process.stdout.write(stdout);
    process.stderr.write(stderr);
  });
});