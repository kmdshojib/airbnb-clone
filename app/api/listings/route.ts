import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"
import getCurrentUser from "@/app/actions/getCurrentUser"
import { request } from "http"

export const POST = async (
    request: Request
) => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    const body = await request.json()

    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathRoomCount,
        guestCount,
        location,
        price
    } = body

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            guestCount,
            bathRoomCount,
            loactionValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing)
}