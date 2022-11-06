import React, { useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';
import { Props } from './types';

import './Bio.css';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../../../utils/routes';
import Button from '../../../../components/Button';
import Card from '../../../../components/Card';
import Text from '../../../../components/Text';

const avatarIcon = require('../../../../assets/avatar.svg').default;

const cName = cn('bio')

const Bio: Props = ({user, rating}) => {
    const navigate = useNavigate();

    const passEditProfile = () => {
        navigate(ROUTES.USER_EDIT)
    }

    return (
        <Card className={cName()}>
            <div className={cName('data')}>              
                <img 
                    src={user.avatar_url || avatarIcon}
                    alt="Аватар" 
                    className={cName('avatar')}
                />

                <div className={cName('personal-info')}>
                    <div className={cName('upper-first')}>
                        <Text type='large' className={cName('fio')}>{user.fio}</Text>

                        <div className={cName('job')}>{user.job}</div>

                        <div className={cName('looking-hackathon')}>{user.looking_for_hackathon}</div>
                    </div>

                    <div className={cName('upper-first')}>
                        <Text className={cName('location')}>Живет в городе {user.city}</Text>
                    </div>

                    <Text className={cName('rating')} type="violet">место в рейтинге - {rating || 0}</Text>

                    {user.looking_for_job && <Text className={cName('status')}>Ищет команду</Text>}
                    {user.looking_for_hackathon && <div className={cName('looking-hackathon')}>Хочет в хакатон</div>}
                </div>

            </div>

            <Button className={cName('settings')} onClick={passEditProfile}>
                Редактировать профиль
            </Button>
        </Card>
    )
}
export default Bio;