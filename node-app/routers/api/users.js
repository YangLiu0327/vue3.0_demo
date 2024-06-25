// login & register
const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt') // encryption
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// @route POST api/users/register
// @des return request data
// @access public
router.post('/register', (req, res) => {
    // console.log(req.body)
    // check the user' email exist or not 
    User.findOne({ email: req.body.email})
        .then((user) => {
            if(user) {
                return res.status(400).json('This email has been existed!')
            } else {
                const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                    identity: req.body.identity
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
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email})
        .then(user =>{
            // check user
            if(!user) return res.status(404).json('User does not exist!')
            // check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        const rule = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar,
                            identity: user.identity
                        };
                        jwt.sign(rule, keys.secretOrKey, {expiresIn: 3600}, (err, token) =>{
                            if(err) throw err;
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        })
                        // res.json({ msg: 'success'})
                    } else {
                        return res.status(400).json('Wrong Password!')
                    }
                })
        })
})

// @route GET api/users/current
// @des return current user
// @access private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    });
})

module.exports = router;