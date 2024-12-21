const express = require('express');

const usersRoutes = require('./routes/users-routes')
const reportsRoutes = require('./routes/reports-routes')

const app = express();
const port = 5000;

// Middleware to parse JSON requests
app.use(express.json());

app.use('/api/reports', reportsRoutes);

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'An unknown error occurred!' });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
