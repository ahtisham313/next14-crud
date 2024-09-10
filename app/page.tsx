"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IInterpretation{
    $id: string;
    term: string;
    interpretation: string

  }



export default function Home() {
  const [interpretations, setInterpretations]=useState<IInterpretation[]>([]);
  const [isLoading, setIsLoading]= useState(true);
  const [error, setError]=useState<string | null >(null)
  useEffect(()=>{
      const fetchInterpretation= async()=>{
        setIsLoading(true);
        try {
          const response=await fetch("/api/interpretations");
          if(!response.ok){
            throw new Error("failed to fetch");
          }
          const data= await response.json();
          setInterpretations(data);
        } catch (error) {
          console.log("Error",error);
          setError("failed to load interpretations, plz reload again");
        } finally{
          setIsLoading(false);
        }

      } ;
      fetchInterpretation();
  },[])
      const handleDelete=async(id: string)=>{
        try {
          await fetch(`/api/interpretations/${id}`,{method:"DELETE"});
          setInterpretations((prevInterpretations)=>
            prevInterpretations?.filter((i)=> i.$id==id)
        );
        } catch (error) {
          setError("failed to delete, plz try again")
        }
      }
  
  return (
    <div >
      {error && <p className="py-4 text-red-500">{error}</p>}
      {isLoading?(<p>Loading Interpretations..</p>): interpretations?.length > 0 ? 
      (
      <div>
        {interpretations?.map(interpretation=>(
              <div 
              key={interpretation.$id}
              className="leading-8 p-4 my-2 rounded-md border-b">
             <div className="font-bold ">{interpretation.term}</div>
         <div>
         {interpretation.interpretation}
        </div>
        <div className="flex justify-end mt-4 gap-4">
          <Link className="uppercase font-bold bg-slate-200 px-4 py-2 rounded-md text-sm tracking-widest" href={`/edit/${interpretation.$id}`}>
           edit
          </Link>
          <button onClick={()=>handleDelete(interpretation.$id)} className="uppercase font-bold text-white bg-red-500 px-4 py-2 rounded-md text-sm tracking-widest" >
            delete
          </button>
        </div>
                </div>
       ) )
       }
        
      </div>
      ):
      (
      <p>
           No Interpretations Found.
      </p>)
      
}
    </div>

  );
}
