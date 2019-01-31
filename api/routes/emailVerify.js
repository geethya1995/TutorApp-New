const express = require('express');
const router = express.Router();
const con = require('../../databse/db');
const randomstring = require('randomstring');

router.post('/verify', (req, res) => {
    var token = req.body.token;
    var role = req.body.role;
    var email = req.body.email;
    console.log(randomstring.generate(20));
    if(role=='tutor'){
        var sql = "select token from Tutor where email='"+email+"'";
    }
    else if(role=='student'){
        var sql = "select token from Student where email='"+email+"'";
    }

    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                success: false
            });
        }
        console.log(result);
    })
    
})

module.exports = router;