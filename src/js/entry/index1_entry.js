//引入css
require("../../css/components/index1.css");
if (process.env.NODE_ENV !== 'production') {
    require('../../template/index1.html');
}
(function(){
    var tpl = require('../../template/components/template.html');
    var app = document.getElementById('tpl');
    app.innerHTML = tpl;
})();


document.write("welcome to index1");


