const ShortUniqueId = require('short-unique-id');
const Url=require('../models/url');

const handleGenerateShortUrl=async (req,res)=>
{
    try
    {
        const { url }=req.body;

        const uid = new ShortUniqueId();
        const shortId=uid.rnd();

        await Url.create({
            shortId,
            redirectUrl: url,
            visitHistory: [],
        });

        return res.status(200).json({ shortId });
    }
    catch(error)
    {
        console.error("Error creating shortId",error);
        res.status(500).json({ msg: "Server Error while creating shortId "});
    }   
}

const redirectToUrl=async (req,res)=>
{
    try
    {
        const shortId=req.params.shortId;
        const result=await Url.findOneAndUpdate({ shortId },{
            $push: {
                visitHistory:{ timestamp: new Date() }
            }
        },{new: true});

        // const result=await Url.findOne({shortId});
        const {redirectUrl}=result;
        // console.log(redirectUrl);

        if(!redirectUrl)
        {
            return res.status(404).json({ msg: "URL not found"});
        }

        res.redirect(redirectUrl);
    }
    catch(error)
    {
        console.error("Error redirecting to URL",error);
        res.status(500).json({ msg: "Server error while redirecting"});
    }
}

const getAnalytics=async (req,res)=>
{
    try
    {
        const shortId=req.params.shortId;
        const result=await Url.findOne({shortId});

        const { visitHistory }=result;

        if(!visitHistory)
        {
            return res.status(404).json({msg: "Error fetching analytics from database"});
        }

        return res.json({ totalClicks: result.visitHistory.length, visitHistory: result.visitHistory });
    }
    catch(error)
    {
        console.error("Error fetching analytics",error);
        res.status(500).json({ msg: "Server error when fetching analytics "});
    }    
}

const getAllUrls=async (req,res)=>
{
    const result=await Url.find();

    return res.json(result);
}

module.exports={
    handleGenerateShortUrl,
    redirectToUrl,
    getAnalytics,
    getAllUrls,
}