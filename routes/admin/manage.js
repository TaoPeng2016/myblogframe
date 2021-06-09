
var router = require('koa-router')();

var DB = require('../../model/db.js');


router.get('/', async (ctx) => {

    var result = await DB.find('admin', {});

    console.log(result);
    await ctx.render('admin/manage/list', {

        list: result
    });
})


router.get('/add', async (ctx) => {

    await ctx.render('admin/manage/add');

})

router.get('/edit', async (ctx) => {

    ctx.body = "Eidt user info";

})

router.get('/delete', async (ctx) => {

    ctx.body = "Delete user";

})

module.exports = router.routes();