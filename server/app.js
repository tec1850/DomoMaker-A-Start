// import libraries
const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const dbURL = process.env.MONGOLAB_URI || 'mongodb://localhost/DomoMaker';

mongoose.connect(dbURL, (err) => {
    if (err) {
        console.log('Could not connect to database');
        throw err;
    }
});

// pull in our routes
const router = require('./router.js');

const app = express();
app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));
app.use(compression());
app.use(bodyParser.urlencoded({
    extended: true,
    limit: 1024 * 1024 * 1024 * 1024,
}));
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));
app.use(cookieParser());

router(app);

app.listen(port, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Listening on port ${port}`);
});
