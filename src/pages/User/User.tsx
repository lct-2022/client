import React, { useState, ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import UserOptions from './components/Options';
import Bio from './components/Bio';
import UserRoutes from './components/Routes';
import Contacts from './components/Contacts';

import './User.css';
import { currentUserSelector, shownProfileSelector } from '../../store/selectors/users';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

import {cn} from '@bem-react/classname';
import { redirectToLogin, removeAuthToken } from '../../utils/cookie';
const TITLE = 'Профиль';

const cName = cn('profile');

export function Profile() {
    const currentUser = useSelector(shownProfileSelector);
    const [userRating, setUserRating] = useState(0);

    const navigate = useNavigate();

    if (!currentUser) {
        navigate(ROUTES.LOGIN)
        // redirectToLogin();
        return null;
    }
    
    return (
        <div className={cName()}>
            <h1>{TITLE}</h1>

            <Bio 
                user={currentUser}
                rating={userRating}
            />

            <div className={cName('down')}>
                <UserRoutes user={currentUser}/>
                <Contacts user={currentUser}/>
            </div>
        </div>
    );
}

export default Profile;