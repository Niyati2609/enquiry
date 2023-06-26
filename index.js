const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors())
app.use(express.json())


function sendEmail(name,phone,query,mail)
{
let transporter = nodemailer.createTransport({
service: "gmail",
auth : {
user : "2021.niyati.gaonkar@ves.ac.in",
pass : "dhkeqhlgnttsjjdd"
}
});

let mailOptions = {
from : "2021.niyati.gaonkar@ves.ac.in",
to : mail,
subject : "Enquiry Form " + name ,
text : phone + " " + query
}

transporter.sendMail(mailOptions , (err,info) => {
if(err)		console.log("mail error " ,err);
else		console.log("mail send " ,info.response);
})
}


app.post("/save",(req,res) => {
const name = req.body.name;
const phone = req.body.phone;
const query = req.body.query;
const mail = req.body.mail;
console.log(name + " " + phone + " " + query);
sendEmail(name,phone,query,mail);
res.send("success");
})

app.listen(9000 , ()=> { console.log("ready at 9000 ")} )