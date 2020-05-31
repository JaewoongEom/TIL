const express = require("express");
const path = require("path");
const app = express();
const connect = require("./schemas");
const Member = require("./schemas/Member");

connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/input", async (req, res) => {
    const member = new Member({
        email: req.body.email,
        password: req.body.password,
    });

    try{
        const result = await member.save();

        res.json({ msg: `${result._id} | ${result.email} | ${result.password}`});
    } catch(err){
        console.log(err);
    }
});

app.listen(8080, () => {
    console.log("Server ready");
})