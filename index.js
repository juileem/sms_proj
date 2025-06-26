const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ss", (req, res) => {
    const url = process.env.MONGO_URL;
    const con = new MongoClient(url);
    const db = con.db("sms_26june25");
    const coll = db.collection("student");
    const doc = {"_id":req.body.rno, "name":req.body.name, "marks":req.body.marks };
    coll.insertOne(doc)
    .then( response =>{
        res.send(response);
    })
    .catch(error =>{
        res.send(error);
    });
});

app.get("/gs", (req, res) => {
    const url = process.env.MONGO_URL;
    const con = new MongoClient(url);
    const db = con.db("sms_26june25");
    const coll = db.collection("student");
    coll.find().toArray()
    .then( response => {
        res.send(response);
    })
    .catch(error => {
        console.log("issue " + error);
    });
});

app.delete("/ds", (req, res) => {
    const url = process.env.MONGO_URL;
    const con = new MongoClient(url);
    const db = con.db("sms_26june25");
    const coll = db.collection("student");
    const doc = {"_id":req.body.rno};
    coll.deleteOne(doc)
    .then( response => {
        res.send(response);
    })
    .catch(error => {
        res.send(error);
    });
});

app.put("/us", (req, res) => {
    const url = process.env.MONGO_URL;
    const con = new MongoClient(url);
    const db = con.db("sms_26june25");
    const coll = db.collection("student");
    const filter = {"_id":req.body.rno};
    const doc = {$set: { "name":req.body.name, "marks":req.body.marks } };
    coll.updateOne(filter, doc)
    .then( response => {
        res.send(response);
    })
    .catch(error => {
        res.send(error);
    });
});


app.listen( 9000, () => { console.log("ready @ 9000"); } );

