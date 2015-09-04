var conf = require('./config');
var fs = require('fs');
var request = require('request');
var CronJob = require('cron').CronJob;


var backup = new CronJob({
  cronTime: '00 00 07 * * *',
  onTick: function() {

    /*
     * This script runs everyday at 7:00am New York time. 
     */
    
    request.get(conf.backupApp.backupURL)
      .on('error', function(err) {
        console.log(err);
      })
      .pipe(fs.createWriteStream('new_backup.json'));
        
    
     console.log("Back up completed!!!");
     
  },
  start: true,
  timeZone: 'America/New_York'
});

backup.start();