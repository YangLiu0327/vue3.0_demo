// login & register
const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const bcrypt = require('bcrypt') // encryption
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

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
                const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
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

// @route POST api/users/login
// @des return token
// @access public
// router.post()
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email})
        .then(user =>{
            // check user
            if(!user) return res.status(404).json({ email: 'User does not exist!'})
            // check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        const rule = {id: user.id, name: user.name};
                        jwt.sign(rule, 'keys.secretOrKey', {expiresIn: 3600}, (err, token) =>{
                            if(err) throw err;
                            res.json({
                                success: true,
                                token: 'yang' + token
                            })
                        })
                        // res.json({ msg: 'success'})
                    } else {
                        return res.status(400).json({password: 'Wrong Password!'})
                    }
                })
        })
})
module.exports = router;