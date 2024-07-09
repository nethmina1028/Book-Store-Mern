import express, { request, response } from 'express'; //1
import {PORT,mongoDBURL} from './config.js'; //3
import mongoose from 'mongoose';  //5
import {Book} from './models/bookModel.js'; //6

const app = express(); //2


//Middleware for parsing json data
app.use(express.json()); //7.2


app.get('/',(request,response)=>{   //4
   console.log(request)
    return response.status(234).send('Hello World')
});


/*  go this code true in to mongoose conntion
app.listen(PORT,()=>{          //3
    console.log(`Server is running on port ${PORT}`);
});

*/

  // Route for Save a new book   //7
   

  app.post('/books',async(request,response) =>{
    try{
      if(
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      )  {
        return response.status(400).send({
            message:'Send all required fields:title,author,publishYear',
        });
      }  

      const newBook = {
        title:request.body.title,
        author:request.body.author,
        publishYear:request.body.publishYear,
      };

      const book = await Book.create(newBook);
      return response.status(201).send(book);
    
    }catch(error){
      console.log(error.message);
      response.status(500).send({message:error.message});
    }
  });



   //Get all books  8

   app.get('/books',async(request,response) =>{
    try{

       const books = await Book.find({});

       return response.status(200).json({
       count:books.length,
       data:books
       });

    }catch(error){
      console.log(error.message);
      response.status(500).send({message:error.message});
    }
  });



      //Get book by id   9

      app.get('/books/:id', async (request, response) => {
        try{
            const {id} = request.params;
            const books =  await Book.findById(id);
           
            return response.status(200).json({
                count:books.length,
                data:books
            });

        }catch(error){

            console.log(error.message);
            response.status(500).send({message:error.message});
        }
     });



     //update book    10
   
  app.put('/books/:id', async (request, response) => {
   
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
          )  {
            return response.status(400).send({
                message:'Send all required fields:title,author,publishYear',
            });
          }  
      const {id} = request.params;
      const result = await Book.findByIdAndUpdate(id, request.body);

      if(!result){
        return response.status(404).json({message: 'Book not found'});
      }
      
      return response.status(200).send({message:'Book updated'});

    }catch(error){

      console.log(error.message);
            response.status(500).send({message:error.message});
    }
    
    
  });


  //delete book   11

  app.delete('/books/:id', async (request, response) => {
   
    try{
      const {id} =request.params;
      const result = await Book.findByIdAndUpdate(id);

      if(!result){
        return response.status(404).json({message: 'Book not found'});
      }
      
      
      return response.status(200).send({message:'Book deleted sucess'});

    }catch(error){

        console.log(error.message);
        response.status(500).send({message:error.message});
    }
    
    
  });




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