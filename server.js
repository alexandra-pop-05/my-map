const express = require('express');
const mongoose = require('mongoose');
const app = express();//object
const pinRouter = require("./BACKEND/routes/pins_routes")
const userRouter = require('./BACKEND/routes/users_routes')

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://alexandra:ale1234@cluster0.450yeru.mongodb.net/?retryWrites=true&w=majority')
        .then(() => console.log("Connected to database."))
        .catch((error) => {
            console.log("Connection to database failed!");
            console.log(error);
        });

//setting up server to accept json
app.use(express.json());

//setup routes
app.use('/api/pins_routes', pinRouter);
app.use('/api/users_routes', userRouter);



app.listen(3000, () => console.log("Backend server is running...")); //called everytime server starts

