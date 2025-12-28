const topicRoutes = require('./routes/topic.routes');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

// Middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars 
app.engine(
  'hbs',
  exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
  })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Ruta de prueba 
app.get('/', (req, res) => {
  res.render('home', { title: 'Learning Topics' });
});

//rutas principales
app.use(topicRoutes);

module.exports = app;
