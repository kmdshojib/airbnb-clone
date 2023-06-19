import prisma from "@/app/libs/prismadb"

const getListings = async () => {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        return listings;
    } catch (errors: any) {
        throw new Error(errors);
    }
}

export default getListings;