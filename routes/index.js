
var router = require('koa-router')();


var DB = require('../model/db.js');

var url = require('url');


//Configure Middleware  Get  url address 
router.use(async (ctx, next) => {
    var pathname = url.parse(ctx.request.url).pathname;

    //Navigation data
    var navResult = await DB.find('nav', { $or: [{ 'status': 1 }, { 'status': '1' }] }, {}, {

        sortJson: { 'sort': 1 }
    })
    // Template Configure Global Variables
    ctx.state.nav = navResult;
    ctx.state.pathname = pathname;

    await next()
})


router.get('/', async (ctx) => {


    console.time('start');

    //Carousel Figure   
    var focusResult = await DB.find('focus', { $or: [{ 'status': 1 }, { 'status': '1' }] }, {}, {

        sortJson: { 'sort': 1 }
    })

    console.timeEnd('start');

    ctx.render('default/index', {

        focus: focusResult
    });

})
router.get('/news', async (ctx) => {

    ctx.render('/views/default/news');

})

router.get('/service', async (ctx) => {


    //Inquiry

    var serviceList = await DB.find('article', { 'pid': '5ab34b61c1348e1148e9b8c2' });
    console.log(serviceList);
    ctx.render('default/service', {
        serviceList: serviceList
    });



})

router.get('/content/:id', async (ctx) => {

    console.log(ctx.params);

    var id = ctx.params.id;

    var content = await DB.find('article', { '_id': DB.getObjectId(id) });

    console.log(content);

    ctx.render('default/content', {
        list: content[0]

    });
})

router.get('/about', async (ctx) => {

    ctx.render('default/about');

})

router.get('/case', async (ctx) => {


    var pid = ctx.query.pid;

    var page = ctx.query.page || 1;

    var pageSize = 3;


    //Get classes in the Success Case Page
    var cateResult = await DB.find('articlecate', { 'pid': '5ab3209bdf373acae5da097e' });


    if (pid) {
        /*If exist*/
        var articleResult = await DB.find('article', { "pid": pid }, {}, {
            page,
            pageSize
        });
        var articleNum = await DB.count('article', { "pid": pid });

    } else {

        //Loop Classes, get content of every class 
        var subCateArr = [];
        for (var i = 0; i < cateResult.length; i++) {
            subCateArr.push(cateResult[i]._id.toString());
        }
        var articleResult = await DB.find('article', { "pid": { $in: subCateArr } }, {}, {
            page,
            pageSize
        });

        var articleNum = await DB.count('article', { "pid": { $in: subCateArr } });

    }

    ctx.render('default/case', {
        catelist: cateResult,
        articlelist: articleResult,
        pid: pid,
        page: page,
        totalPages: Math.ceil(articleNum / pageSize)
    });

})

router.get('/connect', async (ctx) => {

    ctx.render('default/connect');
})




module.exports = router.routes();