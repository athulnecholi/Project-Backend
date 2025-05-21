const User=require('../models/User_model')
const auth=require('../middlewares/authMiddleware')
const express=require('express')
const router =express.Router()
router.get('/me',auth,async(req,res)=>{
    const user=await User.findByID(req.user.id).select('-password')
    res.json(user)
})
module.exports=router

