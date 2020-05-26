const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')
const path = require('path');

const app = express()

store = []

app.use(bodyParser.json())
app.use(errorhandler())

if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));
}

app.get('/patients', (req, res) => {
    console.log("GET")
    console.log(store)
    res.status(200).send(store)
})

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

app.post('/patients', (req, res) => {
    console.log("POST")
    let num = String(req.body.number)
    let id = store.length
    let date = new Date();
    let time = formatAMPM(date)
    
    num = '(' + num.substring(0, 3) + ') ' + num.substring(3, 6) + '-' + num.substring(6)
    store = [...store, {first: req.body.first,
                        last: req.body.last,
                        number: num,
                        checked: false,
                        id: id,
                        time: time}]
    console.log(store)
    res.sendStatus(201)
})

app.patch('/patients/:id', (req, res) => {
    console.log("PATCH")
    store[req.params.id].checked = req.body.checked
    console.log(store)
    res.sendStatus(204)
});

app.delete('/patients', function(req, res) {
    console.log("DELETE")
    store = []
    res.sendStatus(204)
});

app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`)
})