const mongoose=require('mongoose')
const Schema=mongoose.Schema

//Connect DB
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

//Create Schema
const PhotoSchema=new Schema(
    {
        title:String,
        description:String
    }
);

const Photo=mongoose.model('Photo', PhotoSchema);

//Create Photo
/* Photo.create({
    title:'Photo 2',
    description:'Lorem ipsum2'
}); */

//read photo
async function readPhotos() {
    try { 
        const data = await Photo.find({});
        console.log(data);
    } catch (err) {
        console.log(err); 
    }
};
readPhotos();

//update
const id = '6548077ae1ca47500cedf869';
const update = {title: 'Photo Title 1 Updated',
description: 'Photo Description 1 updated'};

const updatePhoto = async () =>{
    try {
        const updatedPhoto = await Photo.findByIdAndUpdate(id, update,{new:true});
        if (!updatedPhoto) {
            console.log('Fotoğraf bulunamadı');
        } else {
            console.log('Güncellenmiş fotoğraf:', updatedPhoto);
        }
    } catch (error) {
        console.error('Hata:', error);
    }
};
updatePhoto();

//Delete a photo
const deletePhoto = async () => {
    try { 
        const deletedPhoto = await Photo.findByIdAndDelete(id);
        if (!deletedPhoto) {
            console.log('Fotoğraf silinmedi');
        } else {
            console.log('Siliniş Fotoğraf:', deletedPhoto);
        } 
    } catch (error) {
        console.error('Hata:', error);
    } 
};
deletePhoto();