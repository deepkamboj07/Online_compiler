const express=require('express');
const http=require('http');
const bodyParser=require('body-parser')
var cors=require('cors');
const path=require('path')


const app=express();
app.use(bodyParser.json());

const submitRouter=require('./Routes/submisionRouter');

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})

app.use(express.static(path.join(__dirname,'build')));

app.get('/',(req,res,next)=>{
    return res.status(200).json({
        message:'Welcome to Ide Server'
    })
})

app.use('/submission',submitRouter);


app.get('/*',(req,res,next)=>{
    res.sendFile(path.join(__dirname + '/build/index.html'));
})


const server=http.createServer(app);
server.listen(3001)


