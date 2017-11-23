const express = require('express'),
    hbs = require('hbs'),
    fs = require('fs');
const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})
app.set('view engine', 'hbs');
// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    let now = new Date().toString(),
        log = `${now}: ${req.method}: ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err) => {
    	if(err){
    		console.log('Unable to append to server.log');
    	}
    })
    next();
});
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: "Welcome to Express"
    })
});

app.get('/project',(req,res) => {
	res.render('project.hbs',{
		pageTitle: 'Project Page'		
	})
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
});

app.listen(port, () => {
    console.log('Server is up on port '+ port)
});