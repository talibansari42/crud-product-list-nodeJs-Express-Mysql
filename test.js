const mysql = require('mysql');
const express = require('express');
const app = express();

//Create Connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'crud_db'
  });
  
  //connect to database
  conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
  });

  app.get('/',(req, res) => {
    let sql = "SELECT * FROM product";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.render('product_view',{
        results: results
      });
    });
  });