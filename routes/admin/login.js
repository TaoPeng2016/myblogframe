
const router = require('koa-router')();

const tools = require('../../model/tools.js');

const DB = require('../../model/db.js');

//Captcha Module
var svgCaptcha = require('svg-captcha');


router.get('/', async (ctx) => {
    await ctx.render('admin/login');
})

//post
router.post('/doLogin', async (ctx) => {

    console.log(ctx.request.body);  //{ username: 'admin', password: '123456' }

    // Go to the database to match

    let username = ctx.request.body.username;

    let password = ctx.request.body.password;

    let code = ctx.request.body.code;



    //1,Verificate User Name password

    //2,If match, keep user informatiom in session. 

    if (code.toLocaleLowerCase() == ctx.session.code.toLocaleLowerCase()) {

        // Validate Verification Code, User Name, password.



        var result = await DB.find('admin', { "username": username, "password": tools.md5(password) });

        if (result.length > 0) {


            console.log(result);

            ctx.session.userinfo = result[0];

            ctx.redirect(ctx.state.__HOST__ + '/admin');
        } else {

            ctx.render('admin/error', {
                message: 'Wrong User Name or password',
                redirect: ctx.state.__HOST__ + '/admin/login'
            })

        }
    } else {
        ctx.render('admin/error', {
            message: 'Verification Code is not match',
            redirect: ctx.state.__HOST__ + '/admin/login'
        })
    }

})

/*Verification Code */
router.get('/code', async (ctx) => {
    ctx.body = 'Verification Code ';


    // Verification Code 
    var captcha = svgCaptcha.createMathExpr({
        size: 4,
        fontSize: 50,
        width: 100,
        height: 40,
        background: "#cc9966"
    });

    var captcha = svgCaptcha.create({
        size: 4,
        fontSize: 50,
        width: 120,
        height: 34,
        background: "#cc9966"
    });

    //Keep the verification Code 
    ctx.session.code = captcha.text;
    //Set Response header
    ctx.response.type = 'image/svg+xml';
    ctx.body = captcha.data;
})

router.get('/loginOut', async (ctx) => {
    ctx.session.userinfo = null;
    ctx.redirect(ctx.state.__HOST__ + '/admin/login');
})




module.exports = router.routes();