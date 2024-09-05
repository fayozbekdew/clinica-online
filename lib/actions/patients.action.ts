"use server"
import { DATABASE, databases, NEXT_PUBLIC_BUCKET_ID, NEXT_PUBLIC_ENDPOINT,
     PATIENT_COLLECTION_ID,
     PROJECT_ID,
     storage, users } from "../appwrite.config"
import { ID } from "node-appwrite";
import { InputFile } from 'node-appwrite/file'

export const createUser = async ({name,email,phone}: CreateUserParams) => {
    // return JSON.stringify(props)
    try {
        const newUser = await users.create(
            ID.unique(),
            email,
            phone,
            undefined,
            name,
    )
        return JSON.parse(JSON.stringify(newUser))
    } catch (error: any) {
        console.log('Error')
    }
}

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId)
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        console.log(error)
    }
}

export const registerPatient = async ({identificationDocument,...patient}: RegisterUserParams) => {
    try {
        let file;
        // if(identificationDocument){
        //     const inputFile = 
        //     new File(
        //         [identificationDocument?.get("blobFile")],
        //         identificationDocument?.get("fileName"),
        //         { type: identificationDocument?.get("blobFile").type } 
        //       );
              
        //         file = await storage.createFile(NEXT_PUBLIC_BUCKET_ID!, ID.unique(), inputFile)
        //     }
            if (identificationDocument) {
                const blobFile = identificationDocument.get("blobFile");
              
                if (blobFile) {
                  const inputFile = new File(
                    [blobFile],
                    identificationDocument.get("fileName") || "defaultFilename",
                    { type: blobFile.type || "application/octet-stream" }
                  );
              
                  file = await storage.createFile(NEXT_PUBLIC_BUCKET_ID!, ID.unique(), inputFile);
                }}
            const newPatient = await databases.createDocument(
                DATABASE!,
                PATIENT_COLLECTION_ID!,
                ID.unique(),
                {
                    identificationDocumentId: file?.$id ? file.$id : null,
                    identificationDocumentUrl: file?.$id
                    ? `${NEXT_PUBLIC_ENDPOINT}/storage/buckets/${NEXT_PUBLIC_BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
                    : null,
                  ...patient,
                }
                ) 
        return JSON.parse(JSON.stringify(newPatient))
    } catch (error) {
        console.log(error)
      }
}

