export interface UserType{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface GetAllUserOptions {
    page?: number;
    limit?: number;
    search?: string;
    role?: string| undefined 
}