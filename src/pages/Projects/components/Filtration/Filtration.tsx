import React, { ChangeEvent, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { cn } from '@bem-react/classname';
import { parseStringForDiapazon } from '../../../../utils/parse';
import { Props } from './types';
import Card from '../../../../components/Card';
import Text from '../../../../components/Text';
import { NAIM, STATUSES, TAGS, TEAM_SIZES } from '../../consts';

import './Filtration.css';

const cName = cn('project-filters');

const ProjectFilters: Props = ({projects, setProjects, industries, innovationTypes}) => {
    const filterIndustries = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;

        setProjects(prev => {
            return prev.map(project => checked && project.industry !== value
                ? {...project, hidden: true} 
                : {...project, hidden: false} 
            );
        });
    }, [setProjects]);

    const industriesCriterias = useMemo(() => {
        return (
            <div className={cName('boxes')}>
                {industries.map(el => (
                    <div key={el}>
                        <label htmlFor={el}>{el}</label>
                        <input name={el} value={el} className={cName('chbx')} type="checkbox" onChange={filterIndustries}/>
                    </div>
                ))}
            </div>
        )
    }, [industries, projects, filterIndustries, setProjects]);

    const filterInnivationTypes = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;

        setProjects(prev => {
            return prev.map(project => checked && project.innovation_type !== value
                ? {...project, hidden: true} 
                : {...project, hidden: false}
            );
        });
    }, [setProjects]);

    const innovationTypesCriterias = useMemo(() => {
        return (
            <div className={cName('boxes')}>
                {innovationTypes.map(el => (
                    <div key={el}>
                        <label htmlFor={el}>{el}</label>
                        <input name={el} value={el} className={cName('chbx')} type="checkbox" onChange={filterInnivationTypes}/>
                    </div>
                ))}
            </div>
        )
    }, [innovationTypes, filterInnivationTypes, setProjects]);

    const filterTags = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;

        setProjects(prev => {
            return prev.map(project => {
                if (checked && !(project.innovations.includes(value) 
                    || project.description.includes(value) 
                    || project.title.includes(value)
                    || project.industry.includes(value))
                ) {
                    return {...project, hidden: true};
                } else {
                    return {...project, hidden: false}
                }  
            });
        });
    }, [setProjects]);

    const tagsCriterias = useMemo(() => {
        return (
            <div className={cName('boxes')}>
                {TAGS.map(el => (
                    <div key={el}>
                        <label htmlFor={el}>{el}</label>
                        <input name={el} value={el} className={cName('chbx')} type="checkbox" onChange={filterTags}/>
                    </div>
                ))}
            </div>
        )
    }, [filterTags]);

    const filterIsActive = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;
        setProjects(prev => {
            return prev.map(project => checked && !project.jobs?.length ? {...project, hidden: true} : {...project, hidden: false});   
        });
    }, [setProjects, projects]);

    const filterIsNotActive = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;
        setProjects(prev => {
            return prev.map(project => checked && project.jobs?.length ? {...project, hidden: true} : {...project, hidden: false});   
        });
    }, [setProjects, projects]);

    const isActiveCriterias = useMemo(() => {
        return (
            <div className={cName('boxes')}>
                {STATUSES.map(el => (
                    <div key={el}>
                        <label htmlFor={el}>{el}</label>
                        <input name={el} value={el} className={cName('chbx')} type="checkbox" onChange={el === NAIM ? filterIsActive : filterIsNotActive}/>
                    </div>
                ))}
            </div>
        )
    }, [projects, filterIsActive, filterIsActive, setProjects]);

    const filterTeamSize = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target;

        setProjects(prev => {
            const {min, max} = parseStringForDiapazon(value);
            
            return prev.map(project => checked && ((project.team_size || 0) <= min || (project.team_size || 0) >= max)
                ? {...project, hidden: true} 
                : {...project, hidden: false}   
            );
        });
    }, [setProjects]);

    const teamSizeCriterias = useMemo(() => {
        return (
            <div className={cName('boxes')}>
                {TEAM_SIZES.map(el => (
                    <div key={el}>
                        <label htmlFor={el}>{el}</label>
                        <input name={el} value={el} className={cName('chbx')} type="checkbox" onChange={filterTeamSize}/>
                    </div>
                ))}
            </div>
        )
    }, [filterTeamSize, setProjects]);
    
    return (
        <Card className={cName()}>
            <div className={cName('block')}>
                <Text className={cName('field-title')}>????????????</Text>
                {isActiveCriterias}
            </div>   

            <div className={cName('block')}>
                <Text className={cName('field-title')}>?????????????????? ??????????????????</Text>
                {innovationTypesCriterias}
            </div>

            <div className={cName('block')}>
                <Text className={cName('field-title')}>??????????????????</Text>
                {industriesCriterias}
            </div>     

            <div className={cName('block')}>
                <Text className={cName('field-title')}>???????????? ??????????????</Text>
                {teamSizeCriterias}
            </div>

            <div className={cName('block')}>
                <Text className={cName('field-title')}>????????</Text>
                {tagsCriterias}
            </div>
        </Card>
    )
}

export default memo(ProjectFilters);