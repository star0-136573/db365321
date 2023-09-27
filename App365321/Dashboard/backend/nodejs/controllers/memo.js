
const redis = require('redis')
const express = require('express')
const app = express()
app.use(express.json())


exports.getRedis = async (req,res) =>{
    const titlekey = 't'+req.query.id
    const txtkey = 's'+req.query.id
    const client = redis.createClient({
        socket: {
            host: 'redis-19042.c309.us-east-2-1.ec2.cloud.redislabs.com',
            port: 19042,
        },
        password: '0abOhs2hqTMPUDD5zDbqNhRXI1AWLe2m'
    });
    client.on('error', (err) => console.error(err));
    client.connect();
    const title =await client.get(titlekey)
    const txt = await client.get(txtkey)
    res.json({
        title:title,
        text:txt,
    })
    client.quit()
   
}
exports.setRedis = async (req,res) =>{
    const titlekey = 't'+req.body.id
    const txtkey = 's'+req.body.id
    const title = req.body.title
    const txt = req.body.text
    const client = redis.createClient({
        socket: {
            host: 'redis-19042.c309.us-east-2-1.ec2.cloud.redislabs.com',
            port: 19042,
        },
        password: '0abOhs2hqTMPUDD5zDbqNhRXI1AWLe2m'
    });

    client.on('error', (err) => console.error(err));
    client.connect();
    await client.set(titlekey,title)
    await client.set(txtkey,txt)

    res.json({
       message:'success'
    })
    client.quit()
   
}


exports.getStatus = async (req,res) =>{
    
    const key = req.query.name.toUpperCase()
    console.log(key)
   
    const client = redis.createClient({
        socket: {
            host: 'redis-19042.c309.us-east-2-1.ec2.cloud.redislabs.com',
            port: 19042,
        },
        password: '0abOhs2hqTMPUDD5zDbqNhRXI1AWLe2m'
    });
    client.on('error', (err) => console.error(err));
    client.connect();
    const status =await client.get(key)
    console.log(status)
    if(status == null) status = 'not updated...'
    res.json({
       
        status:status,
    })
    client.quit()
   
}
exports.setStatus = async (req,res) =>{
    const key = req.body.name.toUpperCase()
    const status = req.body.status
    console.log(key)
   
    const client = redis.createClient({
        socket: {
            host: 'redis-19042.c309.us-east-2-1.ec2.cloud.redislabs.com',
            port: 19042,
        },
        password: '0abOhs2hqTMPUDD5zDbqNhRXI1AWLe2m'
    });

    client.on('error', (err) => console.error(err));
    client.connect();
    await client.set(key,status)


    res.json({
       message:'success'
    })
    client.quit()
   
}

