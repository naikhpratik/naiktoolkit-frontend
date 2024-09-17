
import axios from 'axios';
import config from '../config';
import { handleError } from '../helpers/errorHandler';
import { UserProfileToken } from '../models/userProfileToken';

export const loginAPI = async (email: string, password: string) => {
    try {
        //Little different than video
        const response = await axios.post<UserProfileToken>(`${config.API_URL}/auth/login`, { email, password });
        return response;
    }catch(error) {
        handleError(error)
    }
}

export const registerAPI = async (name: string, email: string, password: string) => {
    try {
        //Little different than video
        const response = await axios.post<UserProfileToken>(`${config.API_URL}/auth/signup`, { name, email, password });
        return response;
    }catch(error) {
        handleError(error)
    }
}