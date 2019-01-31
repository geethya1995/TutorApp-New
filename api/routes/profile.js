const express = require('express');
const router = express.Router();
const con = require('../../databse/db');

router.post('/viewProfile', (req, res) => {
    var email = req.body.email;
    var role = req.body.role;

    if(role==='tutor'){
        var sql = "select FirstName, LastName, Location, Mobile, Subject, Rate, ImgUrl, Price, Available_time from Tutor where email='"+email+"'";
        var sql1 = "select date, content, name, ImgUrl from Review, Student where tutor='"+email+"' and Student.email=Review.student";
        var profile;
        var reviews = [];
    
        con.query(sql, (err, result) => {
            if(err) {
                res.json({
                    profile: null,
                    reviews: null
                }) ;        
            }
            else{
                console.log(result);
                profile = {
                   email: email,
                   firstName: result[0].FirstName,
                   lastName: result[0].LastName,
                   description: result[0].description,
                   location: result[0].Location,
                   mobile: result[0].Mobile,
                   subject: result[0].Subject,
                   rate: result[0].Rate,
                   imgUrl: result[0].ImgUrl,
                   price: result[0].Price,
                   available: result[0].Available_time
               }
    
               con.query(sql1, (err, response) => {
                   if(err){
                       console.log(err);
                   }
                   else{
                       console.log(response);
                       for(var i=response.length-1; i>=0; i--){
                            reviews[i - (response.length - 1)] = {
                               date: response[i].date,
                               tutor: response[i].tutor,
                               student: response[i].name,
                               content: response[i].content, 
                               image: response[i].ImgUrl
                           }
                       } 
                       res.json({
                           profile: profile,
                           reviews: reviews
                       });
                   }
               })
               
            }
        })   

    }
    else if(role==='student'){
        var sql = "select * from Student where email='"+email+"'";

        con.query(sql, (err, result) => {
            if(err){
                console.log(err);
                res.json({
                    profile: null
                });
            }
            else{
                console.log(result);
                var profile = {
                    name: result[0].name,
                    mobile: result[0].mobile,
                    location: result[0].location,
                    image: result[0].ImgUrl,
                    email: email
                }

                res.json({
                    profile: profile
                });
            }
        })
    }
    
});

router.post('/editProfile', (req, res) => {
    var role = req.body.role;
    var email = req.body.email;
    console.log(req);

    if (role === 'tutor') {
        var fname = req.body.user.fname;
        var lname = req.body.user.lname;
        var description = req.body.user.description
        var mobile = req.body.user.mobile;
        var subject = req.body.user.subject;
        var location = req.body.user.location;
        var price = req.body.user.price;
        var available = req.body.user.available;

        var sql = "update Tutor set FirstName='" + fname + "', LastName='" + lname + "', description = '"+description+"', Mobile='" + mobile + "', Subject='" + subject + "', Location='" + location + "', Price='"+price+"', Available_Time = '"+available+"' where email='" + email + "'";

        con.query(sql, function (err, result) {
            if (err) {
                res.status(404).send({
                    success: false
                });
            }
            else {
                //console.log(result);
                res.send({
                    success: true
                });
            }
        });

    }

    if (role === 'student') {
        var name = req.body.name;
        var mobile = req.body.mobile;
        var location = req.body.location;

        var sql = "update Student set name='" + name + "', mobile='" + mobile + "', location='" + location + "' where email='" + email + "'";

        con.query(sql, function (err, result) {
            if (err) {
                res.status(404).send({
                    success: false
                });
            }
            else {
                res.send({
                    success: true
                });
            }
        });
    }
});

module.exports = router;