import React, { memo, useCallback, useEffect, useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/routes';
import { cn } from '@bem-react/classname'

import './JobItem.css';

import {Props} from './types';
import { applyToJob, getJobApplication, getApplications, getVacancy, cancelApplication } from '../../../api/platform';
import { getTokenFromCookies } from '../../../utils/cookie';
import { useDispatch } from 'react-redux';
import { getCurrentVacancyAction } from '../../../store/actions/jobs';
import { useSelector } from 'react-redux';
import { authUserSelector } from '../../../store/selectors/users';
import Button from '../../Button';

const cName = cn('vacancy-card');

const APPLY = 'Откликнуться';
const CANCEL = 'Отозвать';

const JobCard: Props = ({title, description, application, id}) => {
    const authUser = useSelector(authUserSelector);
    const [isApplication, setIsApplication] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getJobApplication(id, getTokenFromCookies())
            .then(data => {
                setIsApplication(!!data);
            })
    }, [id]);
    //-----//
    useEffect(() => {
        setIsApplication(!!application);
    }, [application]);
    
    const applicationAction = useCallback(() => {       
        if (!authUser) {
            alert('Чтобы откликнуться на вакансию, войдите или зарегистируйтесь')
            return;
        }

        const applicationRequestor = !isApplication
            ? applyToJob
            : cancelApplication
        
        applicationRequestor(id, getTokenFromCookies())
            .then(result => {
                setIsApplication(!!result)
            })
            .catch(() => {
                throw new Error()
            });
    }, [id, authUser, isApplication]);

    const passToVacancy = useCallback(() => {
        new Promise(res => res(dispatch<any>(getCurrentVacancyAction(id)))) 
            .then(() => {
                navigate(ROUTES.JOB);
            })
    }, [id]);    

    const btn = useMemo(() => {
        return (
            <Button className={cName('apply-btn', {applied: isApplication})} onClick={applicationAction}>
                {isApplication ? CANCEL : APPLY}
            </Button>
        )
    }, [isApplication, applicationAction])

    return (
        <div className={cName()}>
            <div className={cName('left-block')}>
                <div className={cName('logo')}/>

                <div className={cName('data')}>
                    <div className={cName('text', {title: true})} onClick={passToVacancy}>
                        {title}
                    </div>

                    <div className={cName('text', {description: true})}>
                        {description}
                    </div>
                </div>
            </div>

            {btn}
        </div>
    )
}

export default memo(JobCard);