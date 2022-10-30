import { createSelector } from "reselect";
import { IBaseStore } from "../types/store";

export const popularProjectsSelector = createSelector(
    (store: IBaseStore) => store.projects.list,
    projects => projects,
);

export const allProjectsNumSelector = createSelector(
    (store: IBaseStore) => store.projects.amount,
    amount => amount,
);

// TODO: support identification
export const allProjectsSupportedSelector = createSelector(
    (store: IBaseStore) => store.projects.list.filter(project => project.synced).length,
    amount => amount,
);