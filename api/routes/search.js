const express = require('express');
const router = express.Router();
const con = require('../../databse/db');

router.post('/search', (req, res) => {
    var district =req.body.district;
    var subject = req.body.subject;

    if(district === "all" && subject=="all"){
        var sql = "select * from Tutor where acc_status='1'";
    }
    else if (subject == "all" && district != "all") {
        var sql = "select * from Tutor where Location like '%" + district + "%' and acc_status='1'";
    }
    else if (district == "all" && subject != "all") {
        var sql = "select * from Tutor where Subject like '%" + subject + "%' and acc_status='1'";
    }
    else if (subject != "all" && district != "all") {
        var sql = "select * from Tutor where (Location like '%" + district + "%' and Subject like '%" + subject + "%' and acc_status='1' )";
    }
    con.query(sql, function(err, result){
        if (err) throw err;
        else{
            var user = [];
            for(var i=0; i<result.length; i++){
                user[i] = {
                    fname: result[i].FirstName,
                    lname: result[i].LastName,
                    email: result[i].email,
                    location: '',
                    subject: '',
                    mobile: '',
                    rate: '',
                    imgUrl: '',
                    price: '',
                    available: ''
            
                }
                if (result[i].Location) {
                    user[i].location = result[i].Location;
                }
                if (result[i].Mobile) {
                    user[i].mobile = result[i].Mobile;
                }
                if (result[i].Subject) {
                    user[i].subject = result[i].Subject;
                }
                if (result[i].Rate) {
                    user[i].rate = result[i].Rate;
                }
                if (result[i].ImgUrl) {
                    user[i].imgUrl = result[i].ImgUrl;
                }
                if (result[i].Price) {
                    user[i].price = result[i].Price;
                }
                if (result[i].Available_time) {
                    user[i].available = result[i].Available_time;
                }
            
            }
            res.send({
                user: user
            });
            //console.log(result);
        }
    });
});

router.post('/searchByName', (req, res) => {
    var name = req.body.name;
    var fname = (name.trim().split(/\s+/))[0];
    var lname = (name.trim().split(/\s+/))[1];
    var sql = "select * from Tutor where FirstName like '%"+fname+"%' or LastName like '%"+lname+"%'";
    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                success: false,
                user: null
            });
        }
        console.log(result);
        var user = [];
        for (var i = 0; i < result.length; i++) {
            user[i] = {
                fname: result[i].FirstName,
                lname: result[i].LastName,
                email: result[i].email,
                location: '',
                subject: '',
                mobile: '',
                rate: '',
                imgUrl: '',
                price: '',
                available: ''

            }
            if (result[i].Location) {
                user[i].location = result[i].Location;
            }
            if (result[i].Mobile) {
                user[i].mobile = result[i].Mobile;
            }
            if (result[i].Subject) {
                user[i].subject = result[i].Subject;
            }
            if (result[i].Rate) {
                user[i].rate = result[i].Rate;
            }
            if (result[i].ImgUrl) {
                user[i].imgUrl = result[i].ImgUrl;
            }
            if (result[i].Price) {
                user[i].price = result[i].Price;
            }
            if (result[i].Available_time) {
                user[i].available = result[i].Available_time;
            }

        }
        res.json({
            success: true,
            user: user
        });
    });
})



module.exports = router;