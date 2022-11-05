import React, { FC, useEffect, useMemo, useState } from 'react';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import { cn } from '@bem-react/classname'
import { useDispatch } from 'react-redux';
import { getAllProjects, getPopularProjects } from '../../api/platform';
import { popularProjectsAction } from '../../store/actions/projects';
import { Project, ProjectData } from '../../types';
import { getTokenFromCookies } from '../../utils/cookie';

import ProjectsList from './components/ProjectsList';
import Pagination from './components/Pagination';
import Filtration from './components/Filtration';

import './Projects.css';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../store/selectors/users';
import Spinner from '../../components/Spinner';

const cName = cn('projects-page');

const queryClient = new QueryClient();

interface Props {
    fromProfile?: boolean;
}

const Projects: FC<Props> = () => {
    const [allProjects, setAllProjects] = useState<ProjectData[]>([]);

    const allProjectsResponce = useQuery('allProjects', () => getAllProjects('*'));
    const innovationTypesResponce = useQuery('getInnovationtypes', () => getAllProjects('*'));

    useEffect(() => {
        setAllProjects(allProjectsResponce.data?.items?.map(project => ({...project, hidden: false})) || []);
    }, [allProjectsResponce.data]);

    if (allProjectsResponce.isLoading) {
        return <Spinner/>
    } 

    if (allProjectsResponce.error) {
        throw new Error();
    } 

    return (
        <QueryClientProvider client={queryClient}>
            <div className={cName()}>
                <div className={cName('options')}>
                    <div className={cName('list')}>
                        <ProjectsList projects={allProjects}/>
                    </div>
    
                    {<div className={cName('filtration')}>
                        <Filtration 
                            projects={allProjects}
                            setProjects={setAllProjects}
                        />
                    </div>}
                </div>
    
                {/* <Pagination projects={allProjects}/> */}
            </div>
        </QueryClientProvider>
    )
}
export default Projects;