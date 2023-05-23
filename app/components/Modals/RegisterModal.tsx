"use client";

import { useState } from "react";
import useRegisterModal from "@/app/hooks/useRegisteModal";
import axios from "axios";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc"
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from 'react-hot-toast';
import Button from "../Button";



const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true)
        axios.post("/api/register", data)
            .then(() => {
                registerModal.onClose()
            }).catch((err) => {
                toast.error(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button 
                outline
                label="Continue with google"
                icon={FcGoogle}
                onClick={()=>{}}
            />
            <Button 
                outline
                label="Continue with GitHub"
                icon={AiFillGithub}
                onClick={()=>{}}
            />
            <div className="justify-center flex flex-row text-netural-500 text-center mt-4 font-white">
                <div>Already have an account?</div>
                <div className="text-neutral-500 cursor-pointer ml-1 hover:underline">Login</div>
            </div>
        </div>
    )
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to Airbnb"
                subTitle="Create a new Account"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required />
            <Input
                id="password"
                type="password"
                label="Password"
                errors={errors}
                disabled={isLoading}
                register={register}
                required />
        </div>
    )
    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}

        />
    )
}

export default RegisterModal