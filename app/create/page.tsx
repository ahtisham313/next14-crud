"use client";
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react'


const CreatePage = () => {
  const [formData, setFormData]=useState({term:"" ,interpretation:""});
  const [isLoading, setIsLoading]=useState(false);
  const [error, setError]=useState<string | null> (null);

const router=useRouter();

  const handleInputChange=(
e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  )=>{
    setFormData((prevData)=>({
      ...prevData,
      [e.target.name]:e.target.value,

    }))
  }

  const handleSubmit= async(e: React.FormEvent)=>{
    e.preventDefault();

    if(!formData.term || !formData.interpretation){
      setError("please fill in all fields");
      return
    }
    setError(null);
    setIsLoading(true);

    try {
      const response=await fetch("/api/interpretations",{
        method:"POST",
        headers:{
          "Content-type":"application/json",
        },
        body:JSON.stringify(formData),
      })
      if(!response.ok){
        throw new Error("failed to create interpretation");
      }
      router.push("/");

    } catch (error) {
      console.log(error)
      setError("something went wrong, please try again.")
    }
    finally{
      setIsLoading(false);
    }
  }
  return (
    <div>
        <h1 className='font-bold text-2xl my-8'>
            Add New Innovations
        </h1>

        <form  onSubmit={handleSubmit} className='flex gap-3 flex-col'>
            <input 
            name='term' 
            type='text' 
            placeholder='term'
            value={formData.term}
            className='py-1 px-2 border rounded-md' 
            onChange={handleInputChange}
            />
            
            <textarea 
            name='interpretation'
          
             placeholder='interpretation' 
             value={formData.interpretation}
             rows={4}
            className='py-1 px-4 rounded -md border resize-none '
            onChange={handleInputChange}
            >

            </textarea>
            <button className='font-bold text-white bg-black py-2 mt-5 px-4 rounded-md cursor-pointer'
            type='submit'
            disabled={isLoading}
            >
               {isLoading? "Adding...":"Add Innovations"}
            </button>
        </form>
        {error && <p className='text-red-500 mt-4'>{error}</p>}
    </div>
  )
}

export default CreatePage