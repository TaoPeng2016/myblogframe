
var router = require('koa-router')();


router.get('/', async (ctx) => {

    await ctx.render('admin/user/list');
})


router.get('/add', async (ctx) => {

    await ctx.render('admin/user/add');

})

router.get('/edit', async (ctx) => {

    ctx.body = "Eidt user info";

})

router.get('/delete', async (ctx) => {

    ctx.body = "Delete user";

})

module.exports = router.routes();