
var router = require('koa-router')();
var url = require('url');

//Configure Middleware  Get  url address 
router.use(async (ctx, next) => {
    //console.log(ctx.request.header.host);

    // Template Configure Global Variables
    ctx.state.__HOST__ = 'http://' + ctx.request.header.host;
    //console.log(ctx.request.url);  //   /admin/user

    var pathname = url.parse(ctx.request.url).pathname.substring(1);

    //Selected in the left menu
    var splitUrl = pathname.split('/');
    //Global userinfo
    ctx.state.G = {
        url: splitUrl,
        userinfo: ctx.session.userinfo
    }

    //Judgment of Permissions
    if (ctx.session.userinfo) {
        //Configure global info
        await next();
    } else {  // If have not logined, go to the login page
        if (pathname == 'admin/login' || pathname == 'admin/login/doLogin' || pathname == 'admin/login/code') {
            await next();
        } else {
            ctx.redirect('/admin/login');
        }
    }




})



var login = require('./admin/login.js');
var user = require('./admin/user.js');

var manage = require('./admin/manage.js');


router.get('/', async (ctx) => {
    ctx.render('admin/index');
})

router.use('/login', login);
router.use('/user', user);
router.use('/manage', manage);




module.exports = router.routes();