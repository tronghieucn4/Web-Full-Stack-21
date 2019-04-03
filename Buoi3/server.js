const express = require ('express');
const app = express();

app.set('view engine', 'ejs');

const web13 = require ('./data/web13.json');
const web14 = require ('./data/web14.json');
const web15 = require ('./data/web15.json');
const web16 = require ('./data/web16.json');
const web17 = require ('./data/web17.json');
const web18 = require ('./data/web18.json');
const web19 = require ('./data/web19.json');
const web20 = require ('./data/web20.json');

// https://localhost:6969/public/main.css
// app.use("/", express.static ('html&css'));

app.listen(6969, function(err) {
    if (err) console.log (err);
    else console.log ("Server start success! ");
})

// app.use (function (req, res) {
//     res.send ("404 Not Found !!");
// });

// app.get('/', function (req, res) {
//     // res.send("<h1>..</h1>");
//     res.sendFile(__dirname + "/html&css/index.html");
    
// });

// // app.get ('/main.css', function (req,res) {
// //     res.sendFile(__dirname + "/html&css/main.css");
// // })

// //params
// app.get ('/number/:number', function (req,res) {
//     const number = req.params.number;
//     res.send(number);       
// });

// // 
// //query
// app.get ('/number', function (req,res) {
//     const number = req.query.number;
//     const age = req.query.age;
//     const a = {
//         number: 'number',
//         age: 'age'
//     }      
//     res.send(a);
// });

app.get ('/', function (req, res) {
   res.sendFile (__dirname + "/index.html");
});

app.get ('/web13', function(req,res) {
    res.render ('web13', {
        web13: web13
    })
})
app.get('/web14', function(req, res) {
    res.render('web14', {
        web14: web14
    })
})

app.get('/web15', function(req, res) {
    res.render('web15', {
        web15: web15
    })
})

app.get('/web16', function(req, res) {
    res.render('web16', {
        web16: web16
    })
})

app.get('/web17', function(req, res) {
    res.render('web17', {
        web17: web17
    })
})

app.get('/web18', function(req, res) {
    res.render('web18', {
        web18: web18
    })
})

app.get('/web19', function(req, res) {
    res.render('web19', {
        web19: web19
    })
})

app.get('/web20', function(req, res) {
    res.render('web20', {
        web20: web20
    })
})




