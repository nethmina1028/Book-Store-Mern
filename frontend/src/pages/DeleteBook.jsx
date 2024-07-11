import React,{useState} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'

const DeleteBook = ()=> {

  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  
  const handleDeleteBook = () =>{
    setLoading(true);
    axios
       .delete(`http://localhost:5555/books/${id}`)
        .then(() =>{
          setLoading(false);
          navigate('/');
        })

        .catch((error) =>{
          setLoading(false);
          alert('An error happend.Plz cheak console');
          console.log(error);
        });
      };
  return (
    <div className='p-4'>
      <BackButton/>
       <h1>Delete Book</h1>
       {loading ? <Spinner /> :''}
       <div className='flex flex-col items-center border-2 rounded-xl border-sky-400 w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you Sure want to delete ?</h3>

        <button className='w-full p-4 m-8 text-white bg-red-600' onClick={handleDeleteBook}>
          Yes,Delete it
        </button>

       </div>
    </div>
  )
}

export default DeleteBook