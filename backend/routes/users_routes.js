const express = require('express');
const { request } = require('http');
const bcrypt = require('bcrypt');
const User = require('../models/Users');

const router = express.Router();//gets the router from express

//register

router.post('/register', async (req, res) => {
   try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt); //it gonna take the password and hash it with this salt

    //create new user
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });

    //save user and send response
       const user = await newUser.save(); //if the user was created succesfully, we save the user
       res.status(200).json(user);//status successfully created an object
   } catch (err) {
       console.log(err);
       res.status(500).json(err);
   }
});


//login

router.post('/login', async (req, res) => {
    try {
     //find user
        const user = await User.findOne({username: req.body.username});
        !user && res.status(400).json("Wrong username or password!");

     //validate password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Wrong username or password!");

     //send response
        res.status(200).json({ _id: user._id, username: user.username });

    } catch (err) { 
        res.status(500).json(err);
    }
 });


 //getting all users
router.get('/users', async (req, res) => {
    // res.send("helloooo");//i just send a message to the server
     try{
         const users = await User.find(); //get all the users here
         res.status(200).json(users); // we send all the users
     } catch(err){
         res.status(500).json( { message: err.message } ); //error on server
     } 
 });

//getting one user
router.get('/:id', async (req, res) => {
    try{
        const user = await User.findOne({ _id: req.body._id });
        !user && res.status(400).json("Wrong id!");
        res.status(200).json({ _id: user._id, username: user.username });
    } catch(err){
        res.status(500).json( { message: err.message } ); //error on server
    } 
    //res.send(req.params.id);
})

/*

//getting one
router.get('/:id', (req, res) => {
    res.send(req.params.id);
})


//updating
router.patch('/', (req, res) => {
    
})
//deleteing
router.delete('/:id', (req, res) => {
    
})
*/

module.exports = router