
var indexRouter = require('./index');
var usersRouter = require('./users');
var staticRouter = require('./static');

var app = (app)=>{
    app.use('/', indexRouter);
    app.use('/static', staticRouter);
    app.use('/users', usersRouter);

}
module.exports = app;
