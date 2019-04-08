const express = require ('express');
const app = express();
const fs = require ('fs');
const bodyParser = require ('body-parser');


// data-type: application/x-www-form-urlencoded
app.use (bodyParser.urlencoded({ extended: false }));

app.get ('/', function (req, res) {
    //get random question
    // res.sendFile (__dirname + "/views/random.html");
    // const questions = JSON.parse(
    //     fs.readFileSync ("./questions.json", { encoding: 'utf-8' })
    // );
    
    // var random = questions.content[Math.floor(Math.random() * questions.content.length)];
    // res.send (random);

});
app.get ('/ask', function (req, res) {
    //
    res.sendFile (__dirname + "/views/ask.html");
});

app.post ("/addquestion", function (req,res){
    // req.on ("data", function (data) {
    //     console.log (data + "");
    // })
    // console.log ("Question!");
    // const question = req.body.question;

    const questions = JSON.parse(
        fs.readFileSync ("./questions.json", { encoding: 'utf-8' })
    );
    const { question } = req.body;
    const newQuestion = {
        content: question,
        yes: 0,
        no: 0,
        id: questions.length,
    }
    questions.push (newQuestion);
    fs.writeFileSync ("./questions.json", JSON.stringify(questions));
    res.send (newQuestion.content);
    // 
   
    // console.log (req.body);
    
})

app.post ("/randomquestion", function(req, res){
    //get random question
    const questions = JSON.parse (fs.readFileSync ("./questions.json", {encoding: 'utf-8'}));
    const i =  Math.floor(Math.random() * questions.length);
    const question = questions[i].content;
    res.send (
        `   
            <p>${question}</p>
            <br>    
            <form action = "/questions" method = "post">
                <button name="option" value="yes">Yes</button>
                <button name="option" value="no">No</button>
                <input type="" name = "index" value="${i}" hidden></input>
            </form>
            
        `
    )
    
})


app.post ("/questions", function (req,res) {
    const questions = JSON.parse (fs.readFileSync ("./questions.json", {encoding: 'utf-8'}));
    const {index} = req.body;
    const {option} = req.body;
    const question = questions[index];
    if (option === "yes") {
        question.yes += 1;
    } else if (option === "no") {
        question.no += 1;
    }
    fs.writeFileSync( "./questions.json",JSON.stringify(questions));
    res.send ("Sucessfully !!!");
})



    






app.listen (6969, function (err) {
    if (err) console.log (err)
    else console.log ('Server start success');
});