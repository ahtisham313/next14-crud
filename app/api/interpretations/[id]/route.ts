import {  Databases } from "appwrite";
import client from "@/lib/appwrite_client";
import { NextResponse } from "next/server";


const database= new Databases(client);
//fetch a specific interpretation

async function fetchInterpretation(id:string) {
    try {
        const interpretation= await database.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            'interpretations',
            id
        )
        return interpretation;
    } catch (error) {
        console.error("error fetching interpretaion")
        throw new Error("failed to fetch interpretation")
    }
    
}
//delete specific interpretation

async function deleteInterpretation(id:string) {
    try {
        const response= await database.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            'interpretations',
            id
        )
        return response
        
    } catch (error) {
        console.error("error deleting interpretaion")
        throw new Error("failed to delete interpretation")
    }
    
}
//update specific interpretation

async function updateInterpretation(id:string, data: { term:string, interpretaion: string}) {
    try {
        const response= await database.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            'interpretations',
            id,
            data
        )
        return response
        
    } catch (error) {
        console.error("error deleting interpretaion")
        throw new Error("failed to delete interpretation")
    }
    
}
export async function GET(req:Request,
     {params}:{params: {
    id:string
}}) {
    try {
        const id= params.id
        const interpretaion= await fetchInterpretation(id);
        return NextResponse.json({interpretaion})
        
    } catch (error) {
        return NextResponse.json(
            {error:"failed to fetch interpretation"},
            {status:500}
        )
    }
}

export async function DELETE(req:Request,
    {params}:{params: {
   id:string
}}) {
   try {
       const id= params.id
        await deleteInterpretation(id);
       return NextResponse.json({message:"interpretation deleted"})
       
   } catch (error) {
       return NextResponse.json(
           {error:"failed to delete interpretation"},
           {status:500}
       )
   }
}

export async function PUT(req:Request,
    {params}:{params: {
   id:string
}}) {
   try {
       const id= params.id
       const interpretaion= await req.json();
       await updateInterpretation(id,interpretaion)
       return NextResponse.json({message:"interpretation updated"})
       
   } catch (error) {
       return NextResponse.json(
           {error:"failed to update interpretation"},
           {status:500}
       )
   }
}