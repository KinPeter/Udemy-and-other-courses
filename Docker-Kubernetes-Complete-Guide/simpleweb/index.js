const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hi from a Docker container!');
});

app.listen(8080, () => {
    console.log('[simpleweb] Listening on port 8080...');
});