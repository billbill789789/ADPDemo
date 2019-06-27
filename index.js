var cors = require('cors')
var express = require('express');
const request = require('request');
var app = express();
app.use(cors());

app.get('/', function(req, res) {
    request('https://interview.adpeai.com/api/v1/get-task', { json: true }, (err, res1, body) => {
        var result= calculate(res1.body.operation,res1.body.left,res1.body.right);
        //post(res1.body.id,result);
        request.post('https://interview.adpeai.com/api/v1/submit-task', {
            json: {
                id: res1.body.id,
                result: result
            }
        }, (error, res2, body) => {
            if (error) {
                console.error(error)
                return
            }
            res.send(`<b>left: </b>`+res1.body.left+`<br><b>right: </b>`+res1.body.right+`<br><b>operation: </b>`+res1.body.operation+`<br><b>result: </b>`+result+`<br><b>status:</b>`+res2.statusCode+`<br><b>message: </b>`+res2.body);
            console.log(`statusCode: ${res.statusCode}`)
        })
    });
});

function calculate(operation,left,right){
    if(operation=='addition'){
        return left+right;
    }
    else if(operation=="subtraction"){
        return left-right;
    }
    else if(operation=="remainder"){
        let result= left%right;
        return result;
    }
    else if(operation=="multiplication"){
        let result = left*right;
        return result;
    }
    else if(operation=="division"){
        let result = left/right;
        return result;
    }
}

app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
})