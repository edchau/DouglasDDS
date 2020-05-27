const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')
const path = require('path');
// const mongodb = require('mongodb')

const app = express()

store = []

app.use(bodyParser.json())

// const url = 'mongodb://localhost:27017/patients'
// const dbName = 'patients'


// mongodb.MongoClient.connect(url, {useUnifiedTopology: true}, (error, client) => {
    // if (error) return process.exit(1)

if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));
}

    // const db = client.db(dbName)
    
    // app.get('/patients', (req, res) => {
    //     console.log("GET")
	// 	db.collection('patients')
	// 		.find({})
	// 		.toArray((error, patients) => {
	// 			if (error) return next(patients)
    //     		res.send(patients)
    //         })
    
    // })
    
    // app.post('/patients', (req, res) => {
    //     console.log("POST")
    //     let num = String(req.body.number)
    //     let date = new Date();
    //     let UTC = new Date(date.toUTCString())
    //     UTC.setHours(UTC.getHours()-7)
    //     let time = formatAMPM(UTC)
        
    //     num = '(' + num.substring(0, 3) + ') ' + num.substring(3, 6) + '-' + num.substring(6)
    //     let newPatient = {first: req.body.first,
    //                     last: req.body.last,
    //                     number: num,
    //                     checked: false,
    //                     time: time}
    //     console.log(newPatient)
    //     db.collection('patients')
    //     .insertOne(newPatient, (error, results) => {
    //         if (error) return next(error)
    //         res.send(results)
    //     })
    // })
    
    // app.patch('/patients/:id', (req, res) => {
    //     console.log("PATCH")
	// 	db.collection('patients')
	// 		.updateOne({_id: mongodb.ObjectID(req.params.id)}, {$set: req.body}, (error, results) => {
	// 			if (error) return next(error)
	// 			res.send(results)
	// 	})  
	// })

	// app.delete('/patients', (req, res) => {
    //     console.log("DELETE")
	// 	db.collection('patients')
	// 		.deleteMany({}, (error, results) => {
	// 			if (error) return next(error)
	// 			res.send(results)
	// 	})
	// })

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

app.get('/patients', (req, res) => {
    console.log("GET")
    console.log(store)
    res.status(200).send(store)
})

app.post('/patients', (req, res) => {
    console.log("POST")
    let num = String(req.body.number)
    let id = store.length
    let date = new Date();
    let UTC = new Date(date.toUTCString())
    UTC.setHours(UTC.getHours()-7)
    let time = formatAMPM(UTC)
    
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

app.use(errorhandler())

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
console.log(`Listening to port ${PORT}`)
})
// })