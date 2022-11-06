import React, { useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';
import { prepareProfileItems } from '../../utils';
import { CHANGE_TITLE, ITEMS_MAP } from '../../consts';
import { Props } from './types';

import './About.css'

const cName = cn('about');

const About: Props = ({user}) => {

    return (
        <div className={cName()}>
            <div className={cName('description')}>{user.about}</div>
            <div className={cName('education')}>{user.education} </div>
        </div>
    )
}
export default About;