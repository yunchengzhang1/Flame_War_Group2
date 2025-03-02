const pool = require('./db')

module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res, next) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });


//get all users
  app.get('/users', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT * FROM users', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });

  //get all battles
  app.get('/getbattles', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT * FROM battles', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });


  // post username and password
  app.post('/signup', (req, res) => {
    //console.log(req.body.username);
    console.log('hello' + req.body);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO `db`.`users` (`userID`, `username`, `password`) VALUES(\'' + req.body.userID + '\', \'' + req.body.username + '\', \'' + req.body.password + '\')', function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table');
          } else {
            res.status(200).send(`added ${req.body.username} to the table!`);
          }
        });
      }
    });
  });

  // post username and password
  app.post('/addfriendship', (req, res) => {
    //console.log(req.body.username);
    console.log('hello' + req.body);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO `db`.`friends` (`userID1`, `userID2`) VALUES(\'' + req.body.userID1 + '\', \'' + req.body.userID2 + '\')', function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table');
          } else {
            res.status(200).send(`added ${req.body.userID1} to the table!`);
          }
        });
      }
    });
  });


  // post username and password
  app.get('/login', function (req, res) {


    var username = req.param('username');
    var password = req.param('password');
    console.log('hello ' + username);

    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT `userID` FROM `db`.`users` WHERE `username`=? AND `password`=?', [username, password], function (error, results, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem getting from test table: \n", err);
            res.status(400).send('Problem getting from table');
          } else {
            res.end(JSON.stringify(results));
          }
        });
      }
    });
  });

  // post a battle
  app.post('/makebattle', (req, res) => {
    //console.log(req.body.username);
    console.log('hello' + req.body);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO `db`.`battles` (`battleID`, `battleTopic`, `battleDescription`, `user1`, `user2`) VALUES(\'' + req.body.battleID + '\', \'' + req.body.battleTopic + '\', \'' + req.body.battleDescription + '\', \'' + req.body.user1 + '\', \'' + req.body.user2 + '\')', function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table');
          } else {
            res.status(200).send(`added ${req.body.battleTopic} to the table!`);
          }
        });
      }
    });
  });


  // post a message
  app.post('/postmessage', (req, res) => {
    //console.log(req.body.username);
    console.log('hello' + req.body);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO `db`.`messages` (`messageID`, `battleID`, `message`, `senderName`, `userID`, `timestamp`) VALUES(\'' + req.body.messageID + '\', \'' + req.body.battleID + '\', \'' + req.body.message + '\', \'' + req.body.senderName + '\', \'' + req.body.userID + '\', \'' + req.body.timestamp + '\')', function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table');
          } else {
            res.status(200).send(`added ${req.body.message} to the table!`);
          }
        });
      }
    });
  });
  
  // get user by id
  app.get('/getuserbyid', (req, res) => {
    //console.log(req.body.username);
    console.log(req.body);
    var userID = req.param('userID');
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT * FROM `db`.`users` WHERE `userID`=?', [userID], function (err, results, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.end(JSON.stringify(results));
          }
        });
      }
    });
  });

  // get user by id
  app.get('/getmessagesbyid', (req, res) => {
    //console.log(req.body.username);
    var battleID = req.param('battleID');
    console.log("BattleID: ", battleID);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT * FROM `db`.`messages` WHERE `battleID`=?', [battleID], function (err, results, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.end(JSON.stringify(results));
          }
        });
      }
    });
  });


  // get battle by id
  app.get('/getbattlebyid', (req, res) => {
    //console.log(req.body.username);
    console.log(req.body);
    var battleID = req.param('battleID');
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT * FROM `db`.`battles` WHERE `battleID`=?', [battleID], function (err, results, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.end(JSON.stringify(results));
          }
        });
      }
    });
  });


  // add a user
  app.put('/joinbattle', (req, res) => {
    //console.log(req.body.username);
    console.log('hello' + req.body);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('UPDATE `db`.`battles` SET `user2` = \'' + req.body.user2 + '\' WHERE battleID = \'' + req.body.battleID + '\'', function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table');
          } else {
            res.status(200).send(`added ${req.body.user2} to the table!`);
          }
        });
      }
    });
  });
  //delete a user
  app.delete('/deleteuser', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('DELETE FROM `db`.`users` WHERE UserID = ' + req.body.userID, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });


//delete a battle
  app.delete('/deletebattle', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('DELETE FROM `db`.`battles` WHERE battleID = ' + req.body.battleID, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });


  // delete all messages in a specific battle
  app.delete('/deletemessagesbyid', (req, res) => {
    //console.log(req.body.username);
    var battleID = req.param('battleID');
    console.log(req.body);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('DELETE FROM `db`.`messages` WHERE `battleID`=?', [battleID], function (err, results, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.end(JSON.stringify(results));
          }
        });
      }
    });
  });


  app.get('/getallfriends', (req, res) => {
    //console.log(req.body.username);
    console.log(req.body);
    var userID = req.param('userID');
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT * FROM `db`.`friends` WHERE `userID1`=?', [userID], function (err, results, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.end(JSON.stringify(results));
          }
        });
      }
    });
  });

  app.delete('/deletemessagesbyid', (req, res) => {
    //console.log(req.body.username);
    var battleID = req.param('battleID');
    console.log(req.body);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('DELETE FROM `db`.`messages` WHERE `battleID`=?', [battleID], function (err, results, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.end(JSON.stringify(results));
          }
        });
      }
    });
  });


  //delete a friend
  app.delete('/deletefriendbyid', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('DELETE FROM db.friends WHERE userID1 = ' + req.body.userID1 + ' AND userID2 = ' + req.body.userID2, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });


  app.post('/likemessage', (req, res) => {
    //console.log(req.body.username);
    console.log('hello' + req.body);
    console.log('INSERT INTO `db`.`likes`(messageID, userID) SELECT  \'' + req.body.messageID + '\',  \'' + req.body.userID + '\' FROM DUAL WHERE NOT EXISTS `messageID` = \'' + req.body.messageID + '\' AND `userID` = \'' + req.body.userID + '\' LIMIT 1');
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        if(req.body.messageID != req.body.userID) {
          connection.query('INSERT INTO `db`.`likes`(messageID, userID) SELECT  \'' + req.body.messageID + '\',  \'' + req.body.userID + '\' FROM DUAL WHERE NOT EXISTS (SELECT * FROM `likes` WHERE `messageID` = \'' + req.body.messageID + '\' AND `userID` = \'' + req.body.userID + '\' LIMIT 1)', function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem inserting into test table: \n", err);
              res.status(400).send('Problem inserting into table'); 
            } else {
              res.status(200).send(`added ${req.body.messageID} to the table!`);
            }
          });
        }
      }
    });
  });

  app.get('/getbattlescore', function (req, res) {


    var battleID = req.param('messageID');
    var userID = req.param('userID');
    console.log(battleID, userID);
  
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT COUNT(*) FROM `db`.`messages` JOIN `likes` ON `messages`.`messageID` = `likes`.`messageID` WHERE `messages`.`battleID`=? AND `messages`.`userID`=?', [battleID, userID], function (error, results, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem getting from test table: \n", err);
            res.status(400).send('Problem getting from table');
          } else {
            res.end(JSON.stringify(results));
          }
        });
      }
    });
  });


  app.delete('/unlikemessage', (req, res) => {
    //console.log(req.body.username);
    console.log('hello' + req.body);
      // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        if(req.body.messageID != req.body.userID) {
          connection.query('DELETE FROM `likes` WHERE `messageID` = \'' + req.body.messageID + '\' AND `userID` = \'' + req.body.userID + '\'', function (err, rows, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem inserting into test table: \n", err);
              res.status(400).send('Problem inserting into table'); 
            } else {
              res.status(200).send(`added ${req.body.messageID} to the table!`);
            }
          });
        }
      }
    });
  });

}