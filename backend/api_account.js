const express = require('express');
const mysql = require('mysql');
var cors = require('cors')
const app = express();
const port = 5000 ;
const connection = require('./database')
app.use(cors());
app.get('/api_account', (req, res) => {
    let sql = 'SELECT * FROM account ' ; 
    connection.query(sql, (err,result)=> {
        if(err) throw err 
        res.send(result);
    }) ;
    // res.send('Helloo This is an api !')
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    connection.connect((err=> {
        if(err) throw err ;
        console.log('Connect Succeed !');
    }))
  })
