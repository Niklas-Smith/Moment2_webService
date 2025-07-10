/*Gör så man kan använda mysql   */
const mysql = require("mysql");

/*Gör så man kan använda dotenv (.env fil)   */
require("dotenv").config();

/* gör så man använder insällningar för host,user,password och database från .env filen  */
const connection = mysql.createConnection({
host: process.env.DB_HOST,
user:  process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_DATABASE

})

/*Gör så man kan anslutar  */
connection.connect((err) => {
if(err) {
console.error("Database failed to connect" + err)
return; 
}
console.log("connected succesful")
}
)

/*ta bort tabelen workexperience om den finns  */
connection.query("DROP TABLE IF EXISTS workexperience",(error, results) => {
if(error) throw error;

console.log("Table workexperience is droped" + results)


}) 

/*skapar tabelen workexperience  */
connection.query(`CREATE TABLE workexperience(
    id INT AUTO_INCREMENT PRIMARY KEY,
    companyname VARCHAR(150),
    jobtitle VARCHAR(150),
    location VARCHAR(150)) `, (error, results) => {
if(error) throw error;

console.log("Table workexperience created" + results)


})
/*sätt in värde i tabelen  */
connection.query("INSERT INTO workexperience(companyname, jobtitle, location)VALUES(?, ?, ?)", ["Sekant", "Säsongsarbete", "Malmö"], (error, results) => {
if(error) throw error;


})
/*sätt in värde i tabelen  */
connection.query("INSERT INTO workexperience(companyname, jobtitle, location)VALUES(?, ?, ?)", ["Malmö stad", "Kontorsvaktmästare", "Malmö"], (error, results) => {
if(error) throw error;


})

/*sätt in värde i tabelen  */
connection.query("INSERT INTO workexperience(companyname, jobtitle, location)VALUES(?, ?, ?)", ["Goveteran", "Diversearbetare ", "Höllviken"], (error, results) => {
if(error) throw error;


})
/*sätt in värde i tabelen  */
connection.query("INSERT INTO workexperience(companyname, jobtitle, location)VALUES(?, ?, ?)", ["Kvällposten", "Tidningsbud ", "Skegrie"], (error, results) => {
if(error) throw error;


})
/*
connection.query("CREATE DATABASE webservice_moment2;", (error, results) => {
if(error) throw error;

console.log("Database is created" + results)


})

*/
