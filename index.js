const {
    Client
      } = require('pg');

//ElephantSQL
const client = new Client({
    user:'',
    host:'motty.db.elephantsql.com',
    database:'',
    password:'',
    port:'432'
});

teste = async () =>{
    try{await client.connect()}catch(err){console.log(err)}
};

teste();