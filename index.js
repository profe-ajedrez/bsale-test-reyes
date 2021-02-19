/**
 * index.js
 * 
 * Entry point de la aplicación
 */

'use strict';

const { app, express } = require('./app');
const appSubscribers = require('./subscribers/index');
const productoRouter = require('./routes/productoRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const { getConnection } = require('./models/db');
const config = require('./config/config');


appSubscribers.registerSubscribers(app);

app.use(express.json());
app.use(express.static(`${__dirname}/public`));


app.use( async (req, res, next) => {
  req.requestTime = new Date().toISOString();
  
  next();
});


/* HERE  import routes  */

app.use('/api/v1/productos', productoRouter);
app.use('/api/v1/categories', categoryRouter);

app.listen(app.config.port, () => {
  app.emit('serverRunning');
}).on('error', (err) => {
  console.log(err);
});