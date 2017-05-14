var express=require('express');
var app=express();
var handlebars=require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
app.set('port',process.env.PORT ||3000);//设置端口
//主页
app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
	res.render('home');
})

//虚拟饼干数组
var fortunes=['conque your fears or they will conquer you',
				'two',
				'three',
				'four'	
			]
//关于页面
app.get('/about',function(req,res){
	var radomFortune=fortunes[Math.floor(Math.random()*fortunes.length)];
	res.render('about',{fortune:radomFortune});
	console.log('about');

})
//定制404页面
app.use(function(req,res,next){

	res.status(404);
	res.render('404');
});
//定制500页面
app.use(function(err,req,res,next){
	console.error(err.stack);

	res.status(500);
	res.render('500');

});

app.listen(app.get('port'),function(){
	console.log('express started on http://locahost:'+app.get('port')+";press ctrl-c to terminate");
})