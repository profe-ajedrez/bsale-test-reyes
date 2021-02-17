'use strict';

/**
 * registerSuscribers
 * 
 * Encapsula los listeners de eventos emitidos por app
 * 
 * @param {Express} app 
 */
module.exports.registerSubscribers = (app) => {

  if (!app){
    return;
  }
  /* PUT HERE ALL LISTENERS TO app EVENTS */

  app.on('serverRunning', (event) => {
    console.log('Running...');
  });
};