
var indexRouter = require('./index');
var usersRouter = require('./users');

var app = (app)=>{
    app.use('/', indexRouter);
    app.use('/users', usersRouter);

}
module.exports = app;
