const  express = require('express');

//use process .env variables to keep private variables,
require('dotenv').config();

//Express Middleware
const helmet = require('helmet'); //create headers to protect security attacks
const bodyParser = require('body-parser'); //turns response into usable format
const cors = require('cors'); // allows/disables cross-site communication
const morgan = require('morgan'); //logs requests

//connection to localhost
var db = require('knex')({
   client : 'pg', //connection to postgress
   connection:{
    host : '127.0.0.1',
        user : 'shiro',
        password : 'zoom',
        database : 'crudpractise1'
    }
});

//controllers -aka, the db queries
const main = require('./controllers/main');

//App
const app = express();

//App Middleware
const whitelist = ['https://localhost:3001'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        }else {
            callback(new Error('Not allowed by CORS'))
        }

    }
};
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan('combined')); //use 'tiny' or 'combined'

//App Routes -Auth
app.get('/', (req, res) => res.send('hello world'));
app.get('/crud', (req, res) => main.getTableData(req, res, db));
app.post('/crud', (req, res) => main.postTableData(req, res,db));
app.put('/crud', (req, res) =>main.putTableData(req, res,db));
app.delete('/crud', (req, res) => main.deleteTableData(req, res,db));

// App Server Connection
app.listen(process.env.PORT || 3000, () => {
    console.log('APP IS RUNNING ON PORT ${process.env.PORT || 3000}')
});

