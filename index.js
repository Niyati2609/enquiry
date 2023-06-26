const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors())
app.use(express.json())


const sendEmail = async(name,phone,query,mail) =>
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

await transporter.sendMail(mailOptions) ;      
}


app.get('/',(req,res)=>{
    res.status(200).json({
        status:'Success',
        message:'Your api is working fine'
    })
})

app.post("/save",async(req,res) => {
const name = req.body.name;
const phone = req.body.phone;
const query = req.body.query;
const mail = req.body.mail;
console.log(name + " " + phone + " " + query);
await sendEmail(name,phone,query,mail);
res.send("success");
})

app.all('*',(req,res)=>{
    res.status(400).json({
        status:'fail',
        message:'An unexpected error has occured'
    })
});

app.listen(9000 , ()=> { console.log("ready at 9000 ")} )
