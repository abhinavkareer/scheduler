var express = require('express');
var router = express.Router();
var cron = require('node-cron');
var oracledb = require('oracledb');

var dbConfig={
  user          : "sadmin",
  password      : "sadmin",
  connectString : "192.168.1.13:1521/orcl",
  externalAuth  : false
}




router.post('/createSchedule',function(req,res,next){
  console.log("creating a new schedule!");
  // console.log(req);
  var cronSyntax=req.body.cronSyntax;
  var message=req.body.message;

  console.log("cronSyntax: "+cronSyntax);

  console.log("Message: "+message);

  var schedule=cron.schedule(cronSyntax, function(){
    console.log(message+" at :"+Date());
});
console.log(schedule)
              res.json({ error: null, status:schedule });

})




router.get('/listAllStoredProcedures',function(req,res,next)
{

    oracledb.getConnection(
      {
        user          : dbConfig.user,
        password      : dbConfig.password,
        connectString : dbConfig.connectString
      },
      function(err, connection)
      {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Connection was successful!');
      var query="  SELECT * FROM ALL_OBJECTS WHERE OBJECT_TYPE IN ('PROCEDURE') and OWNER like ('"+dbConfig.user.toUpperCase()+"')";
      connection.execute(query,
        function(err, result)
        {
          if (err) { console.error(err.message); return; }
          console.log(result)
          res.json(result);
        });



        connection.release(
          function(err)
          {
            if (err) {
              console.error(err);
              return;
            }
          });
      });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});




module.exports = router;
