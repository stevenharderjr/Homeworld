const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const mongo = require('../database/mongo.js');
const app = express();
const port = 1128;

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.text({ type: 'text/html' }));

app.get('/', (req, res, next) => {
  console.log('GET request acknowledged (server/index.js)');
  res.end();
  next();
});

app.get('/household', (req, res) => {
  mongo
    .loadAll()
    .then((data) => {
      console.log('Server received data from DB:', data);
      res.json(data);
    })
    .catch((err) => {
      console.log('Server-side error');
    })
    .then(() => {
      // console.log('End of server response');
      res.end();
    });
});

app.get('/tasks', (req, res) => {
  return mongo
    .readTasks()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log('Server-side error');
    })
    .then(() => {
      res.end();
    });
});

app.post('/tasks', (req, res) => {
  console.log('Client attempting to create a task record:', req.body);
  console.log(req.body);
  return mongo
    .saveTask(req.body)
    .then((insertId) => {
      res.send(insertId);
    })
    .catch((err) => {
      console.log('Server unable to process /tasks POST request');
    })
    .then(() => {
      res.end();
    });
});

app.post('/members', (req, res) => {
  console.log('Client attempting to create a member record:', req.body);
  return mongo
    .addMember(req.body)
    .then((insertId) => {
      console.log('Member record created:', insertId);
      res.send(insertId);
    })
    .catch((err) => {
      console.log(`Server unable to process /members POST request:`, err);
      res.sendStatus(500);
    })
    .then(() => {
      res.end();
    });
});

app.put('/members', (req, res) => {
  console.log('Client attempting to update a member record:', req.body);
  return mongo
    .updateMember(req.body)
    .then((oldRecord) => {
      console.log('Record updated:', oldRecord);
      res.json(oldRecord);
    })
    .catch((err) => {
      console.log(`Undable to update ${member.name}'s record:`, err);
      res.sendStatus(500);
    })
    .then(() => {
      res.end();
    });
});

app.post('/login', (req, res) => {
  console.log(`Login attempt:`, req.body);
  const user = req.body;
  // auth.authenticate(user)
  res.end();
});

app.post('/register', (req, res) => {
  console.log(`Household registration attempt:`, req.body);
  res.end();
});

app.post('/session', (req, res) => {
  console.log('Session authentication attempt:', req.body);
});

// app.get('*', (req, res) => {
//   res.send(`
//     <!DOCTYPE html>
//     <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Streamfinder</title>
//         <link rel="stylesheet" href="http://localhost:8080/styles/bundle.css">
//         <link rel="icon" href="data:,">
//       </head>
//       <body>
//         <div id="Streamfinder"></div>
//         <script src="http://localhost:8080/scripts/bundle.js"></script>
//       </body>
//     </html>
//   `);
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
