
var Koa = require('koa'),
    router = require('koa-router')(),
    path = require('path'),
    render = require('koa-art-template'),
    static = require('koa-static'),
    session = require('koa-session'),
    bodyParser = require('koa-bodyparser');

//Creating an instance
var app = new Koa();

//Configure middleware for post
app.use(bodyParser());

//Configure session middleware 

app.keys = ['some secret hurr'];
const CONFIG = {
    key: 'koa:sess',
    maxAge: 864000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: true,   /*Reset every request session*/
    renew: false,
};
app.use(session(CONFIG, app));

//Configure  Template 
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});
//Configure Static resources middleware 
app.use(static(__dirname + '/public'));

//Import module
var index = require('./routes/index.js');
var api = require('./routes/api.js');
var admin = require('./routes/admin.js');

router.use('/admin', admin);
router.use('/api', api);
router.use('/', index);

app.use(router.routes());   /*Start routing*/
app.use(router.allowedMethods());
app.listen(3000);









