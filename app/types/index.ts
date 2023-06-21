import { User, Listing } from "@prisma/client";


export type SafeListing = Omit<
    Listing,
    "createdAt"
> & {
    createdAt: string
}

export type SafeUser = Omit<
    User,
    "ceatedAt" | "updatedAt" | "emailVerified"
> & {
    ceatedAt: string;
    updatedAt: string;
    emailVerified: string | null
}