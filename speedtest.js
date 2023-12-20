const exec = require('child_process').exec;
const argv = require('minimist')(process.argv.slice(2), {
  string: ['ssids', 'frequency'],
  alias: { s: 'input', h: 'help', f: 'frequency' },
  unknown: function () { console.log('Unkown argument') }
});
const schedule = require('node-schedule');

const executeJob = () => {
  const child = exec('./speedtest.sh', function(error, stdout, stderr) {
    if (error) console.log(error);
    process.stdout.write(stdout);
    process.stderr.write(stderr);
  });
}

const runTest = () => {
  let ssids = [];
  let frequencyInMinutes = 30;

  if (argv.h) {
    console.log(`
    Usage: node speedtest.js [options]

    Options:
      -s      Comma separated list of SSIDs to run speedtest on
      -f      Frequency in minutes to run speedtest. Default is 30 minutes
      -h      Show help
    `);
    process.exit(0);
  }

  if (argv.s) {
    ssids = argv.s.split(',').map((ssid) => ssid.trim());
    console.log(`Running test on SSIDs: ${ssids}`);
  } else {
    console.log('No SSIDs provided. Exiting');
    process.exit(1);
  }

  if (argv.f) {
    frequencyInMinutes = argv.f;
    console.log(`Running test every ${frequencyInMinutes} minutes`);
  } else {
    console.log('No frequency input provided. Using default of 30 minutes');
  }

  // Run, execute bash script (node app) every 1 minute
  var j = schedule.scheduleJob(`*/${frequencyInMinutes} * * * *`, function(){
    let currentNetworkSsid = '';
    const wifiNetworkNameFinder = exec('/Sy*/L*/Priv*/Apple8*/V*/C*/R*/airport -I | grep -w SSID | awk \'{print $2}\'');

    wifiNetworkNameFinder.stdout?.on('data', (data) => {
      console.log(`Wifi network name: ${data}`);
      currentNetworkSsid = data.toString().trim();
    });

    wifiNetworkNameFinder.on('exit', () => {
      if (!ssids.includes(currentNetworkSsid)) {
        // If not on one of the desired SSIDs, skip test
        console.log(`${new Date()} - Not on a monitored wifi network. Skipping test\n`);
      } else {
        executeJob();
      }
    });
  });

}

runTest();
