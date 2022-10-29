import { IUser } from "../types";
import { IDataRPC, request, RPCHosts } from "../utils/api";

export const signup = async (email: string, password: string, fio: string = ''): Promise<IDataRPC<string>> => {
    return await request({
        method: 'signup',
        host: RPCHosts.Passport,
        params: {
            fio,
            email,
            password,
        },
    });
};

export const login = async (email: string, password: string): Promise<IDataRPC<string>> => {
    return await request({
        method: 'login',
        host: RPCHosts.Passport,
        params: {
            email,
            password,
        },
    });
};

export const getPopularProfiles = async (token: string, limit?: number): Promise<IDataRPC<IUser[]>> => {
    return await request({
        method: 'popular-profiles',
        host: RPCHosts.Passport,
        settings: {
            authToken: token
        },
        ...(limit && {
            params: {limit}
        })
    });
};