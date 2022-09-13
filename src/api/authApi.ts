import { LoginPayload } from "models";
import { User } from "models/user";
import { apiLinks } from "utils";
import axiosClient from "./axiosClient";

export const authApi = {
    login(payload: LoginPayload) : Promise<User> {
        return axiosClient.post(apiLinks.auth.login, payload);
    },
    getUserInfo() : Promise<User> {
        return axiosClient.get(apiLinks.auth.getUserInfo);
    }
}