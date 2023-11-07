const express = require("express");
const path=require('path')
const ejs=require('ejs')
const app = express();
const port = 3000;
const Photo=require('./models/photo');
const mongoose=require('mongoose')

//mongoDb connect
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');


//TEMPLATE ENGİNE
app.set('view engine', 'ejs');

/* const myLogger = (req,res,next) => {
  console.log("logged");
  next(); //next methodunu çağırmazsak bir sonraki middleware çalışmaz
} */

//MIDDLEWARES
app.use(express.static('public')); //static dosyalarımız tanımladık
app.use(express.urlencoded({extended:true}))
app.use(express.json())
/* app.use(myLogger); */

//ROUTES
app.get("/", async (req, res) => {
  //res.sendFile(path.resolve(__dirname,'temp/index.html'));
  const photos=await Photo.find({}) //veri tabanındaki verileri aldık
  res.render('index',{
    photos
  })
});

app.get("/about",(reg,res)=>{
  res.render('about')
});

app.get("/add",(reg,res)=>{
  res.render('add')
});

app.post("/photos",async (req,res)=>{ //add.ejs formunda post methoduna action olarak yazdıgımız /photos
                                //yonlendırmesını burada yakalıyoruz
  await Photo.create(req.body); //post metodu ile gonderilen verileri yakalıp mongoya ekledik
  res.redirect('/')
});

app.listen(port, () => {
  console.log(`sunucu ${port} portunda baslatıldı`);
});