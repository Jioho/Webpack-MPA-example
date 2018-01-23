module.exports = function (app) {
    app.use('/', require('./page1_route'));
    app.use('/page2', require('./page2_route'));
};