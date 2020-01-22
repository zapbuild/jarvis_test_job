const express = require('express');
const http = require('http');
const routes = require('./routes');
//Init Express
const app = express();

// express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true  }))

/**
 * Routes
 */
app.use('/', routes);

/**
 * Event listener for HTTP server "error" event.
 * @param {Object} error json object
 * @returns {void} The sum of klsjdfl
 */
const onError = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
    case 'EACCES':
        //console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
    default:
        throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    console.log(`Application start listing on ${bind}`);
}

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

//Listen on provided port, on all network interfaces.
server.on('error', onError);
server.on('listening', onListening);
server.listen(process.env.PORT || 5000)
