const {Client} = require('pg');
const envrionment = require('./envrionment');
const client = new Client(envrionment.getDbName())
client.connect().then(res=>console.log('connected'));

const customQuery =(query)=>{
  
  return client.query(query);
}

module.exports={customQuery};