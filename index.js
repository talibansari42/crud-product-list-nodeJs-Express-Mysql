//use path module
const path = require('path');
var Promise = require('bluebird');
var paginate = require('handlebars-paginate');
var Handlebars= require('handlebars')
Handlebars.registerHelper('paginate', paginate);

//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();

//Create Connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'my_db'
});

//connect to database
// conn.connect((err) =>{
//   if(err) throw err;
//   console.log('Mysql Connected...');
// });

var queryAsync = Promise.promisify(conn.query.bind(conn));
conn.connect();

//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set folder public as static folder for static file
app.use('/assets',express.static(__dirname + '/public'));

process.stdin.resume()
process.on('exit', exitHandler.bind(null, { shutdownDb: true } ));
//route for homepage
app.get('/', function (req, res) {
  var numRows; // total rows
  var queryPagination;
  // var numPerPage = parseInt(req.query.npp, 10) || 1;
  var page = parseInt(req.query.page, 10) || 0;
  var numPerPage = parseInt(req.query.limit, 10) || 10;

  var numPages; //total page
  var skip = page * numPerPage;
  // Here we compute the LIMIT parameter for MySQL query
  var limit = skip + ',' + numPerPage; // row per page
  queryAsync('SELECT count(*) as numRows FROM product')
  .then(function(results) {
    numRows = results[0].numRows;
    numPages = Math.ceil(numRows / numPerPage);
    console.log('Total rows:', numRows);
    console.log('Total pages:', numPages);
  })
  .then(() => queryAsync('select p.product_id, p.product_name, p.product_price , p.category_id, c.category_name from product p , category c where p.category_id=c.category_id ORDER BY product_id ASC LIMIT ' + limit))
  .then(function(results) {
    var responsePayload = {
      results: results
    };
    if (page < numPages) {
      responsePayload.pagination = {
        current: page,
        perPage: numPerPage,
        previous: page > 0 ? page - 1 : undefined,
        next: page < numPages - 1 ? page + 1 : undefined
      }
    }
    else responsePayload.pagination = {
      err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
    }
    // res.json(responsePayload);
    res.render('product_view',{
      results:results
      // pageCount:paginate
    });
  })
  .catch(function(err) {
    console.error(err);
    res.json({ err: err });
  });
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});

function exitHandler(options, err) {
  if (options.shutdownDb) {
    console.log('shutdown mysql connection');
    connection.end();
  }
  if (err) console.log(err.stack);
  if (options.exit) process.exit();
}


//route for insert data
app.post('/save',(req, res) => {
  let data = {product_name: req.body.product_name, product_price: req.body.product_price,category_id: req.body.category_id};
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data,(err, results) => {
    console.log(results)
    if(err) throw err;
    res.redirect('/');
  });
});

//route for update data
app.post('/update',(req, res) => {
  let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' , category_id='"+req.body.category_id+"'  WHERE product_id="+req.body.id;
  let query = conn.query(sql, (err, results) => {
    console.log(results)
    if(err) throw err;
    res.redirect('/');
  });
});

//route for delete data
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM product WHERE product_id="+req.body.product_id+"";
  let query = conn.query(sql, (err, results) => {
    console.log(results)
    if(err) throw err;
      res.redirect('/');
  });
});


