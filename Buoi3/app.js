const fs = require ('fs');

const obj = {
    name : "nguyen trong hieu",
    age : 21
}

const jsonObj = JSON.stringify(obj);
 console.log (jsonObj + "");

// 
// console.log ("Hello World");

// console.log("Begin");

// require('fs').writeFile("text.txt" , "QA" , function (error)  {
//     if (error) {
//         console.log (error);
//     } else {
//         console.log ("Write File Done !");
//     }
    
// });

// console.log ("End");
// */

// /*
// console.log ("Begin");
// require ('fs').readFile("text.txt" , {encoding: 'utf8'} ,function (error, data) {
//     if (error) console.log(error);
//     else console.log (data);
// });
// console.log ("End");
// 


console.log ("Begin");
const data = fs.readFileSync("text.txt" , { encoding: 'utf-8'});
try {
    console.log (JSON.parse(data).name);
} catch (error) {
    console.log (error);
}


console.log ("End");

// fs.writeFile (
//     "text.txt", 
//     jsonObj,
//     function (error) {
//         if (error) console.log (error);
//         else  console.log ("Write file done!");
//     }
// );



