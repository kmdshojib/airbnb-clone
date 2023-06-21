import prisma from "@/app/libs/prismadb"

const getListings = async () => {
    try {
        const listings = await prisma.listing.findMany({
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