"use client";
import React, { ChangeEvent, useState } from 'react'

const CreatePage = () => {
  const [formData, setFormData]=useState({term:"" ,interpretation:""});
  const [isLoading, setIsLoading]=useState(false);
  const [error, setError]=useState<string | null> (null);

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
  }
  return (
    <div>
        <h1 className='font-bold text-2xl my-8'>
            Add New Interpretations
        </h1>

        <form className='flex gap-3 flex-col'>
            <input 
            name='term' 
            type='text' 
            placeholder='term'
            value={formData.term}
            className='py-1 px-2 border rounded-md' 
            onChange={handleInputChange}
            />
            
            <textarea 
            name='Interpretation'
             placeholder='Interpretation' 
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
               {isLoading? "Adding...":"Add Interpretation"}
            </button>
        </form>
        {error && <p className='text-red-500 mt-4'>{error}</p>}
    </div>
  )
}

export default CreatePage