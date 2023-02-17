const express = require("express");
const {connection} = require("./db");
const {userRoute} = require("./routes/user.routes");
const {notesRoute} = require("./routes/notes.routes");
const {authenticate} = require("./middlewares/jwt.middleware");
const cors = require("cors");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/user",userRoute);

app.use(authenticate);
app.use("/notes",notesRoute);

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Database Connected");
    } catch (error) {
        console.log(error);
    }
    console.log(`Server running at port ${process.env.port}`);
})