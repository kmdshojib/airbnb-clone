"use client"

import { useMemo, useState } from "react";
import useRentModal from "@/app/hooks/useRentModal"
import Modal from "./Modal"
import Heading from "../Heading";
import { categories } from "../NavBar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import Counter from "../inputs/Counter";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import ImageUpload from "../inputs/ImageUpload";


enum STEPS {
    CATEGORY = 0,
    LOACTION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

// interface RentModalProps {

// }

const RentModal = () => {
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: "",
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: "",
            price: 1,
            title: "",
            description: "",
        }

    })
    const category = watch("category");
    const loaction = watch("loaction");
    const guestCount = watch("guestCount");
    const roomCount = watch("roomCount");
    const bathroomCount = watch("bathroomCount");
    const imageSrc = watch("imageSrc");

    const Map = useMemo(() => dynamic(() => import("../Map"), {
        ssr: false,
    }), [loaction])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }
    const onBack = () => {
        setStep(value => value - 1)
    }
    const onNext = () => {
        setStep(value => value + 1)
    }

    const actionLebel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return "Create"
        }
        return "Next";
    }, [step])

    const secondaryActionLebel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return "Back";
    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describes your place?"
                subTitle="Pick a category"
            />
            <div className="
            grid 
            grid-cols-1
            md:grid-cols-2
            gap-3 
            max-h-[50vh]
            overflow-y-auto">
                {
                    categories.map(item => (
                        <div key={item.label} className="col-span-1">
                            <CategoryInput
                                onClick={(category) => setCustomValue("category", category)}
                                selected={category === item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )

    if (step === STEPS.LOACTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your loacted?"
                    subTitle="Help guests find you!"
                />
                <CountrySelect
                    value={loaction}
                    onChange={(value) => setCustomValue("loaction", value)}
                />
                <Map
                    center={loaction?.latlng}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basics about your place"
                    subTitle="What amenities do you have?"
                />
                <Counter
                    title="Guests"
                    subtitle="How many guests do you allow?"
                    value={guestCount}
                    onChange={(value) => setCustomValue("guestCount", value)}
                />
                <hr />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={(value) => setCustomValue("roomCount", value)}
                />
                <hr />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue("bathroomCount", value)}
                />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add a photo if your place"
                    subTitle="Show guests how dose your place look like!"
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue("imageSrc", value)}
                />
            </div>
        )
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={onNext}
            actionLabel={actionLebel}
            seconderyActionLabel={secondaryActionLebel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="AirBnB Your Home!"
            body={bodyContent}
        />
    )
}

export default RentModal