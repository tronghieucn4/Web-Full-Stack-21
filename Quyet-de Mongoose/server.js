const express = require('express');
const app = express();
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 

const QuestionModel = require("./models/questionModel");

//data-type form gui len: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
mongoose.connect("mongodb://localhost/quyet-de-21", {useNewUrlParser: true}, function(err) {
    if(err) console.log(err);
    else console.log("DB connected ok!");

    QuestionModel.find({}, function(err, docs) {
        if(err) console.log(err);
        else console.log("Question: ", docs);
    })

})

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/views/home.html");
});

app.get('/ask', function(req, res) {
    res.sendFile(__dirname + "/views/ask.html");
});

app.get("/question/:id", (req, res) => {
    res.sendFile(__dirname + "/views/vote.html");
})


app.get("/randomquestion", (req, res) => {
    // const questionList = JSON.parse(fs.readFileSync("./questions.json", {encoding: "utf-8"}));
    // const randomIndex = Math.floor(Math.random()*questionList.length);
    // const question = questionList[randomIndex];

    // res.send(questions);

    // QuestionModel.find({}, function(err, docs) {
    //     if(err) console.log(err);
    //     else {
    //         const randomIndex = Math.floor(Math.random()*docs.length);
    //         res.send(docs[randomIndex]);
    //     }
    // })

    QuestionModel.count({}, function(err, totalDoc) {
        if(err) console.log(err);
        else {
            const randomIndex = Math.floor(Math.random()*totalDoc);
            QuestionModel.findOne({}).skip(randomIndex).exec((err, question) => { 
                if(err) console.log(err);
                else res.json(question);
            })
        }
    })
})

app.get("/vote/:questionId/:vote", (req, res) => {
    // const questionId = req.params.questionId
    // const { questionId, vote } = req.params;
    // const questionList = JSON.parse(
    //     fs.readFileSync("./questions.json", {encoding: "utf-8"})
    // );
    
    // // for(let i = 0; i < questionList.length; i++) {
    // //     if(questionList[i].id == questionId) {
    // //         if(vote == "yes") {
    // //             questionList[i].yes++;
    // //         } else {questionList[i].no++};
    // //     }
    // // }

    // questionList[questionId][vote]++;

    // fs.writeFileSync("./questions.json", JSON.stringify(questionList));

    const { questionId, vote } = req.params;
    if (vote == "yes" ) {
        QuestionModel.findById (questionId, function (err, docs) {
            if (err) console.log (err);
            else {
                var yes = docs.yes + 1;
                docs.save(function(err) {
                    if (err) console.log (err)
                    else {
                        QuestionModel.update({_id: questionId}, {$set: {yes: yes}}, function (err, res) {
                            if (err) console.log (err)
                            else {
                                console.log ("Update Yes Success");
                            }
                        })
                    }
                })
            }
        })
    } else if (vote == "no") {
        QuestionModel.findById (questionId, function (err, docs) {
            if (err) console.log (err);
            else {
                var no = docs.no + 1;
                docs.save(function(err) {
                    if (err) console.log (err)
                    else {
                        QuestionModel.update({_id: questionId}, {$set: {no: no}}, function (err, res) {
                            if (err) console.log (err)
                            else {
                                console.log ("Update No Success");
                            }
                        })
                    }
                })
            }
        })
    }
    
    res.redirect("/");
})


app.get("/getinfo/:id", (req, res) => {
    //Lay thong tin cau hoi
    // const questionList = JSON.parse(fs.readFileSync("./questions.json", {encoding: "utf-8"}));
    // const {questionId} = req.params;
    // const question = questionList[questionId];
    // res.send(question);

    const { id } = req.params;
    QuestionModel.findById(id, function(err, docs) {
        if(err) console.log(err);
        else {
            res.send(docs);
        }
    })
} )

app.post('/addquestion', function(req,res) {

    // const questions = JSON.parse(fs.readFileSync("./questions.json", {encoding: "utf-8"}));
    // const { question } = req.body;
    // const newQuestion = {
    //     content: question,
    //     yes: 0,
    //     no: 0,
    //     id: questions.length,
    // }
    // questions.push(newQuestion);
    // fs.writeFileSync("./questions.json", JSON.stringify(questions));
    // res.send(newQuestion.content);
    
    const { question } = req.body;

    QuestionModel.create({
        content: question    
    }, function(err, docCreated) {
        if(err) console.log(err)
        else res.redirect('/');
    })

})


app.listen(6969, function(err) {
    if(err) console.log(err);
    else console.log("Server start success!");
});