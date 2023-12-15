function authMiddleware(req,res,next)
{

    // console.log(req.headers.secretauth);

    if(req.headers.secretauth!=='secret')
    {
        return res.status(403).json({ 
            msg: "Authorization Failed!"
        });
    }

    next();
}

module.exports=authMiddleware;