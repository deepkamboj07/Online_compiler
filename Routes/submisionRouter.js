const express= require('express');
const router=express.Router();
const compiler=require('compilex');
const path=require('path');

compiler.init({stats:true});

router.post('/code',(req,res,next)=>{

    let language = req.query.lang;
    let code=req.body.code;
    let input=req.body.input;

    console.log(language);
    console.log(input);
    input=String(input);

    if(input==="")
    {
        switch(language)
        {
            case 'cpp':{
                var envData = { OS : "windows" , cmd : "g++",options:{timeout:20000}};
                compiler.compileCPP(envData,code,(data)=>{
                    if(data.error)
                    {
                        return res.status(200).json({
                            output:data.error
                        })
                    }
                    else
                    {
                       // console.log(data)
                        flushData();
                        return res.status(200).json({
                            output:data.output
                        })
                    }
                })
                break;
            }
            case 'java':{
                var envData={OS:"windows", cmd:"java",options:{timeout:20000}};
                compiler.compileJava(envData,code,(data)=>{
                    if(data.error)
                    {
                        return res.status(200).json({
                            output:data.error
                        })
                    }
                    else
                    {
                       // console.log(data)
                       flushData();
                        return res.status(200).json({
                            output:data.output
                        })
                    }
                })
                break;
            }
            case 'py':{
                var envData={OS:"windows", cmd:"py",options:{timeout:20000}};
                compiler.compilePython(envData,code,(data)=>{
                    if(data.error)
                    {
                        return res.status(200).json({
                            output:data.error
                        })
                    }
                    else
                    {
                       // console.log(data)
                       flushData();
                        return res.status(200).json({
                            output:data.output
                        })
                    }
                })
                break;
            }
            default:{
                return res.status(200).json({
                    output:"Server Error"
                })
            }
        }
    }
    else
    {
        switch(language)
        {
            case 'cpp':{
                var envData = { OS : "windows" , cmd : "g++",options:{timeout:20000}};
                compiler.compileCPPWithInput(envData,code,input,(data)=>{
                    if(data.error)
                    {
                        return res.status(200).json({
                            output:data.error
                        })
                    }
                    else
                    {
                        //console.log(data)
                        flushData();
                        return res.status(200).json({
                            output:data.output
                        })
                    }
                })
                break;
            }
            case 'java':{
                var envData={OS:"windows", cmd:"java",options:{timeout:20000}};
                compiler.compileJavaWithInput(envData,code,input,(data)=>{
                    if(data.error)
                    {
                        return res.status(200).json({
                            output:data.error
                        })
                    }
                    else
                    {
                        //console.log(data)
                        flushData();
                        return res.status(200).json({
                            output:data.output
                        })
                    }
                })
                break;
            }
            case 'py':{
                var envData={OS:"windows", cmd:"py",options:{timeout:20000}};
                compiler.compilePythonWithInput(envData,code,input,(data)=>{
                    if(data.error)
                    {
                        return res.status(200).json({
                            output:data.error
                        })
                    }
                    else
                    {
                        //console.log(data)
                        flushData();
                        return res.status(200).json({
                            output:data.output
                        })
                    }
                })
                break;
            }
            default:{
                return res.status(200).json({
                    output:"Server Error"
                })
            }
        }
    }
    
})


const flushData=()=>{
    compiler.flush(()=>{
        console.log("data flush");
    })
}



module.exports=router;