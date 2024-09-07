import {  Databases } from "appwrite";
import client from "@/lib/appwrite_client";


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