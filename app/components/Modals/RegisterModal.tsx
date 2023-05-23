"use client";

import { useState } from "react";
import useRegisterModal from "@/app/hooks/useRegisteModal";
import axios from "axios";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc"
import Modal from "./Modal";


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
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
        />
    )
}

export default RegisterModal