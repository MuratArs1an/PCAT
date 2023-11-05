const express = require("express");
const path=require('path')
const ejs=require('ejs')
const app = express();
const port = 3000;


//TEMPLATE ENGİNE
app.set('view engine', 'ejs');

/* const myLogger = (req,res,next) => {
  console.log("logged");
  next(); //next methodunu çağırmazsak bir sonraki middleware çalışmaz
} */

//MIDDLEWARES
app.use(express.static('public'));
/* app.use(myLogger); */

app.get("/", (req, res) => {
  //res.sendFile(path.resolve(__dirname,'temp/index.html'));
  res.render('index')
});

app.get("/about",(reg,res)=>{
  res.render('about')
});

app.get("/add",(reg,res)=>{
  res.render('add')
});

app.listen(port, () => {
  console.log(`sunucu ${port} portunda baslatıldı`);
});