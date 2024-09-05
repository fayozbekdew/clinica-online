"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {useState} from 'react'
import {
  Form,
} from "@/components/ui/form"
import CustomFormField from "@/components/CustomFormField"
import SubmitButton from "@/components/SubmitButton"
import { UserFormValidation } from "@/lib/validation"
import { redirect, useRouter } from "@/node_modules/next/navigation"
import { createUser } from "@/lib/actions/patients.action"

 
export enum FieldType {
    INPUT = "input",
    SELECT = "select",
    TEXTAREA = "textarea",
    CHECKBOX = "checkbox",
    DATA_PICKER = "dataPicker",
    PHONE_INPUT = "phoneInput",
    SKELETON = "skeleton",
}
export function PatientForm() {
  const route = useRouter()
 const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
  })
 
  const onSubmit = async(values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true)
    try{
        const userData = {
          name:values.name,
          email:values.email,
          phone:values.phone
        }
        const user = await createUser(userData)
        console.log(user)
        if(user){route.push(`/patient/${user.$id}/register`)}
    }catch(err){
        console.log(err)
    }finally{
        setIsLoading(false)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <section>
            <h1 className="header">Hi there</h1>
            <p className="text-dark-700">Schedule your first appointment</p>
        </section>
        <CustomFormField
        control={form.control}
        fieldType={FieldType.INPUT}
        name="name"
        label="Full name"
        placeholder="John Doe"
        iconSrc="/assets/icons/user.svg"
        iconAlt="User icon"
        />
        <CustomFormField
        control={form.control}
        fieldType={FieldType.INPUT}
        name="email"
        label="Email"
        placeholder="example@gmail.com"
        iconSrc="/assets/icons/email.svg"
        iconAlt="email icon"
        />
         <CustomFormField
        control={form.control}
        fieldType={FieldType.PHONE_INPUT}
        name="phone"
        label="Phone Number"
        placeholder="+998 94 123 45 67"
        />
        <SubmitButton
        isLoading={isLoading}
        >
            Get Started
        </SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm