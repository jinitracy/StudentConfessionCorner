const express= require("express");
const ejs = require("ejs");
const _=require("lodash");
const { redirect } = require("express/lib/response");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app=express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var confessions=[];

var sender = nodemailer.createTransport({
    service : "gmail",
    auth: {
        user : "jinitracy03082001@gmail.com",
        pass: "Jinitracy@03"
    }
});

app.listen(process.env.PORT || 3000, function(req,res){
    console.log("Running app on port 3000");
    });

app.get("/",function(req,res){
    res.render("confess");
});

app.get("/home",function(req,res){
    res.render("home", {confessions:confessions});
});

app.get("/contact",function(req,res){
    res.render("contact");
});

app.post("/", function(req,res){
   var confessionText= req.body.confession;
   confessions.push(confessionText);
   res.redirect("/home")

});

app.post("/contact", function(req,res){
     var contact={
         name: req.body.name,
         email: req.body.email,
         message: req.body.message
     };
     console.log(contact);
     JSON.stringify(contact);
     const composemail = {
        from : "jinitracy03082001@gmail.com",
        to: "jinitracy03.tj@gmail.com",
        subject: "Confession",
        html: "<p> Name: " + contact.name + "</p> <br> <p> Email ID : " + contact.email + "</p> <br> <p> Message: " + contact.message + "</p>"
    } 

    sender.sendMail(composemail, function(error,info){
        if(error){
            console.log("Error");
            res.sendFile(__dirname + "/failure.html");
        }
        else{
            console.log("Mail sent" + info.response);
            res.redirect("/home");
        }
    });

     }); 

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.post("/success", function(req,res){
    res.redirect("/");
});


