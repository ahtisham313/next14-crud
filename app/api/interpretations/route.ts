import client from "@/lib/appwrite_client";
import { Client, Databases,ID, Query } from "appwrite";
import { NextResponse } from "next/server";


const database= new Databases(client);
// creating interpretations
async function createInterpretation(data:{term:string ,interpretation:string}){
    try{
        const response= await database.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        'interpretations',
        ID.unique(),
        data
        );
        return response;

    }catch (error)
    {
        console.log("error creating interpretation ", error);
        throw new Error("failed to create interpretation");

    }
}
 //fetching interpretation

async function fetchInterpretation(){
    try{
        const response= await database.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        'interpretations',
     [Query.orderDesc("$createdAt")]
        );
        return response.documents;

    }catch (error)
    {
        console.log("error fetching interpretation ", error);
        throw new Error("failed to fetch interpretation");

    }}

     export async function POST(req:Request){
      try {
        const {term, interpretation}= await req.json();
         const data= {term, interpretation};
         const response= await createInterpretation(data);
        return NextResponse.json({message:"interpretation created"});
      } catch (error) {
        return NextResponse.json(
           {
          error: "failed to create interpretation"
        
           },
           {status:500}
        );
      }
    }

    export async function GET(){
        try {
          const  interpretation= await fetchInterpretation();
          return NextResponse.json(interpretation);
        } catch (error) {
          return NextResponse.json(
             {
            error: "failed to fetch interpretation"
          
             },
             {status:500}
          );
        }
      }
