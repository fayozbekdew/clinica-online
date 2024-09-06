"use server"
import { ID } from "node-appwrite";
import { revalidatePath } from "@/node_modules/next/cache";
import { APPOINTMENT_COLLECTION_ID, DATABASE, databases } from "../appwrite.config";

export const createAppointment = async (
    appointment: CreateAppointmentParams
  ) => {
    try {
      const newAppointment = await databases.createDocument(
        DATABASE!,
        APPOINTMENT_COLLECTION_ID!,
        ID.unique(),
        appointment
      );
      console.log({
        newAppointment,
      })

    //   revalidatePath("/admin");
      return JSON.parse(JSON.stringify(newAppointment));
    } catch (error) {
      console.error("An error occurred while creating a new appointment:", error);
    }
  };

export const getAppointment = async (AppointmentId: string) => {
    try {
        const appointment = await databases.getDocument(
            DATABASE!,
            APPOINTMENT_COLLECTION_ID!,
            AppointmentId
        )
        return JSON.parse(JSON.stringify(appointment))
    } catch (error) {
        console.log(error)
    }
  }