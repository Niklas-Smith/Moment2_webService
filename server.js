const mysql = require("mysql");
const express = require("express")
const cors = require("cors")
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const connection = mysql.createConnection({
host: process.env.DB_HOST,
user:  process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_DATABASE

})

app.use(cors());
app.use(express.json());



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

app.get("/api/jobs", (req,res) => {
res.json({message: "get jobs"})
})



app.post("/api/jobs", (req, res) => {
let companyname = req.body.companyname;
let jobtitle = req.body.jobtitle;
let location = req.body.location;

let errors = {
   message:"",
  detail : "",
  http_response: {

  }
};

if(!companyname||!jobtitle||!location) {


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

let jobinfo = {
 companyname: companyname,
jobtitle: jobtitle,
location: location

}
res.json({message: "job is added to table" , jobinfo});
});



app.put("/api/jobs/:id", (req,res) => {
res.json({message: "uppdate job " + req.params.id})
})

app.delete("/api/jobs/:id", (req,res) => {
res.json({message: "deleted job " + req.params.id})
})


app.listen(port, () => {
console.log("server is on port: " + port)

})



/*
{ 
  "companyname": "test" ,
  "jobtitle": "test2" ,
  "location":  "test3"
}


add jobb
*/