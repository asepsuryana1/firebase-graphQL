var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var firebase = require('firebase');

var config = {
    apiKey: 'AIzaSyDXcG2PN2nO1xcLcxW8gtHbomzNP95E7Nc',
    authDomain: 'nuuby-co.firebaseio.com',
    databaseURL: 'https://nuuby-co.firebaseio.com',
    projectId: 'nuuby-co',
    storageBucket: 'nuuby-co.app.spot.com',
    messagingSenderId: '850383414810'
  };

  firebase.initializeApp(config)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
