const express = require('express');
const router = express.Router();

const con = require('../../databse/db');

router.post('/addAchievement', (req, res) => {
    var tutor = req.body.tutor;
    var title = req.body.title;
    var description = req.body.description;
    var name = req.body.name;
    var ImgUrl = req.bodyImgUrl;

    var sql = "insert into Achievements(tutor, title, description, name, ImgUrl) values('"+tutor+"', '"+title+"', '"+description+"', '"+name+"', '"+ImgUrl+"')";
    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                success: false,
                achievements: null
            });
        }
        else{
            console.log(result);
            var sql1 = "select * from Achievements where tutor='"+tutor+"'";
            con.query(sql1, (err, response) => {
                if(err){
                    console.log(err);
                    res.json({
                        success: false,
                        achievements: null
                    })
                }
                else{
                    console.log(response);
                    var achievements = [];
                    for(var i=0; i<response.length; i++){
                        achievements[i] = {
                            id: response[i].achievementID,
                            title: response[i].title,
                            name: response[i].name,
                            ImgUrl: response[i].ImgUrl,
                            description: response[i].description
                        }
                    }
                    res.json({
                        success: true,
                        achievements: achievements
                    });
                }
            })
            
        }
    })
});

router.get('/getAchievements', (req, res) => {
    var tutor = req.body.tutor;

    var sql = "select * from Achievements where tutor='"+tutor+"'";
    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                success: false,
                achievements: null
            });
        }
        else{
            var achievements = [];
            for(var i=0; i<result.length; i++){
                achievements[i] = {
                    id: result[i].achievementID,
                    title: result[i].title,
                    name: result[i].name,
                    ImgUrl: result[i].ImgUrl,
                    description: result[i].description
                }
            }
            console.log(result);
            res.json({
                success: true,
                achievements: achievements
            });
        }
    })
});

router.delete('/deleteAchievement', (req, res) => {
    var id = req.body.id;
    var tutor = req.body.tutor;

    var sql = "delete from Achievements where achievementID='"+id+"'";
    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                success: false,
                achievements: null
            });
        }
        else{
            console.log(result);
            var sql1 = "select * from Achievements where tutor='" + tutor + "'";
            con.query(sql1, (err, response) => {
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        achievements: null
                    })
                }
                else {
                    console.log(response);
                    var achievements = [];
                    for (var i = 0; i < response.length; i++) {
                        achievements[i] = {
                            id: response[i].achievementID,
                            title: response[i].title,
                            name: response[i].name,
                            ImgUrl: response[i].ImgUrl,
                            description: response[i].description
                        }
                    }
                    res.json({
                        success: true,
                        achievements: achievements
                    });
                }
            })
        }
    })
})

module.exports = router;