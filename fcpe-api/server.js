// The dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

// Parser middleware for POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// This is where the static assets are
app.use(express.static(path.join(__dirname, '/../dist')));

//recuperation de toutes les routes des fichiers js contenus dans le repertoire router
fs.readdirSync('fcpe-api/router/').forEach(function (file) {
    if (file.substr(-3) == '.js') {
        route = require('./router/' + file);
        //Nom fichier sans nom api.js et mis au pluriel
        let file2 = file.slice(0, -6)
        app.use('/api/' + file2, route);
    }
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

//jba 
port = (process.env.PORT || 5000);
app.set('port', port);
/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Start the server
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

module.exports = app;