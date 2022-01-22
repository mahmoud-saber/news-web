//npm init -y
//npm i express
//npm i hbs
//npm i request
// npm i nodemon -g
//nodemon src/app.js -e js,hbs


///install express
const express = require('express');
const app = express();
const port = process.env.port || 5000;


/////////////////////////////////////////////////////////////////


///to use hbs
const hbs = require('hbs'); ///install hbs
app.set('view engine', 'hbs');
///////////////////////////////////////////////

// ///to access css & js
const path = require('path');
const publicDirectory = path.join(__dirname, '../public');
app.use(express.static(publicDirectory));

//views
const viewsPath = path.join(__dirname, '../templates/views');
app.set('views', viewsPath);


////partials
const partialsPath = path.join(__dirname,'../templates/partials');
hbs.registerPartials(partialsPath);

///////////////////////////////////////////////////////////////////////////////////


//////////request news
const request = require('request');
const url = 'http://newsapi.org/v2/everything?q=Apple&from=2022-01-13&sortBy=popularity&apiKey=6e22edf3f66c439aae9f7aaf5955ae4f';

app.get('/news', (req, res) => {

    request({url, json: true}, (error, response) => {

        if (error) {
            return 'Error has occurred';
        }
        res.render('news',{
            data:response.body.articles

        }
    //    console.log(response.body.articles);

        );

    });
   


});
app.get('*', (req, res) => {
    res.render('404page', {
        title: '404 Not found',
        name: 'Default page'
    });
});


app.listen(port, () => {
    console.log('Listening on port 5000');
});