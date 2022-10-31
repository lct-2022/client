import { createSelector } from "reselect";
import { DEFAULT_AVATAR } from "../../utils/consts";
import { IBaseStore } from "../types/store";

export const isUserAuthorizedSelector = createSelector(
    (store: IBaseStore) => store.activeUser.user,
    user => !!user,
)

export const currentUserSelector = createSelector(
    (store: IBaseStore) => store.activeUser.user,
    user => user,
)

export const usersAvatarSelector = createSelector(
    (store: IBaseStore) => store.activeUser.user?.["avatar-url"],
    avatarUrl => avatarUrl || DEFAULT_AVATAR,
)

export const userRolesSelector = createSelector(
    (store: IBaseStore) => store.activeUser.roles,
    roles => roles,
)