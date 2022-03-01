const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Ads = require("../models/ad");

const { authenticateToken } = require('../utils/authenticateToken');

router.post("/compose", authenticateToken, async (req, res) => {
    const {user} = req.userid;
    const authorid = user;
    console.log("here");

    console.log(authorid);

    const {
        title,
        content,
    } = req.body;

    console.log(title, content);

    if (!title){
        return res.send({
            success: false,
            message: "Error: Title cannot be empty"
        });
    }

    if (!content){
        return res.send({
            success: false,
            message: "Error: Content cannot be empty"
        })
    }

    const newAd = new Ads();
    

    User.find({
        _id: authorid
    }, async (err, authors) => {
        console.log(authors);
        if(err){
            return res.send({
                success: false,
                message: "Error: Server Error"
            })
        } else if (authors.length != 1) {
            return res.send({
                success: false,
                message: "Error: DB Error"
            })
        }

        const author = authors[0];
        const authorName = `${author.firstName} ${author.lastName}`;
        
        const authorAdNo = author.noOfAds + 1;
        
        newAd.title = title;
        newAd.content = content;
        newAd.author = authorName;
        newAd.authorId = author._id;

        try {
            User.findOneAndUpdate(
            { _id: author._id}, 
            { $set: 
                {
                    noOfAds: authorAdNo
                }
            }, null, (err, InfoBeforeUpdation) => {
                if(err){
                    return res.send({
                        success: false,
                        message: "Error: DB Error"
                    })
                }
            });
        } catch (err) {
            res.send({
                success: false,
                message: "Error: DB Error"
            })
        }
    
        newAd.save((err, response) => {
            if(err){
                console.log("saving server error");
                return res.send({
                    success: false,
                    message: "Error: Server Error"
                });
            }
            console.log(response);
            return res.send({
                success: true,
                message: "Ads saved successfully"
            });
        });
    });
});

router.get("/display/all", async (req, res) => {
    Ads.find({

    }, async (err, ads) => {
        if(err){
            return res.send({
                success: false,
                message: "Error: DB Error"
            });
        }

        return res.send({
            success: true,
            ads: ads 
        });
    });
})

router.get("/display/user=:id", authenticateToken, async(req, res) => {
    console.log("wordking", "params: ", req.params.id);
    const userid = req.params.id;
    Blog.find({
        authorId: userid
    }, async (err, blogs) => {
        if(err){
            return res.send({
                succes: false,
                message: "Error: DB Error"
            });
        }

        return res.send({
            success: true,
            ads: ads
        });
    });
})

router.post("/delete/ad=:adid", authenticateToken, async(req, res) => {
    console.log("working params: ",  "adid: ", req.params.adid);
    const adid = req.params.adid;
    Blog.deleteOne({
        _id: adid
    }, async(err, response) => {
        if(err){
            return res.send({
                success: false,
                message: "Error: DB Error"
            });
        }

        console.log(response);

        return res.send({
            success: true,
            message: "Ad deleted successfully"
        });
    })
});

router.post("/update/ad=:adid", authenticateToken, async(req, res) => {
    console.log("working params: ",  "adid: ", req.params.adid);
    const adid = req.params.adid;

    const {
        title,
        content,
    } = req.body;

    console.log(title, content);

    if (!title){
        return res.send({
            success: false,
            message: "Error: Title cannot be empty"
        });
    }

    if (!content){
        return res.send({
            success: false,
            message: "Error: Content cannot be empty"
        })
    }

    Ads.updateOne({
        _id: adid
    }, {
        $set: {
            title: title,
            content: content
        }
    }, 
    async(err, response) => {
        if(err){
            return res.send({
                success: false,
                message: "Error: DB Error"
            });
        }

        console.log(response);

        return res.send({
            success: true,
            message: "Ad Updated successfully"
        });
    });
});


module.exports = router;
