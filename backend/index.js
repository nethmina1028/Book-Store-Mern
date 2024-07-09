import express, { request } from 'express'; //1
import {PORT,mongoDBURL} from './config.js'; //3
import mongoose from 'mongoose';  //5

const app = express(); //2

app.get('/',(request,response)=>{   //4
   // console.log(request)
    return response.status(234).send('Hello World')
});


/*  go this code true in to mongoose conntion
app.listen(PORT,()=>{          //3
    console.log(`Server is running on port ${PORT}`);
});

*/


mongoose                      //5
    .connect(mongoDBURL)

    .then(()=>{
        console.log('MongoDB connected');
        app.listen(PORT,()=>{          //3
            console.log(`Server is running on port ${PORT}`);
        });

    })
    .catch((error)=>{
         console.log(error);
    });