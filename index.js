const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const dbName = 'mobilecare'
const user= 'mobilecareuser';
const pass = 'mobilecare1234'

app.get('/', (req, res)=>{
    res.send('Server is working properly');
});

// database connection
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mobilecareuser:mobilecare1234@cluster0.kjddt.mongodb.net/mobilecare?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const serviceCollection = client.db("mobilecare").collection("services");
    console.log('Database connection successful')
});






app.listen(process.env.PORT || 5000)