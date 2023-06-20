import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { safeUser } from "../types";
import useLoginModal from "./useLogInModal";
import { toast } from "react-hot-toast";

interface IUseFavourite {
    listingId: string;
    currentUser?: safeUser | null;
}
const useFavourites = ({
    listingId, currentUser
}: IUseFavourite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFvourited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    }, [currentUser, listingId])

    const toggleFvourite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.preventDefault();
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;
            if (hasFvourited) {
                request = () => axios.delete(`/api/favorites/${listingId}`)
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`)
            }

            await request();
            router.refresh();
            toast.success("Success")
        } catch (error) {
            toast.error("Something went wrong!")
        }
    }, [currentUser, listingId, router, hasFvourited, loginModal,])

    return {
        hasFvourited,
        toggleFvourite
    }
}

export default useFavourites;
