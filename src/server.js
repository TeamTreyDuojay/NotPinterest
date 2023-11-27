// const express = require('express');
// const path = require('path');
// // const handleSessions = require('./middleware/handle-sessions');
// const handleCookieSessions = require('./middleware/handle-cookie-sessions');
// const logRoutes = require('./middleware/log-routes');
// const routes = require('./routes');

// const { db } = require('./firebase.js')


// const app = express();

// app.use(handleCookieSessions);
// app.use(logRoutes);
// app.use(express.json());
// app.use(express.static(path.join(__dirname, '..', 'public')));

// app.use('/api', routes);
// app.use('/api/yel',routes)
// // app.get('/',(req,res) => {
// //     res.send('hello')
// //     console.log("g")
// // })

// app.post('/users', async (req, res) => {
//     console.log("hit")
//     const { name, status } = req.body
//     const peopleRef = db.collection('teste').doc('associates ')
//     const res2 = await peopleRef.set({
//         [name]: status
//     }, { merge: true })
//     // friends[name] = status
//     res.status(200).send(friends)
// })

// module.exports = app;
  

const express = require('express');
const path = require('path');
const handleCookieSessions = require('./middleware/handle-cookie-sessions');
const logRoutes = require('./middleware/log-routes');
const routes = require('./routes');
const { db } = require('./firebase.js');
const cors = require('cors');

const app = express();

// Use CORS middleware before other middleware and routes
app.use(cors());

app.use(handleCookieSessions);
app.use(logRoutes);
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', routes);
app.use('/api/yel', routes);

app.post('/users', async (req, res) => {
    console.log("hit");
    const { name, status } = req.body;
    const peopleRef = db.collection('teste').doc('associates');
    await peopleRef.set({
        [name]: status
    }, { merge: true });

    // Send a response indicating success
    res.status(200).json({ message: 'Data updated successfully' });
});

module.exports = app;
