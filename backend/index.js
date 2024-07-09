import express, { request, response } from 'express'; //1
import {PORT,mongoDBURL} from './config.js'; //3
import mongoose from 'mongoose';  //5
import {Book} from './models/bookModel.js'; //6
import booksRoutes from './routes/booksRoutes.js'; //13
import cors from 'cors'; //16

const app = express(); //2


//Middleware for parsing json data
app.use(express.json()); //7.2


//Middleware for cors

app.use(cors()); //16.2

//app.use(
   // cors({
   //     origin:'http://localhost:3000',
  //      methods:['GET','POST','PUT','DELETE'],
  //      allowedHeaders:['Content-Type'],
 //   })
  //);




app.get('/',(request,response)=>{   //4
   console.log(request)
    return response.status(234).send('Hello World')
});


/*  go this code true in to mongoose conntion
app.listen(PORT,()=>{          //3
    console.log(`Server is running on port ${PORT}`);
});

*/
            
          //add crud operations routes to the app like below
              app.use('/books',booksRoutes); //14

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