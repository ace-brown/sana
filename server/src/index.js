const express = require('express');

const usersRoutes = require('./routes/users-routes')
const reportsRoutes = require('./routes/reports-routes')
const HttpError = require('./models/http-error')

const app = express();
const port = 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Reports routes
app.use('/api/reports', reportsRoutes);

// Users routes
app.use('/api/users', usersRoutes);

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

app.listen(port, function () {
    console.log(`Server is running at http://localhost:${port}`);
});
