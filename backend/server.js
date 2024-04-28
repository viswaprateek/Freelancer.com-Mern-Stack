const exp = require('express');
const app = exp();
require('dotenv').config(); // process.env.PORT
const mongoClient = require('mongodb').MongoClient;
const path = require('path');

const cors = require('cors');

// Allow requests from Vite development server
const corsOptions = {
  origin: 'http://localhost:5173', // Vite development server URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(exp.json());

// Connect to DB
mongoClient.connect(process.env.DB_URL)
  .then(client => {
    const freelancers = client.db('freelancers');
    const userscollection = freelancers.collection('userscollections');
    app.set('userscollection', userscollection);

    const jobscollection = freelancers.collection('jobscollections');
    app.set('jobscollection', jobscollection);


    console.log("DB connection success");
  })
  .catch(err => console.log("Err in DB connection", err));

// Import API routes
const userApp = require('./APIs/user-api');
const job = require('./APIs/job');

app.use('/user-api', userApp);
app.use('/job', job);

app.get('/', (req, res) => {
  res.send('Hello from your Backend!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.send({ message: "error", payload: err.message });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Web server on port ${port}`));
