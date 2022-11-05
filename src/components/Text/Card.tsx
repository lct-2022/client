import React, { memo } from 'react';
import { cn } from '@bem-react/classname';

import {Props} from './types';

import './Text.css';

const cName = cn('card');

const Card: Props = ({
    children,
    type = 'ordinary',
    ...props
}) => {
    return (
        <p {...props} className={cName({type})}>
            {children}
        </p>
    );
};

export default memo<Props>(Card);