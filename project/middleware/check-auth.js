const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    //next will get called only if authentication is done
    //otherwise error will take action
    try{
        const token= req.headers.authorization.split(" ")[1];
        console.log(token);  
        const decoded = jwt.verify(token,'secret');
        req.userData=decoded;
        next(); 
    }catch(error){
        return res.status(401).json({
            message:'Auth failed'
        })
    }
    
};