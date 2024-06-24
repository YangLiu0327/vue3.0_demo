// login & register
const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const bcrypt = require('bcrypt') // encryption
// @route GET api/users/test
// @des return request data
// @access public
router.get('/test', (req, res) =>{
    res.send({msg: 'login works'})
})

// @route POST api/users/register
// @des return request data
// @access public
// router.post()
router.post('/register', (req, res) => {
    // console.log(req.body)
    // check the user' email exist or not 
    User.findOne({ email: req.body.email})
        .then((user) => {
            if(user) {
                return res.status(400).json({ email: 'This email has been existed!'})
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    // avatar,
                    password: req.body.password
                })
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;

                        newUser.password = hash;

                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                })
            }
        })
})

module.exports = router;