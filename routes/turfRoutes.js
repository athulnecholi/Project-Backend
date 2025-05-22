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
    if(req.user.role!='admin'&&req.user.role!='manager'){
        return  res.status(403).json({msg:"Access denied"})
    }
    const turf = new Turf({ ...req.body, managerId: req.user.id });
  await turf.save();
  res.status(201).json(turf);
});
router.post('/delete',auth,async (req,res)=>{
    if(req.user.role!='manager' && req.user.role!='admin'){
        res.status(403).json({msg:"Access denied for deletion"})

    }
    try {
        const deleteTurf= await Turf.findByIdAndDelete(req.body.turfId)
        if(!deleteTurf)return res.status(404).json({msg:"No turf Found!!"});
        res.json({ msg: "Turf deleted successfully", deleteTurf });
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
        
    }
    

})

module.exports = router;
