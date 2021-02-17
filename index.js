/**
 * index.js
 * 
 * Entry point
 */

'use strict';

const { app, express } = require('./app');
const appSubscribers = require('./subscribers/index');

appSubscribers.registerSubscribers(app);


app.use(express.json());
app.use(express.static(`${__dirname}/public`));


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});



/* HERE  import routes  */

app.listen(app.config.port, () => {
  app.emit('serverRunning');
});
