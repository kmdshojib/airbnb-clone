import prisma from "@/app/libs/prismadb"

export interface IListingsParams {
    userId?: string
}

const getListings = async (params: IListingsParams) => {
    try {
        const { userId } = params;
        let query: any = {};

        if (userId) {
            query.userId = userId;
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: "desc"
            }
        });

        const safeListings = listings.map(listing => ({
            ...listing,
            createdAt: listing.createdAt.toISOString()
        }))
        return safeListings
    } catch (errors: any) {
        throw new Error(errors);
    }
}

export default getListings;