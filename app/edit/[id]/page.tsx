import React from 'react'

const EditPage = () => {
  return (
    <div>
        <h1 className='font-bold text-2xl my-8'>
            Edit Interpretations
        </h1>

        <form className='flex gap-3 flex-col'>
            <input name='term' type='text' placeholder='term' className='py-1 px-2 border rounded-md' />
            <textarea 
            name='Interpretation'
             placeholder='Interpretation' 
             rows={4}
            className='py-1 px-4 rounded-md border resize-none '>

            </textarea>
            <button className='font-bold text-white bg-black py-2 mt-5 px-4 rounded-md cursor-pointer'>
                Update Interpretaion
            </button>
        </form>
    </div>
  )
}

export default EditPage