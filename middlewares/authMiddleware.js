const jwt=require('jsonwebtoken')
const auth= async(req,res,next)=>{
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if(!token) return res.status(401).json({msg:"No token availble "});
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
        
    } catch (error) {
        res.status(401).json({ msg: 'Invalid token.' });

        
    }

}
module.exports=auth