const express = require("express");
const path=require('path')
const ejs=require('ejs')
const app = express();
const Photo=require('./models/photo');
const mongoose=require('mongoose')
const fileUpload=require('express-fileupload');
const fs=require('fs')
//put ve delete requesti desteklemeyen tarayıcılar icin
const methodOverride=require('method-override')

const port = 3000;

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
app.use(fileUpload());
app.use(methodOverride('_method'));
/* app.use(myLogger); */

//ROUTES
app.get("/", async (req, res) => {
  //res.sendFile(path.resolve(__dirname,'temp/index.html'));
  const photos=await Photo.find({}).sort('-dateCreated') //veri tabanındaki verileri aldık
  res.render('index',{
    photos
  })
});

app.get("/photos/:id",async(req,res)=>{
  //console.log(req.params.id);
  const photo= await Photo.findById(req.params.id)
  res.render('photo', {
    photo
  })
});

app.get("/about",(req,res)=>{
  res.render('about')
});

app.get("/add",(req,res)=>{
  res.render('add')
});

app.post("/photos",async (req,res)=>{ //add.ejs formunda post methoduna action olarak yazdıgımız photos yonlendırmesını burada yakalıyoruz

  const uploadDir='public/uploads';
  if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
  }
  let uploadedImage=req.files.image
  let uploadPath=__dirname + '/public/uploads/' + uploadedImage.name //upload edilen fotoların yuklenecıgı yol
  uploadedImage.mv(uploadPath, async ()=>{ //mv yani move ile upload olan imageleri gonderiyoruz
      await Photo.create({
        ...req.body,
        image:'/uploads/'+uploadedImage.name
      }); //post metodu ile gonderilen verileri yakalıp mongoya ekledik
      res.redirect('/')
    }
  )
});

app.get("/photos/edit/:id", async(req,res)=>{
  const photo=await Photo.findOne({_id:req.params.id})
  res.render('edit',{
    photo
  })
});

app.put("/photos/:id",async (req,res)=>{
  const photo=await Photo.findOne({_id:req.params.id})
  photo.title=req.body.title
  photo.description=req.body.description
  photo.save();
  res.redirect(`/photos/${req.params.id}`)
});


app.listen(port, () => {
  console.log(`sunucu ${port} portunda baslatıldı`);
});