const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')

const app = express()

store = []

app.use(bodyParser.json())
app.use(errorhandler())

app.get('/patients', (req, res) => {
    res.status(200).send(store)
})

app.post('/patients', (req, res) => {
    let num = String(req.body.number)
    let id = store.length
    num = '(' + num.substring(0, 3) + ') ' + num.substring(3, 6) + '-' + num.substring(6)
    store = [...store, {first: req.body.first,
                        last: req.body.last,
                        number: num,
                        checked: false,
                        id: id}]
    console.log(store)
    res.sendStatus(201)
})

app.patch('/patients/:id', (req, res) => {
    store[req.params.id].checked = req.body.checked
    console.log(store)
    res.sendStatus(204)
  });

app.delete('/patients', function(req, res) {
    store = []
    res.sendStatus(204)
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`)
})