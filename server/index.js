const express = require('express');
const mongoose = require('mongoose');

const usersRoutes = require('./src/routes/users-routes')
const reportsRoutes = require('./src/routes/reports-routes')
const costsRoutes = require('./src/routes/costs-routes')
const ideasRoutes = require('./src/routes/ideas-routes')
const HttpError = require('./src/models/http-error')

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to handle CORS (Cross-Origin Resource Sharing)
const allowedOrigins = [
    'https://www.khayamsana.sbs',
    'https://sana-client.vercel.app',
    'http://localhost:3000',
];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); // Preflight response
    }
    next();
});


// Reports routes
app.use('/api/reports', reportsRoutes);

// Costs routes
app.use('/api/costs', costsRoutes);

// Users routes
app.use('/api/users', usersRoutes);

// Ideas routes
app.use('/api/ideas', ideasRoutes);

// Middleware to handle wrong routes 
app.use(function (req, res, next) {
    throw new HttpError('Could not find this route.', 404)
})

// Middleware to handle errors after they have been sent
app.use(function (error, req, res, next) {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'An unknown error occurred!' });
});

// Connect to MongoDB
// Use MONGODB_URI when set (e.g. a local database), otherwise build the Atlas address
const dbUri = process.env.MONGODB_URI ||
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.SUFFIX}.${process.env.AFTER_SUFFIX}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.APP_NAME}`;

mongoose
    .connect(dbUri)
    .then(function () {
        app.listen(port, () => console.log(`Server is running at port ${port}`))
    })
    .catch((err) => { console.log(err) })

