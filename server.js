// gör så jag kan använda mysql
const mysql = require("mysql");
// gör så jag kan använda express
const express = require("express")
// gör så jag kan använda corse
const cors = require("cors")
// gör så jag kan använda dotenv
require("dotenv").config();

// gör så att app använder express
const app = express();
// gör so port man starta på är den som står i env filen eller 3000
const port = process.env.PORT || 3000;
// gör så att app använder cors
app.use(cors());
// gör så att app använder express,json()
app.use(express.json());

// skapar anslutning och använder information från .env filen
const connection = mysql.createConnection({
host: process.env.DB_HOST,
user:  process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_DATABASE

})



// ansluter till databasen
connection.connect((err) => {
if(err) {
console.error("Database failed to connect" + err)
return; 

}

console.log("connected succesful")
}
)



app.get("/api", (req, res) => {
res.json({message: "my api"})
})

// skapar ett get begäran där man hämter in allt som finns i tablen workexperien. Detta fungera som ett api.
app.get("/api/jobs", (req,res) => {

  /*
res.json({message: "get jobs"})*/
 // sql som gör att man hämtar ut allt från workexperience.
connection.query(`SELECT * FROM workexperience; `, (err, results) =>{
if (err) {

  res.status(500).json({error: "samething is wrong" + err});
  return
}

console.log(results);
if(results.length===0){
res.status(404).json({message: "no jobs"})
}
else{
  res.json(results);
}

})
});


// skapar ett post begäran där man kan lägga in ny jobb i workexperience.
app.post("/api/jobs", (req, res) => {
let companyname = req.body.companyname;
let jobtitle = req.body.jobtitle;
let location = req.body.location;


// skapar ett error med dessa egenskaper.
let errors = {
   message:"",
  detail : "",
  http_response: {

  }
};

if(!companyname||!jobtitle||!location) {

// skicka error från oven med detta om inte companyname eller jobtitle eller location finns.
  errors.message = "companyname, jobtitle and location is not included"
  errors.detail = "you need to input companyname, jobtitle and location in JSON"
  errors.http_response.message = "bad request"
   errors.http_response.code = 400;

   res.status(400).json(errors);
/*
 res.status(400).json({error: "input companyname, jobtitle and location"});
*/
 return;
}
  // sql som gör att man kan lägga till companyname, jobtitle, location i tabelen workexperience.
connection.query(`INSERT INTO workexperience(companyname, jobtitle, location)VALUES(?, ?, ?);`,[companyname, jobtitle, location], (err, result) => {
if (err) {

  res.status(500).json({error: "samething is wrong" + err});
  return
}
console.log("lagt till" + result)
 // skapar ett object med värde för jobinfo.
let jobinfo = {
 companyname: companyname,
jobtitle: jobtitle,
location: location

}
res.json({message: "job is added to table" , jobinfo});
} )


});


// skapar ett put begäran där man kan uppdatera jobb i workexperience baserat på id.
app.put("/api/jobs/:id", (req,res) => {
const jobid = req.params.id;

// gör and companyname,jobtitle,location ta värden från req.body .
let companyname = req.body.companyname;
let jobtitle = req.body.jobtitle;
let location = req.body.location;
 // skapar ett object med värde för jobs.
let jobs = {
 companyname : companyname,
 jobtitle : jobtitle,
  location : location

}

if(!companyname||!jobtitle||!location) {
return res.status(400).json({message: "You need to input companyname,jobtitle and location" });

}
 // sql som gör att man kan uppdatera companyname, jobtitle, location i tabelen workexperience.
connection.query('UPDATE workexperience SET companyname = ?, jobtitle = ?, location = ? WHERE id = ?', [companyname, jobtitle, location, jobid] , (err , results) => {

  if(err) {
res.status(500).json({message:  "samething went wrong "  });

  } else if (results.affectedRows === 0) {

   res.status(404).json({message: "job is not found"    })
  } else {

    res.json({message: "update jobs " , jobs})
  }

} );

}) ;                
// skapar ett delete begäran där man kan ta bort jobb i workexperience baserat på id
app.delete("/api/jobs/:id", (req,res) => {

const jobDeleteId = req.params.id;

connection.query('DELETE FROM workexperience WHERE id = ?', [jobDeleteId], (err , results) => {
  if(err){
  res.status(500).json({message:  "samething went wrong "  });
   } else if (results.affectedRows === 0) {

   res.status(404).json({message: "job is not found"    })
}  else {

    res.json({message: "delete jobs " , jobDeleteId})
  }
}
)

})
/*
res.json({message: "deleted job " + req.params.id}) */

app.listen(port, () => {
console.log("server is on port: " + port)

})



/*
{ 
  "companyname": "test55" ,
  "jobtitle": "test255" ,
  "location":  "test355"
}
DELETE FROM courses WHERE id=?;

add jobb
*/