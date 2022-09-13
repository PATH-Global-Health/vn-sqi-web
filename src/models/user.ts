export interface User{
    access_token: string;
    expires_in: number;
    token_type: string;
    username: string;
    email: string;
    fullName: string;
    phoneNumber: string;
}

export interface Permission {
    code: string;
}

export interface UserInfo {
    userInfo: User;
    permissions: Permission[];
}