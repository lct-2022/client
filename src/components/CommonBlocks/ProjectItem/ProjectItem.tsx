import React, { memo, useCallback, useState} from 'react';
import { cn } from '@bem-react/classname'
import {useLinkClickHandler, useLocation, useParams} from 'react-router-dom';
import './ProjectItem.css';

import {Props} from './types';
import { ROUTES } from '../../../utils/routes';
import { getApplications, getCurrentProject } from '../../../api/platform';
import { getCurrentProjectAction, getProjectTeamAction } from '../../../store/actions/projects';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getJobApplicationsAction } from '../../../store/actions/jobs';
import { vote } from '../../../api/rating';
import { getTokenFromCookies } from '../../../utils/cookie';
import { currentUserSelector } from '../../../store/selectors/users';
import Card from '../../Card';
import Text from '../../Text';
import { validateNumberPeople } from '../../../utils/grammar';

const cName = cn('project-card');

const ProjectCard: Props = ({
    title, 
    description,
    industry = 'Artificial intellegence',
    teamSize = 3,
    jobs,
    rating,
    additonalInfo = 'В проработке',
    id,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    console.log(industry);
    
    
    const canSearchPeople = location.pathname === ROUTES.USER;
    const canSeeApplications = location.pathname === ROUTES.USER;

    const currentUser = useSelector(currentUserSelector);

    const passToProject = useCallback(() => {
        Promise.all([
            new Promise((res) => res(dispatch<any>(getCurrentProjectAction(id)))),
            new Promise((res) => res(dispatch<any>(getProjectTeamAction(id)))),
            // dispatch<any>(getProjectVacanciesAction(id)),
        ])
            .then(() => {
                navigate(ROUTES.PROJECT);
            })
            .catch((err) => {
                throw new Error(err);
            });
    }, [id]);

    const searchPeople = () => {
        navigate(`${ROUTES.EXPERTS}/search`);
    }

    const passToAppllications = useCallback(() => {
        // THUNK
        getApplications(id)
            .then(data => {
                dispatch<any>(getJobApplicationsAction(data || []));
                navigate(ROUTES.APPLICATIONS);
            })
    }, [id]);

    const makeVote = useCallback(() => {
        if (!currentUser) { 
            return;
        }
        vote({
            method: 'vote',
            subjectType: 'project',
            subjectId: id,
            token: getTokenFromCookies()
        })
            .then(() => {
                getCurrentProject(id);
            })
    }, [id, currentUser]);
    
    return (
        <Card className={cName()}>
            <div className={cName('left-block')}>
                <div className={cName('logo')}>
                    <Text type="violet" className={cName('title-in-logo')}>{title}</Text>
                </div>
                
                <div className={cName('data')}>
                    <div className={cName('data-upper')}>
                        <div className={cName('titles')}>
                            <Text className={cName('title')} onClick={passToProject}>
                                {title}
                            </Text>

                            <Text type="violet">
                                {industry}
                            </Text>
                        </div>

                        <Text type="light">{description}</Text>
                    </div>

                    <div className={cName('data-down')}>
                        {teamSize !== undefined && teamSize !== null &&  <Text>{validateNumberPeople(teamSize)}</Text>}

                        {jobs && <Text type="light">{jobs?.length ? 'Идет найм' : 'Найма нет'}</Text>}

                        {additonalInfo && <Text>{additonalInfo}</Text>}
                    </div>
                </div>
            </div>

            <div className={cName('rating')}>
                {rating !== undefined && 
                    <>
                        <div className={cName('triangle')}/>
        
                        <div className={cName('num-votes')}>{rating}</div>
                    </>
                }

                {canSearchPeople &&
                    <button onClick={searchPeople}>Найти человека в команду</button>
                }

                {currentUser?.admin &&
                    <button>Создать вакансию</button>
                }           

                {/* {canSeeApplications &&
                    <button onClick={passToAppllications}>Отклики</button>
                }        */}
            </div>
        </Card>
    )
}

export default memo(ProjectCard);