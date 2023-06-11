import { User } from "@prisma/client";

export type safeUser = Omit<
    User,
    "ceatedAt" | "updatedAt" | "emailVerified"
> & {
    ceatedAt: string;
    updatedAt: string;
    emailVerified: string | null
}