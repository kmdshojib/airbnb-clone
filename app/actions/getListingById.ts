import prisma from "@/app/libs/prismadb"
import { create } from 'zustand';


interface IParams {
    listingId?: string;
}

const getListingById = async (
    params: IParams
) => {
    try {
        const { listingId } = params;
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        })
        if (!listing) {
            return null;
        }
        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                ceatedAt: listing.user.ceatedAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString() || null,
            }
        }
    } catch (err: any) {
        throw new Error(err)
    }
}

export default getListingById;