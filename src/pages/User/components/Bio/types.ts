import { FC } from "react";
import { User } from "../../../../types";

interface IProps {
    user: User;
    rating: number
}

export type Props = FC<IProps>;