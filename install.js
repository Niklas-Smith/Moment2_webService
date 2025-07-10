const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
host: process.env.DB_HOST,
user:  process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_DATABASE

})


connection.connect((err) => {
if(err) {
console.error("Database failed to connect" + err)
return; 

}

console.log("connected succesful")
}
)


connection.query("DROP TABLE IF EXISTS workexperience",(error, results) => {
if(error) throw error;

console.log("Table workexperience is droped" + results)


}) 


connection.query(`CREATE TABLE workexperience(
    id INT AUTO_INCREMENT PRIMARY KEY,
    companyname VARCHAR(150),
    jobtitle VARCHAR(150),
    location VARCHAR(150)) `, (error, results) => {
if(error) throw error;

console.log("Table workexperience created" + results)


})




/*
connection.query("CREATE DATABASE webservice_moment2;", (error, results) => {
if(error) throw error;

console.log("Database is created" + results)


})

*/