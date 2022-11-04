import React, { useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';
import { Props } from './types';

import './Bio.css';

const avatarIcon = require('../../../../assets/avatar.svg').default;

const cName = cn('bio')

const Bio: Props = ({user, rating}) => {
    const [editMode, setEditMode] = useState(false);

    const editModeToggle = () => {
        setEditMode(prev => !prev);
    }
    console.log(avatarIcon);
    
    return (
        <div className={cName()}>
            <div className={cName('data')}>
               
                <img 
                    src={avatarIcon}
                    alt="Аватар" 
                    className={cName('avatar')}
                />

                <div className={cName('personal_info')}>
                    <p>{user.fio}</p>
                    
                    <div className={cName('location')}>
                        <p>{user.city}</p>
                        <p>{user.country}</p>
                    </div>

                    <div className={cName('rating')}>{rating}</div>
                </div>

                <div className={cName('status')}>
                    {user.admin ? 'Эксперт' : 'Неэксперт'}
                </div>

                <div className={cName('hakatons_experience')}>
                    Опыт в хакатонах
                </div>
            </div>

            <button className={cName('settings')} onClick={editModeToggle}>
                Редактировать профиль
            </button>
        </div>
    )
}
export default Bio;