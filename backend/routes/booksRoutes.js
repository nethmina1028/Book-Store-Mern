                     //12
import express from 'express';
import {Book} from '../models/bookModel.js';


        const router = express.Router();  //15


 // Route for Save a new book   //7

    /* for example

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
        */  

         router.post('/',async(request,response) =>{
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

   router.get('/',async(request,response) =>{
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

   router.get('/:id', async (request, response) => {
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
   
   router.put('/:id', async (request, response) => {
   
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

  router.delete('/:id', async (request, response) => {
   
    try{
      const { id } =request.params;
      const result = await Book.findByIdAndDelete(id);

      if(!result){
        return response.status(404).json({message: 'Book not found'});
      }
      
      
      return response.status(200).send({message:'Book deleted sucess'});

    }catch(error){

        console.log(error.message);
        response.status(500).send({message:error.message});
    }
    
    
  });

  export default router;