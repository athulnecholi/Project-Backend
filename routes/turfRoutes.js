const express=require('express')
const router=express.Router()
const auth=require('../middlewares/authMiddleware')
const Turf=require('../models/Turf_model')
router.get('/',async(req,res)=>{
    const turfs= await Turf.find()
    res.json(turfs)
})
// Create a turf (only manager or admin)
router.post('/',auth,async(req,res)=>{
    if(req.body.role!='admin'&&req.body.role!='manager'){
        return  res.status(403).json({msg:"Access denied"})
    }
    const turf = new Turf({ ...req.body, managerId: req.user.id });
  await turf.save();
  res.status(201).json(turf);
});

module.exports = router;
