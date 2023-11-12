const Photo=require('../models/photo')
const fs=require('fs')

exports.getAllPhotos = async (req, res) => {
    //res.sendFile(path.resolve(__dirname,'temp/index.html'));
    const photos = await Photo.find({}).sort("-dateCreated"); //veri tabanındaki verileri aldık
    res.render("index", {
        photos,
    });
};

exports.getPhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render("photo", {
        photo,
    });
};

exports.createPhoto = async (req, res) => {
    //add.ejs formunda post methoduna action olarak yazdıgımız photos yonlendırmesını burada yakalıyoruz

    const uploadDir = "public/uploads";
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
    let uploadedImage = req.files.image;
    let uploadPath = __dirname + "/../public/uploads/" + uploadedImage.name; //upload edilen fotoların yuklenecıgı yol
    uploadedImage.mv(uploadPath, async () => {
        //mv yani move ile upload olan imageleri gonderiyoruz
        await Photo.create({
            ...req.body,
            image: "/uploads/" + uploadedImage.name,
        }); //post metodu ile gonderilen verileri yakalıp mongoya ekledik
        res.redirect("/");
    });
};

exports.updatePhoto=async (req,res)=>{
    const photo=await Photo.findOne({_id:req.params.id})
    photo.title=req.body.title
    photo.description=req.body.description
    photo.save();
    res.redirect(`/photos/${req.params.id}`)
};

exports.deletePhoto=async(req,res)=>{
    const photo = await Photo.findOne({_id:req.params.id});
    let deletedImage=__dirname+ '/../public'+photo.image
    fs.unlinkSync(deletedImage)
    await Photo.deleteOne({_id:req.params.id})
    res.redirect('/')
};