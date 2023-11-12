const express = require("express");
const ejs=require('ejs')
const app = express();
const mongoose=require('mongoose')
const fileUpload=require('express-fileupload');
//put ve delete requesti desteklemeyen tarayıcılar icin
const methodOverride=require('method-override')
//import controller
const photoController=require('./controllers/photoControllers')
const pageController=require('./controllers/pageController')

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
app.use(methodOverride('_method',{
  methods:['POST','GET']
}));
/* app.use(myLogger); */

//ROUTES
app.get("/",photoController.getAllPhotos);
app.get("/photos/:id",photoController.getPhoto);
app.post("/photos",photoController.createPhoto);
app.put("/photos/:id",photoController.updatePhoto);
app.delete("/photos/:id", photoController.deletePhoto)
app.get("/about",pageController.getAboutPage);
app.get("/add",pageController.getAddPage);
app.get("/photos/edit/:id", pageController.getEditPage);

app.listen(port, () => {
  console.log(`sunucu ${port} portunda baslatıldı`);
});