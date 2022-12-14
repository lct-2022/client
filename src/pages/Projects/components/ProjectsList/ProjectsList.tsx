import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';

import ProjectCard from '../../../../components/CommonBlocks/ProjectItem';
import { Props } from '../../types';
import { cn } from '@bem-react/classname';

import './ProjectsList.css';
import { useLocation } from 'react-router';
import { ROUTES } from '../../../../utils/routes';

import Card from '../../../../components/Card';
import Text from '../../../../components/Text';
import { getAllProjects } from '../../../../api/platform';

import './ProjectsList.css';
import Button from '../../../../components/Button';
import { LIMITS } from '../../../../utils/consts';
import Spinner from '../../../../components/Spinner';

const cName = cn('projects-list');

const ProjectsList: Props = ({projects, setProjects}) => {
    const location = useLocation();

    const [criteria, setCriteria] = useState('');
    const [pageKey, setPageKey] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(false);

    const isFromProfile = location.pathname === ROUTES.USER;
    const allHidden = projects.filter(project => !project.hidden).length === 0;
    const allMiss = !projects.length;

    const changeCriteria = (event: ChangeEvent<HTMLInputElement>) => {
        setCriteria(event.target.value);
    }

    const projectsList = useMemo(() => {
        if ((allMiss || allHidden) && !isFromProfile) {
            return (
                <h3>Проектов, удовлетворяющих заданным условиям, нет</h3>
            )
        }

        if (allMiss && isFromProfile) {
            return (
                <h3>У Вас пока нет проектов</h3>
            )
        }
        
        if (!projects) {
            return null;
        }

        return (
            <div className={cName('container')}>
                {projects?.map(({title, description, industry, id, hidden}, index) => (
                    <div key={index} className={cName('project', {hidden})}>
                        <ProjectCard
                            title={title}
                            description={description}
                            industry={industry}
                            id={id}
                        />
                    </div>
                ))}
            </div>
        )
    }, [projects]);
    
    const search = useCallback(() => {
        setIsLoading(true);
        getAllProjects(criteria || '*', {limit: LIMITS.PROJECTS, pageKey})
            .then(data => {
                setProjects(data?.items || []);
                setPageKey(data?.next_page_key);
                setCriteria('');
                setIsLoading(false);

            })
    }, [criteria]);

    const showMore = useCallback(() => {
        setIsLoading(true);
        getAllProjects(criteria || '*', {limit: LIMITS.PROJECTS, pageKey})
            .then(data => {
                setProjects(data?.items.map(project => ({...project, hidden: false})) || []);
                setPageKey(data?.next_page_key);
                setIsLoading(false);
            })
    }, [criteria, pageKey]);

    if (isLoading) {
        return <Spinner/>
    }

    return (
        <div className={cName()}>
            <div className={cName('search')}>
                <input type="text" value={criteria} placeholder="Найти проект" onChange={changeCriteria} className={cName('search-input')}/>

                <Button onClick={search}>
                    {allHidden || allMiss ? 'Показать все' : 'Найти'}
                </Button>
            </div>

            {projectsList}

            {!allHidden && !allMiss &&
                <Button className={cName('show-more-btn')} onClick={showMore}>
                    Показать еще 
                </Button>  
            }   
        </div>
    )
}
export default ProjectsList;