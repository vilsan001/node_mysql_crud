const mysql = require('mysql')
const conn = mysql.createConnection({
    host:'localhost',
user:'root',
password:'',
database:'project'
})


/* conn.connect((err)=>{

if(err) throw err;
console.log('connected')

})  */


module.exports = conn;