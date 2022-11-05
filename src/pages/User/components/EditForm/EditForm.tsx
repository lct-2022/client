import React, { ChangeEvent, useCallback, useState } from "react";
import { cn } from "@bem-react/classname";
import { useDispatch, useSelector } from "react-redux";
import { currentUserSelector } from "../../../../store/selectors/users";
import {  updateUserProfile } from "../../../../api/passport";
import { getTokenFromCookies } from "../../../../utils/cookie";
import { getAuthorizedUserAction } from "../../../../store/actions/users";
import { PHONE_REGEXP } from "../../../../utils/consts";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../../utils/routes";

import './EditProfile.css';

const cName = cn('edit-profile');

function EditProfile() {
    const currentUser = useSelector(currentUserSelector);

    const [nameValue, setNameValue] = useState(currentUser?.fio.split(' ')[0] || '');
    const [lastnameValue, setLastnameValue] = useState(currentUser?.fio.split(' ')[1] || '');
    const [phoneValue, setPhoneValue] = useState(currentUser?.phone || '');
    const [cityValue, setCityValue] = useState(currentUser?.city || '');
    const [countryValue, setCountryValue] = useState(currentUser?.country || '');
    const [aboutValue, setAboutalue] = useState(currentUser?.about || '');
    const [educationValue, setEducationValue] = useState(currentUser?.education || '');
    const [avatarValue, setAvatarValue] = useState('');

    const changeName = (event: ChangeEvent<HTMLInputElement>) => {
        setNameValue(event.target.value)
    }
    const changeLastname = (event: ChangeEvent<HTMLInputElement>) => {
        setLastnameValue(event.target.value)
    }
    const changePhone = (event: ChangeEvent<HTMLInputElement>) => {
        setPhoneValue(event.target.value)
    }
    const changeCountry = (event: ChangeEvent<HTMLInputElement>) => {
        setCountryValue(event.target.value)
    }
    const changeCity = (event: ChangeEvent<HTMLInputElement>) => {
        setCityValue(event.target.value)
    }
    const changeEducation = (event: ChangeEvent<HTMLInputElement>) => {
        setEducationValue(event.target.value)
    }
    const changeAbout = (event: ChangeEvent<HTMLInputElement>) => {
        setAboutalue(event.target.value)
    }
    const changeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
        setAvatarValue(event.target.value)
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateProfile = useCallback(() => {
        if (!phoneValue.match(PHONE_REGEXP)) {
            alert('Невалидный номер телефона')
            return;
        }
        if (!phoneValue || !nameValue || !lastnameValue || !educationValue || !countryValue || !cityValue || !aboutValue) {
            alert('Пожалуйста, заполните все поля!')
            return;
        }
        updateUserProfile({
            ...currentUser,
            fio: `${nameValue} ${lastnameValue}`,
            phone: phoneValue,
            country: countryValue,
            city: cityValue,
            education: educationValue,
            about: aboutValue,
        }, getTokenFromCookies())
            .then(() => {
                return new Promise((res) => {
                    res(dispatch<any>(getAuthorizedUserAction(getTokenFromCookies())))
                  })
            })
            .then(() => {
                navigate(ROUTES.USER);
            })
    }, [nameValue, lastnameValue, phoneValue, countryValue, cityValue, educationValue, aboutValue])

    if (!currentUser) return null;

    return (
        <div className={cName()}>
            <div className={cName('input-block')}>
                <label htmlFor="name">Имя</label>
                <input type="text" name="name" value={nameValue} placeholder="Имя" onChange={changeName}/>
            </div>

            <div className={cName('input-block')}>
                <label htmlFor="lastname">Фамилия</label>
                <input type="text" name="lastname" value={lastnameValue} placeholder="Фамилия" onChange={changeLastname}/>
            </div>

            <div className={cName('input-block')}>
                <label htmlFor="phone">Номер телефона</label>
                <input type="text" name="phone" value={phoneValue} placeholder="Телефон" onChange={changePhone}/>
            </div>

            <div className={cName('input-block')}>
                <label htmlFor="country">Страна</label>
                <input type="text" name="country" value={countryValue} placeholder="Страна" onChange={changeCountry}/>
            </div>

            <div className={cName('input-block')}>
                <label htmlFor="city">Город</label>
                <input type="text" name="city" value={cityValue} placeholder="Город" onChange={changeCity}/>
            </div>

            <div className={cName('input-block')}>
                <label htmlFor="education">Образование</label>
                <input type="text" name="education" value={educationValue} placeholder="Образование" onChange={changeEducation}/>
            </div>

            <div className={cName('input-block', {about: true})}>
                <label htmlFor="about">О себе</label>
                <input type="text" name="about" value={aboutValue} placeholder="О себе" onChange={changeAbout}/>
            </div>

            <div className={cName('input-block')}>
                <label htmlFor="avatar">Аватар (ссылка)</label>
                <input type="text" name="avatar" value={avatarValue} placeholder="url" onChange={changeAvatar}/>
            </div>
            
            <div className={cName('btns')}>
                <button onClick={updateProfile}>Редактировать</button>
                <button onClick={() => navigate(-1)}>Назад в профиль</button>
            </div>
        </div>
    );
}

export default EditProfile;