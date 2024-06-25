// login & register
const express = require("express");
const router = express.Router();
const passport = require("passport");
const profile = require("../../models/Profile");
const Profile = require( "../../models/Profile" );

// @route GET api/profiles/test
// @desc  return request json data
// @access Public
router.get("/test", (req, res) => {
  res.send("hi my profile");
});

// @route POST api/profiles/add
// @desc  create data
// @access Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;

    new Profile(profileFields).save().then((profile) => {
      res.json(profile);
    });
  }
);

// @route GET api/profiles
// @desc  get data
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.find()
      .then((profile) => {
        if (!profile) {
          return res.status(404).json("No content");
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route GET api/profile/:id
// @desc  get data
// @access Private
router.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      Profile.findOne({ _id: req.params.id })
        .then((profile) => {
          if (!profile) {
            return res.status(404).json("No content");
          }
          res.json(profile);
        })
        .catch((err) => res.status(404).json(err));
    }
  );


// @route POST api/profile/:id
// @desc  edit data
// @access Private
router.post(
    "/edit/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const profileFields = {};
      if (req.body.type) profileFields.type = req.body.type;
      if (req.body.describe) profileFields.describe = req.body.describe;
      if (req.body.income) profileFields.income = req.body.income;
      if (req.body.expend) profileFields.expend = req.body.expend;
      if (req.body.cash) profileFields.cash = req.body.cash;
      if (req.body.remark) profileFields.remark = req.body.remark;
  
      Profile.findOneAndUpdate(
        { _id: req.params.id },
        { $set: profileFields },
        { new: true }
      ).then((profile) => res.json(profile));
    }
  );


// @route DELETE api/profile/delete/:id
// @desc  delete data
// @access Private
router.delete(
    '/delete/:id',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOneAndDelete({_id: req.params.id})
        .then(profile => {
            if(!profile) return res.status(404).json('Profile not found');
            res.json({success: true, message: 'Profile deleted successfully'})
        })
        .catch(err => res.status(404).json(err, 'delete failed'))
    }
  );


module.exports = router;
