import { Role } from "../role";

export type UserProfileDto = {

    fullName? : string;
    userName?: string;
    email?: string;
    token?: string;
    tokenExpirationInMin?: number;
    refreshToken?: string;
    refreshTokenExpirationInMin?: string;
    userRole?: Role; 
}