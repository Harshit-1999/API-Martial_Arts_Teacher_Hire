const express=require('express');
const Ninja = require('../models/ninja');


const router = express.Router();



router.get("/nin",(req,res,next)=>{

        
        Ninja.aggregate([{
            $geoNear:{
        near:
        {type:'point',coordinates:[parseFloat(req.query.lng),parseFloat(req.query.lat)]},
        spherical: true ,maxdistance :100000,distanceField: "dist.calulated"}
        }]).then(function(ninjas){
        res.send(ninjas)
        })
    
       

});


router.post("/nin",(req,res,next)=>{
   
    Ninja.create(req.body).then((ninja)=>{
        res.send(ninja);
    }).catch(next);
    
});


router.put("/nin/:id",(req,res,next)=>{
    Ninja.findByIdAndUpdate({_id:req.params.id},req.body).then(()=>{
       Ninja.findOne({_id:req.params.id}).then((ninja)=>{
           res.send(ninja);
       });  
    });
});




router.delete("/nin/:id",(req,res,next)=>{
   
    res.send({type:"delete"});
});

module.exports = router;