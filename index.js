const mongoose = require('mongoose');

const Dishes = require('./models/dishes');
const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url, { useNewUrlParser: true });

connect.then((db)=>{
   console.log('Connected correctly to serer');

    Dishes.create({
       name: 'Uthapizza',
       description: 'test'
   })
   .then((dish)=>{
        console.log(dish);
        return Dishes.findByIdAndUpdate(dish._id,{
            $set:{description: 'updated test'}
        },
            {
                new: true
        }).exec()
   })
   .then((dish)=>{
         console.log(dish);
         dish.comments.push({
           rating: 5,
           comment: 'i\'m getting a sick feeling',
           author: 'Leonardo di carpio'
         });
        return dish.save();
    })
    .then(()=>{
            return Dishes.remove();
    })
    .then(()=>{
       return mongoose.connection.close();
    })
     .catch((err)=>{
         console.log(err);
    });
});