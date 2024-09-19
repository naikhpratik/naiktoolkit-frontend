import axios from 'axios';
import config from '../config';
import { handleError } from '../helpers/errorHandler';
import { UserProfileToken } from '../models/userProfileToken';
import { printHandler } from '../helpers/printHandler';

export const loginAPI = async (UserEmailId: string, Password: string) => {
    let response;
    try {
        const loginData = { UserEmailId, Password };
        response = await axios.post<UserProfileToken>(
            `${config.API_URL}/auth/login`,
            loginData
        );
        printHandler.printLog("Login Response", response.data);
        return response;
    } catch (error) {
        throw error;
        // handleError(error)
    }
}

export const registerAPI = async (Name: string, UserEmailId: string, Password: string) => {
    try {
        //Little different than video
        const signUpData = { Name, UserEmailId, Password };
        const response = await axios.post<UserProfileToken>(
            `${config.API_URL}/auth/signup`, signUpData
        );
        printHandler.printLog("Register Response", response);
        return response;
    } catch (error) {
        throw error;
        //handleError(error)
    }
}