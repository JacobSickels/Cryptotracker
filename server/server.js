const path = require('path');

const express = require('express');
const app = express();

//getting port from heroku, if not we use 300 on local
const port = process.env.PORT || 3000;

//telling express what folder to serve
const publicPath = path.join(__dirname, '..', 'public')
app.use(express.static(publicPath));

//serving index.html for all 404 so that router still works
app.get('*', (request, response) => {
    response.sendFile(path.join(publicPath, 'index.html'));
});

//telling express to listen on a port (on Heroku so needs to be dynamic)
app.listen(port, () => {
    console.log('Server is up!');
});

