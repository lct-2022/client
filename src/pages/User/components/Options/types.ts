import { UnsubscribeListenerOptions } from "@reduxjs/toolkit";
import { Dispatch, FC, SetStateAction } from "react";
import { User } from "../../../../types";
import { UserOption } from "../../consts";

interface IProps {
    currentOption: UserOption,
    setOptions: (point: UserOption) => void;
}

export type Props = FC<IProps>;