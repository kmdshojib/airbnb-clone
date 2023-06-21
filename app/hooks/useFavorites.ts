import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { SafeUser } from "../types";
import useLoginModal from "./useLogInModal";
import { toast } from "react-hot-toast";

interface IUseFavourite {
    listingId: string;
    currentUser?: SafeUser | null;
}
const useFavourites = ({ listingId, currentUser }: IUseFavourite) => {

    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;
            if (hasFavorited) {
                request = () => axios.delete(`/api/favourites/${listingId}`)
            } else {
                request = () => axios.post(`/api/favourites/${listingId}`)
            }

            await request();
            router.refresh();
            toast.success("Success")
        } catch (error) {
            toast.error("Something went wrong!");
            console.log(error)
        }
    }, [currentUser, listingId, router, hasFavorited, loginModal,])

    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavourites;
