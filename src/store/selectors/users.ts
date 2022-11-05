import { createSelector } from "reselect";
import { IBaseStore } from "../types/store";
import { DEFAULT_AVATAR } from "../../utils/consts";

export const authUserSelector = createSelector(
    (store: IBaseStore) => store.authUser,
    user => user,
)

export const usersAvatarSelector = createSelector(
    (store: IBaseStore) => store.authUser?.avatar_url,
    avatarUrl => avatarUrl || DEFAULT_AVATAR,
)

export const popularProfilesSelector = createSelector(
    (store: IBaseStore) => store.users.list,
    users => users || [],
);

export const currentUserSelector = createSelector(
    (store: IBaseStore) => store.currentUser,
    user => user,
);