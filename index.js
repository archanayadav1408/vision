
  
// Require modules
const express = require("express");
var ejs = require('ejs')
var bodyParser = require('body-parser')
var ps = require('python-shell')
const app = express();

const spawn = require("child_process").spawn;
app.set('port', process.env.PORT || 5000)

app.use(require('body-parser').urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	//res.render('form', {answer: "", paragraph: "", question: ""});
	res.render('form');
})

app.post('/predict',function(req, res){
	var mPara = req.body.para;
	var mQues = req.body.ques;
	

    if (!mPara || !mQues) {
        res.status(401).send('missing-fields')
    }

    const process = spawn('python',["./script.py",  mPara,  mQues] );

    let result = '';

    process.stdout.on('data', data => {
        result += data.toString();
    } );

    process.on('close', code => {
console.log(result);
        res.send(result);
    });
})

//Start server
app.listen(app.get('port'), function() {
	console.log('server started.')
})





  
