const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    const log = `log: ${new Date().toString()}-${req.method}-${req.url}\n`;
    fs.appendFile('server.log', log);
    next();
});
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/about', (req, res) => {
    res.render(`about.hbs`, {
        pageTitle: 'About Page'
    });
})

app.get('/', (req, res) => {
    res.render(`home.hbs`, {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear()
    });
})

app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to handle requets..!!'
    });
})


app.listen(3000, () => {
    console.log('listening port 3000');
})