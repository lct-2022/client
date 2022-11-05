import { Dispatch } from "react";
import { getAuthorizedUser, getProfiles } from "../../api/passport";
import { CommonAction, UserData } from "../../types";
import { lsSaveAuthorizedUser } from "../../utils/storage";
import { ActiveUserAction, ActiveUserActions } from "../types/activeUser";
import { ShownUserActions } from "../types/shownUser";
import { UsersAction, UsersActions } from '../types/users';

export const getAuthorizedUserAction = (token?: string) => {
    return async (dispatch: Dispatch<ActiveUserAction>) => {

        const authorizeResponse = await getAuthorizedUser(token);

        if (authorizeResponse) {
            lsSaveAuthorizedUser(authorizeResponse)
        }
        console.log('authorizeResponse', authorizeResponse);
        
        return authorizeResponse
            ? 
                dispatch({
                    type: ActiveUserActions.SET_USER,
                    payload: authorizeResponse,
                })
            : 
                dispatch({
                    type: ActiveUserActions.UNSET_USER,
                });
        }
}

export const popularProfilesAction = (limit?: number) => {
    return async (dispatch: Dispatch<UsersAction>) => {

        const popularProfilesResponse = await getProfiles(limit);

        dispatch({
            type: UsersActions.SET_USERS,
            payload: popularProfilesResponse,
        });
    }
}

export const getUserProfileAction = (user: UserData): CommonAction<ShownUserActions.SET_USER_SHOWN, UserData> => {
    return {
        type: ShownUserActions.SET_USER_SHOWN,
        payload: user,
    }

    // return async (dispatch: Dispatch<UsersAction>) => {

    //     const popularProfilesResponse = await getProfiles(limit);

    //     dispatch({
    //         type: UsersActions.SET_USERS,
    //         payload: popularProfilesResponse.result,
    //     });
    // }
}