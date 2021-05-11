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

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" ,(req,res)=>{
    const sqlInsert = "INSERT INTO cage (cageID,capacity,number) VALUES ('2','2','2');";
    db.query(sqlInsert,(err,result)=>{
        res.send("hello selin");
    });
});


app.get("/api/listEventsToVisitor" ,(req,res)=>{
    const sqlInsert = "SELECT * FROM event";
    db.query(sqlInsert,(err,result)=>{
        res.send(result);
    });
});

app.get("/api/listGuideTour" ,(req,res)=>{
    const sqlInsert = "SELECT * FROM group_tour ep, event e WHERE ep.eventID = e.eventID";
    db.query(sqlInsert,(err,result)=>{
        res.send(result);
    });
});
app.get("/api/listEducationalPrograms" ,(req,res)=>{
    const sqlInsert = "SELECT * FROM educational_program ep, event e WHERE ep.eventID = e.eventID";
    db.query(sqlInsert,(err,result)=>{
        res.send(result);
    });
});
app.get("/api/listConservationOrganizations" ,(req,res)=>{
    const sqlInsert = "SELECT * FROM conservation_organization ep, event e WHERE ep.eventID = e.eventID";
    db.query(sqlInsert,(err,result)=>{
        res.send(result);
    });
});

app.get("/api/getAllCages" ,(req,res)=>{
    const sqlInsert = "SELECT * FROM cage;";
    db.query(sqlInsert,(err,result)=>{
        res.send(result);
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

app.post("/api/login" ,(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const sqlInsert = "SELECT * FROM user WHERE user.username = ? and user.password= ?;";


    db.query(sqlInsert,[username,password],(err,result)=>{
        var d = JSON.parse(JSON.stringify(result[0]));
        console.log(d.userID);
        console.log("succesfull login");
        res.send(d.userID.toString());
    });
});

app.post("/api/addNewGroupTour" ,(req,res)=>{

    const name = req.body.name;
    const capacity = req.body.capacity;
    const time = req.body.time;
    const date= req.body.date;
    const location = req.body.location;
    const duration = req.body.duration;
    const  price = req.body.price;
    const tourGuide = req.body.tourGuide;

    const sqlInsert = "INSERT INTO event (coordID,name,capacity,time,date,location,duration) VALUES ((SELECT MAX(coordID) FROM coordinator),?,?,?,?,?,?);";
    const sqlInsert2 = "INSERT INTO group_tour (coordID,eventID,price,tourGuide) VALUES ((SELECT MAX(coordID) FROM coordinator),(SELECT MAX(eventID) FROM event),?,?);";

    db.query(sqlInsert,[name,capacity,time,date,location,duration],(err,result)=>{
        console.log(err);
    });
    db.query(sqlInsert2,[price,tourGuide],(err,result)=>{
        console.log(err);
    });
});
app.post("/api/addNewEducationalProgram" ,(req,res)=>{

    const name = req.body.name;
    const capacity = req.body.capacity;
    const time = req.body.time;
    const date= req.body.date;
    const location = req.body.location;
    const duration = req.body.duration;
    const  speaker = req.body.speaker;
    const  topic = req.body.topic;

    const sqlInsert = "INSERT INTO event (coordID,name,capacity,time,date,location,duration) VALUES ((SELECT MAX(coordID) FROM coordinator),?,?,?,?,?,?);";
    const sqlInsert2 = "INSERT INTO educational_program (coordID,eventID,speaker,topic) VALUES ((SELECT MAX(coordID) FROM coordinator),(SELECT MAX(eventID) FROM event),?,?);";

    db.query(sqlInsert,[name,capacity,time,date,location,duration],(err,result)=>{
        console.log(err);
    });
    db.query(sqlInsert2,[speaker,topic],(err,result)=>{
        console.log(err);
    });
});
app.post("/api/addNewConservationalOrganization" ,(req,res)=>{

    const name = req.body.name;
    const capacity = req.body.capacity;
    const time = req.body.time;
    const date= req.body.date;
    const location = req.body.location;
    const duration = req.body.duration;
    const  goal = req.body.goal;

    const sqlInsert = "INSERT INTO event (coordID,name,capacity,time,date,location,duration) VALUES ((SELECT MAX(coordID) FROM coordinator),?,?,?,?,?,?);";
    const sqlInsert2 = "INSERT INTO conservation_organization (coordID,eventID,totalMoneyRaised) VALUES ((SELECT MAX(coordID) FROM coordinator),(SELECT MAX(eventID) FROM event),?);";

    db.query(sqlInsert,[name,capacity,time,date,location,duration],(err,result)=>{
        console.log(err);
    });
    db.query(sqlInsert2,[goal],(err,result)=>{
        console.log(err);
    });
});

app.post("/api/visitor/signup",function (req,res){
    const name=req.body.name;
    const surname=req.body.surname;
    const birthday=req.body.birthday;
    const  email=req.body.email;
    const username=req.body.username;
    const password=req.body.password;
    const cardOwner=req.body.cardOwner;
    const creditCardNo=req.body.creditCardNo;
    const cvc=req.body.cvc;
    const expirationDate=req.body.expirationDate;
    const amountOfMoney = req.body.amountOfMoney;
    var userID ="";
    var visitorID ="";

    const selectmax= "SELECT MAX(userID) FROM user;";

    const sqlInsert = "INSERT INTO user (username,name,surname,birthday,email,password) VALUES (?,?,?,?,?,?);";
    const sqlInsert2 = "INSERT INTO visitor (visitorID,creditCardNo,cvc,cardOwner,expirationDate,amountOfMoney) VALUES ((SELECT MAX(userID) FROM user),?,?,?,?,?);";

    db.query(selectmax,(err,result)=>{
        visitorID = result[0];
        let d = JSON.parse(JSON.stringify(result[0]));
        console.log(d);
    });

    db.query(sqlInsert,[username,name,surname,birthday,email,password],(err,result)=>{
        console.log("user instertion done");
    });


    db.query(sqlInsert2,[creditCardNo,cvc,cardOwner,expirationDate,amountOfMoney],(err,result)=>{
        console.log("visitor instertion done");
        console.log(err);
        console.log(result);
    });
});

app.delete("/api/deleteEducational/:eventID" ,(req,res)=>{
    const eventID = req.params.eventID;
    const sqlInsert = "DELETE FROM event WHERE eventID = ? and coordID = (SELECT MAX(coordID) FROM coordinator);";
    const sqlInsert2 = "DELETE FROM educational_program WHERE eventID = ?;";
    db.query(sqlInsert2,[eventID],(err,result)=>{
    });
    db.query(sqlInsert,[eventID],(err,result)=>{
    });
});

app.delete("/api/deleteGroupTour/:eventID" ,(req,res)=>{
    const eventID = req.params.eventID;
    const sqlInsert = "DELETE FROM event WHERE eventID = ? and coordID = (SELECT MAX(coordID) FROM coordinator);";
    const sqlInsert2 = "DELETE FROM group_tour WHERE eventID = ?;";
    db.query(sqlInsert2,[eventID],(err,result)=>{
    });
    db.query(sqlInsert,[eventID],(err,result)=>{
    });
});
app.delete("/api/deleteConOrg/:eventID" ,(req,res)=>{
    const eventID = req.params.eventID;
    const sqlInsert = "DELETE FROM event WHERE eventID = ? and coordID = (SELECT MAX(coordID) FROM coordinator);";
    const sqlInsert2 = "DELETE FROM conservation_organization WHERE eventID = ?;";
    db.query(sqlInsert2,[eventID],(err,result)=>{
    });
    db.query(sqlInsert,[eventID],(err,result)=>{
    });
});

app.put("/api/updateUserMoney" ,(req,res)=>{
    const userID = req.body.userID;
    const price = req.body.price;
    console.log(userID);
    console.log(price);


    const sqlInsert = "update visitor set amountOfMoney = (select amountOfMoney from user u, visitor v  where u.userID = ? and u.userID = v.visitorID) - ? where visitorID = ?;";

    db.query(sqlInsert,[userID,price,userID],(err,result)=>{
        console.log("done");
        console.log(result);
    });
});

app.listen(3001, ()=> {
    console.log("running");
});