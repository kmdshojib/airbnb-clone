"use client";
import { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb"

declare global {
    var cloudinery: any
}

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string
}
const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange, value
}) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url)
    }, [onChange])
    return (
        <div>
            <CldUploadWidget
                onUpload={handleUpload}
                uploadPreset="i05gycig"
                options={{
                    maxFiles: 1
                }}
            >
                {
                    ({ open }) => {
                        return (
                            <div className="relative cursor-pointer hover:opacity-70 transition 
                            border-dashed
                            p-20 
                            border-2
                            border-netural-300
                            flex flex-col justify-center items-center gap-4 text-neutral-600" onClick={() => open?.()}>
                                <TbPhotoPlus size={50} />
                                <div className="font-semibold text-lg">Click to Upload</div>
                                {value && (
                                    <div className="abolute inset-0 w-full h-full">
                                        <Image alt="Upload" fill style={{ objectFit: "cover" }} src={value} />
                                    </div>
                                )}
                            </div>
                        )
                    }
                }
            </CldUploadWidget>
        </div>
    );
}

export default ImageUpload;