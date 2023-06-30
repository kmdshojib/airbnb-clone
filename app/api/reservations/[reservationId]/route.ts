import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface Iparams {
    reservationId?: string;
}

export const DELETE = async (
    request: Request, 
  { params }: { params: Iparams }
) => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }

    const { reservationId } = params;
    console.log({reservationId})
    if (!reservationId || typeof reservationId !== "string") {
        throw new Error("Invalid Id")
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id },
                { listing: { userId: currentUser.id } },
            ]
        }
    });
    return NextResponse.json(reservation);
}
