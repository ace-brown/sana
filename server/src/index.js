const express = require('express');
const mongoose = require('mongoose');

const usersRoutes = require('./routes/users-routes')
const reportsRoutes = require('./routes/reports-routes')
const costsRoutes = require('./routes/costs-routes')
const ideasRoutes = require('./routes/ideas-routes')
const downloadRoutes = require('./routes/download-routes')
const HttpError = require('./models/http-error')

const app = express();
const port = 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to handle CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
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

// Download Routes
app.use('/api/download', downloadRoutes);

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
mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@sana.olzio.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Sana`)
    .then(function () {
        app.listen(port, () => console.log(`Server is running at port ${port}`))
    })
    .catch((err) => { console.log(err) })

