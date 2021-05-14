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

app.post("/api/getUserMoney" ,(req,res)=>{
    const visitorID = req.body.userID;
    const sqlInsert = "SELECT amountOfMoney FROM visitor where visitorID = ?;";
    db.query(sqlInsert,[visitorID],(err,result)=>{
        //var d = JSON.parse(JSON.stringify(result[0]));
        //res.send(d.amountOfMoney.toString());
        console.log("öomeınl");
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

app.get("/api/getKeepers" ,(req,res)=>{
    const sqlInsert = "SELECT * FROM user WHERE userID in (SELECT employeeID FROM employee WHERE employeeID in (SELECT keeperID FROM keeper ));";
    db.query(sqlInsert,(err,result)=>{
        res.send(result);
    });
});

app.post("/api/getAssignedCages" ,(req,res)=>{
    const keeperID = req.body.keeperID;
    const sqlInsert = "SELECT * FROM cage WHERE cageID in (SELECT cageID FROM assign WHERE keeperID = ?);";
    db.query(sqlInsert,[keeperID],(err,result)=>{
        res.send(result);
    });
});
app.post("/api/getUserInformation" ,(req,res)=>{
    const userID = req.body.userID;
    const sqlInsert = "select * from user u, visitor v where v.visitorID = u.userID and v.visitorID = ?;";
    db.query(sqlInsert,[userID],(err,result)=>{
        res.send(result);
    });
});
app.post("/api/getRegisteredEvents" ,(req,res)=>{
    const userID = req.body.userID;

    const sqlInsert = "SELECT * FROM event e,register_event r where e.eventID = r.eventID and visitorID = ?;";
    db.query(sqlInsert,[userID],(err,result)=>{
        res.send(result);
    });
});
app.post("/api/requestRefund" ,(req,res)=>{
    const userID = req.body.userID;
    const eventID = req.body.eventID;


    const sqlInsert = "insert into request_refund (visitorID,coordID,eventID) values (?,(select max(coordID) from coordinator),?)";
    db.query(sqlInsert,[userID,eventID],(err,result)=>{
        res.send(result);
    });
});



app.post("/api/getAnimalsOfCage" ,(req,res)=>{
    const cageId = req.body.cageID;
    const sqlInsert = "SELECT * FROM animal WHERE animalID in (SELECT animalID FROM kept_in WHERE cageID = ?);";
    db.query(sqlInsert,[cageId],(err,result)=>{
        res.send(result);
    });
});

app.get("/api/getVeterinarians" ,(req,res)=>{
    const sqlInsert = "SELECT name, userID FROM user WHERE userID in ( SELECT employeeID FROM employee WHERE employeeID in ( SELECT vetID FROM veterinarian ) );";
    db.query(sqlInsert,(err,result)=>{
        res.send(result);
    });
});

app.get("/api/getComplaints" ,(req,res)=>{
    const sqlInsert = "SELECT * from complaint_form;";
    db.query(sqlInsert,(err,result)=>{
        res.send(result);
    });
});

app.post("/api/assignKeeper" ,(req,res)=>{
    const cageId = req.body.cageID;
    const keeperID = req.body.keeperID;

    console.log(cageId);
    console.log(keeperID);
    const sqlInsert = "INSERT INTO assign VALUES ( ?, (SELECT max(coordID) FROM coordinator), ? );";

    db.query(sqlInsert,[keeperID,cageId],(err,result)=>{
        res.send(result);
    });
});

app.post("/api/respondToForm" ,(req,res)=>{
    const formID = req.body.formID;
    const respond = req.body.respond;

    const sqlInsert = "insert into respond_form (formID,coordID,response) values (?,(select max(coordID) from coordinator),?);";
    const sqlDelete2 = "DELETE FROM complaint_form WHERE formID = ?;";
    const sqlDelete = "DELETE FROM create_form WHERE formID = ?;";

    db.query(sqlInsert,[formID,respond],(err,result)=>{
    });
 /*
    db.query(sqlDelete2,[formID],(err,result)=>{
    });
    db.query(sqlDelete,[formID],(err,result)=>{
    });
  */
});
app.post("/api/displayTrainings" ,(req,res)=>{
    const keeperID = req.body.keeperID;

    const sqlInsert = "SELECT * FROM schedule_training s,animal a where keeperID = ? and s.animalID = a.animalID;";

    db.query(sqlInsert,[keeperID],(err,result)=>{
        res.send(result);
    });
});


app.post("/api/scheduleTraining" ,(req,res)=>{
    const animalID = req.body.animalID;
    const keeperID = req.body.keeperID;
    const trainingDate = req.body.trainingDate;


    const sqlInsert = "insert into schedule_training value (?,?,?);";

    db.query(sqlInsert,[keeperID,animalID,trainingDate],(err,result)=>{
        console.log(err);
    });
    /*
       db.query(sqlDelete2,[formID],(err,result)=>{
       });
       db.query(sqlDelete,[formID],(err,result)=>{
       });
     */
});

app.post("/api/assignVeterinarian" ,(req,res)=>{
    const vetID = req.body.vetID;
    const animalID = req.body.animalID;

    const sqlInsert = "INSERT INTO treatment_request VALUES ( (SELECT max(keeperID) from keeper), ?,?,'pending' );";

    db.query(sqlInsert,[vetID,animalID],(err,result)=>{
        res.send(result);
    });
});
app.post("/api/inviteVeterinarian" ,(req,res)=>{
    const vetID = req.body.vetID;
    const eventID = req.body.eventID;

    const sqlInsert = "INSERT INTO invite VALUES ( ?,(SELECT max(coordID) from coordinator), ?,'pending' );";

    db.query(sqlInsert,[vetID,eventID],(err,result)=>{
        res.send(result);
    });
});
app.post("/api/listTreatmentRequests" ,(req,res)=>{
    const vetID = req.body.vetID;

    const sqlInsert = "SELECT * FROM animal WHERE animalID in (SELECT animalID FROM treatment_request WHERE vetID = ? and status = 'pending');";

    db.query(sqlInsert,[vetID],(err,result)=>{
        res.send(result);
    });
});
app.post("/api/listEducationalInvitations" ,(req,res)=>{
    const vetID = req.body.vetID;

    const sqlInsert = "SELECT * FROM event WHERE eventID in (SELECT eventID FROM invite WHERE vetID = ? and status='pending');";

    db.query(sqlInsert,[vetID],(err,result)=>{
        res.send(result);
    });
});

app.post("/api/listEducationalInvitationsRegistered" ,(req,res)=>{
    const vetID = req.body.vetID;

    const sqlInsert = "SELECT * FROM event e,educational_program ep WHERE e.eventID in (SELECT eventID FROM invite WHERE vetID = ? and status='accepted') and e.eventID = ep.eventID;";

    db.query(sqlInsert,[vetID],(err,result)=>{
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

    });
});

app.get("/api/listRefundRequests",function(req,res){

    const sqlInsert = "select e.name as eventName, u.name,u.surname,u.userID,e.eventID, g.price from event e,visitor v,user u, request_refund r, group_tour g where e.eventID = r.eventID and u.userID = v.visitorID and r.visitorID = v.visitorID and g.eventID = e.eventID;";
    db.query(sqlInsert,(err,result)=>{
        res.send(result);

    });
});

app.post("/api/login" ,(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const sqlInsert = "SELECT * FROM user WHERE user.username = ? and user.password= ?;";

    console.log(username);
    console.log(password);

    db.query(sqlInsert,[username,password],(err,result)=>{
        var d = JSON.parse(JSON.stringify(result[0]));
        console.log(d.userID);
        console.log("succesfull login");
        res.send(d.userID.toString());
        console.log("after readin toStirng")
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
    });
    db.query(sqlInsert2,[price,tourGuide],(err,result)=>{
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

app.post("/api/acceptRefund" ,(req,res)=>{
    const eventID = req.body.eventID;
    const userID = req.body.userID;

    console.log(eventID);
    console.log(userID);

    const sqlInsert = "DELETE FROM register_event WHERE eventID = ? and visitorID = ?;";
    const sqlInsert2 = "DELETE FROM request_refund WHERE eventID = ? and visitorID = ?;";

    db.query(sqlInsert,[eventID,userID],(err,result)=>{
    });
    db.query(sqlInsert2,[eventID,userID],(err,result)=>{
    });

});

app.post("/api/rejectRefund" ,(req,res)=>{
    const eventID = req.body.eventID;
    const userID = req.body.userID;

    console.log(eventID);
    console.log(userID);

    const sqlInsert = "DELETE FROM register_event WHERE eventID = ? and visitorID = ?;";
    const sqlInsert2 = "DELETE FROM request_refund WHERE eventID = ? and visitorID = ?;";

    db.query(sqlInsert,[eventID,userID],(err,result)=>{
    });
    db.query(sqlInsert2,[eventID,userID],(err,result)=>{
    });

});


app.put("/api/updateUserMoney" ,(req,res)=>{
    const userID = req.body.userID;
    const price = req.body.price;

    const sqlInsert = "update visitor set amountOfMoney = (select amountOfMoney from user u, visitor v  where u.userID = ? and u.userID = v.visitorID) - ? where visitorID = ?;";

    db.query(sqlInsert,[userID,price,userID],(err,result)=>{
    });
});

app.put("/api/uploadMoney" ,(req,res)=>{
    const userID = req.body.userID;
    const price = req.body.price;

    const sqlInsert = "update visitor set amountOfMoney = (select amountOfMoney from user u, visitor v  where u.userID = ? and u.userID = v.visitorID) + ? where visitorID = ?;";


    db.query(sqlInsert,[userID,price,userID],(err,result)=>{
    });
});

app.put("/api/updateMoneyRaised" ,(req,res)=>{
    const price = req.body.price;
    const eventID = req.body.eventID;

    console.log(eventID);
    const sqlInsert = "update conservation_organization set totalMoneyRaised = (select totalMoneyRaised from conservation_organization c, event e where e.eventID = c.eventID and e.eventID =?)+? where eventID = ?;";


    db.query(sqlInsert,[eventID,price,eventID],(err,result)=>{
        console.log("done");
    });
});

app.put("/api/giveRefund" ,(req,res)=>{
    const userID = req.body.userID;
    const eventID = req.body.eventID;

    const sqlInsert = "update visitor v set v.amountOfMoney = v.amountOfMoney + (select g.price from event e,request_refund r,group_tour g where e.eventID = r.eventID and e.eventID = ? and e.eventID = g.eventID) where v.visitorID = ?; ";


    db.query(sqlInsert,[eventID,userID],(err,result)=>{
        console.log("refund given");
    });
});

app.put("/api/acceptTreatment" ,(req,res)=>{
    const vetID = req.body.vetID;
    const animalID = req.body.animalID;

    const sqlInsert = "update treatment_request set status = 'accepted' where vetID = ? and animalID = ?; ";


    db.query(sqlInsert,[vetID,animalID],(err,result)=>{
        console.log(vetID + " accepted treatment ");
    });
});

app.put("/api/acceptInvitation" ,(req,res)=>{
    const vetID = req.body.vetID;
    const eventID = req.body.eventID;

    const sqlInsert = "update invite set status = 'accepted' where vetID = ? and eventID = ?; ";


    db.query(sqlInsert,[vetID,eventID],(err,result)=>{
        console.log(vetID + " accepted treatment ");
    });
});


app.put("/api/rejectInvitation" ,(req,res)=>{
    const vetID = req.body.vetID;
    const eventID = req.body.eventID;

    const sqlInsert = "update invite set status = 'rejected' where vetID = ? and eventID = ?; ";


    db.query(sqlInsert,[vetID,eventID],(err,result)=>{
        console.log(vetID + " accepted treatment ");
    });
});



app.post("/api/displayTreatments" ,(req,res)=>{
    const vetID = req.body.vetID;

    const sqlInsert = "select * from animal a, treatment_request t where t.vetID = 55 and t.status = 'accepted' and t.animalID = a.animalID; ";

    db.query(sqlInsert,[vetID],(err,result)=>{
        res.send(result);
    });
});


app.put("/api/rejectTreatment" ,(req,res)=>{
    const vetID = req.body.vetID;
    const animalID = req.body.animalID;

    const sqlInsert = "update treatment_request set status = 'rejected' where vetID = ? and animalID = ?; ";


    db.query(sqlInsert,[vetID,animalID],(err,result)=>{
        console.log(vetID + " accepted treatment ");
    });
});

app.post("/api/registerToEvent" ,(req,res)=>{
    const visitorID = req.body.userID;
    const eventID = req.body.eventID;
    const price = req.body.price;


    const sqlInsert = "INSERT INTO register_event (visitorID,eventID) VALUES (?,?);";
    const sqlInsert2 = "update visitor set amountOfMoney = (select amountOfMoney from user u, visitor v  where u.userID = ? and u.userID = v.visitorID) - ? where visitorID = ?;";

    console.log(visitorID);
    console.log(eventID);

    db.query(sqlInsert,[visitorID,eventID],(err,result)=>{
    });
    db.query(sqlInsert2,[visitorID,price,visitorID],(err,result)=>{
    });
});



app.post("/api/getAnimalTreatments" ,(req,res)=>{
    const animalID = req.body.animalID;

    const sqlInsert = "SELECT * FROM animal,veterinarian,user where animalID in (select a.animalID from animal a, treatment_request t where a.animalID = t.animalID and a.animalID = ? and t.status = 'pending') and vetID in (select t.vetID from animal a, treatment_request t where a.animalID = t.animalID and a.animalID = ? and t.status = 'pending') and vetID = userID;";


    db.query(sqlInsert,[animalID,animalID],(err,result)=>{
        res.send(result);
    });
});
app.post("/api/getAnimalTrainings" ,(req,res)=>{
    const animalID = req.body.animalID;

    const sqlInsert = "select u.name,s.trainingDate,u.surname from keeper k,user u,animal a,schedule_training s where s.keeperID = u.userID and k.keeperID = s.keeperID and a.animalID = ? and a.animalID = s.animalID;";


    db.query(sqlInsert,[animalID],(err,result)=>{
        res.send(result);
    });
});
app.post("/api/sendComplaint" ,(req,res)=>{

    const name = req.body.name;
    const subject = req.body.subject;
    const message = req.body.message;
    const userID = req.body.userID;

    const sqlInsert = "insert into complaint_form (name,subject,message,date) values (?,?,?,'2020-02-02');";
    const sqlInsert2 = "insert into create_form (formID,visitorID,eventID) values ((select max(formID) from complaint_form),?,(select max(eventID) from group_tour));";


    db.query(sqlInsert,[name,subject,message],(err,result)=>{
    });
    db.query(sqlInsert2,[userID],(err,result)=>{
        res.send(result);
    });

});





app.listen(3001, ()=> {
    console.log("running");
});