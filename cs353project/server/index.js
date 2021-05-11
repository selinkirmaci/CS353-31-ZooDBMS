const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql')

const app = express();

var db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "",
    database: "cruddatabase",
    port: "3306",
});

/*

app.get("/",function(req,res){
    const sqlInsert = "INSERT INTO cage (cageID,capacity,number) VALUES ('1','10','5');";
    db.query(sqlInsert,(err,result)=>{
        res.send("hello selin");
    });
});

 */
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" ,(req,res)=>{
    const sqlInsert = "INSERT INTO cage (cageID,capacity,number) VALUES ('2','2','2');";
    db.query(sqlInsert,(err,result)=>{
        res.send("hello selin");
    });
});

app.post("/api/insert",function(req,res){
    const cageId = req.body.cageID;
    const capacity = req.body.capacity;
    const number = req.body.number;

    const sqlInsert = "INSERT INTO cage (cageID,capacity,number) VALUES (?,?,?);";
    db.query(sqlInsert,[cageId,capacity,number],(err,result)=>{
        res.send("hello selin");
        console.log("newdone");
        console.log(cageId);
    });
});

app.listen(3001, ()=> {
    console.log("running");
});