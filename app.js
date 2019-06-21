var express=require('express')
var path=require('path')
var fetch=require('node-fetch')
var session=require('express-session')
var userRegister=require('./models/db-mongoose')

var app=express()
app.use(express.static("public"))
app.set('view engine','hbs')
app.use(session({
    secret: 'hello',
    resave: true,
    saveUninitialized: true
}))

var auth = function(req, res, next) {
    userSession = req.session;

    if (req.session.userName){
    
        return next();
        
    }
     
    else
      return res.sendStatus(401);
  }

  function callpy(a,b){

    var spawn = require('child_process').spawn;
    var process = spawn('python', ['./python/api_server.py',a,b])  
}

  var userSession
  var Name
  var message1
  var sessEmail
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/index.html'))
})

app.get('/userSignup',(req,res)=>{
    var uname1 = req.query.first_name;
    var uname2 = req.query.last_name;
    var uemail = req.query.email;
    var pass=req.query.password;

    user=new userRegister({
        name:uname1+" "+uname2,
        email:uemail,
        password:pass
    })
    user.save()
    res.render('signin',{
        message:" "
     })
})

app.get('/login',(req,res)=>{
    res.render('signin',{
        message:" "
     })
})

app.get('/userlogin',(req,res)=>{

    userSession=req.session
    var lname = req.query.email;
    var lpass= req.query.password;

    userRegister.find({email:lname,password:lpass},(err,user)=>{
        if(err)
        {
            throw err
        }
        console.log(user)
        if(user.length==0)
        {
            res.render('signin',{
                message:"Invalid email or password "
            })
        }
        else{
            Name=user[0].name
            sessEmail=user[0].email
            message1=user[0].name
            console.log("message1: "+message1)
            req.session.userName=Name
            res.render('dashboard',{
                message:message1
            })
        }
    })
})

app.get('/dashboard',auth,(req,res)=>{
    res.render('dashboard',{
        message:Name
    })
})

app.get('/profile',auth,(req,res)=>{
    res.render('profile',{
        Name,
        sessEmail
    })
})

app.get('/search',auth,(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/search.html'))

})

app.get('/members',auth,(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/members.html'))
    
})

app.get('/lead',auth,(req,res)=>{
    res.render('leaderboard')
})

app.get('/display',(req,res)=>{

    callpy(req.query.token,req.query.org)
    fetch('https://cc-leaderboard.herokuapp.com/leaderboard').then((resp)=>{
        return resp.json()
    }).then(function(myJson) {
        var disp=JSON.stringify(myJson)
        var obj=JSON.parse(disp)
        var temp=obj.payload
        var arr1=Object.keys(temp)
        var arr2=Object.values(temp)
        var newarr=[]
        var i
        for(i=0;i<arr1.length;i++)
        {
            var obj1={name:arr1[i],score:arr2[i],index:i+1}
            newarr.push(obj1)
        }
        res.render('leaderboard',{
            data:newarr,
        })
        })
})

app.get('/tc',auth,(req,res)=>{
    res.render('topcon')
})

app.get('/topcon',(req,res)=>{

    callpy(req.query.token,req.query.org)
    fetch('https://cc-leaderboard.herokuapp.com/topcontributors').then((resp)=>{
        return resp.json()
    }).then(function(myJson) {
        var disp=JSON.stringify(myJson)
        var obj=JSON.parse(disp)
        var temp=obj.payload
        var arr1=Object.keys(temp)
        var arr2=Object.values(temp)
        var newarr=[]
        var i
        for(i=0;i<arr1.length;i++)
        {
            var obj1={name:arr2[i],repo:arr1[i],index:i+1}
            newarr.push(obj1)
        }
        res.render('topcon',{
            data:newarr,
        })
        })
})

app.get('/logout' ,auth, function(req,res){
    userSession = req.session;
    Name=undefined
    sessEmail=undefined
	req.session.destroy(function(err){
        if(err)
        {
			throw err;
        }
        else
        {
            console.log("Session is destroyed, You are redirected to the login page.");
            res.sendFile(path.join(__dirname+'/public/index.html'))
    
        }
		})
    })

app.listen(3000,()=>{
    console.log('server on')
})