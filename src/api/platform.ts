import { Application, Job, Project, ProjectTeamMember, User } from "../types";
import { IDataRPC, request, RPCHosts } from "../utils/api";
import { TOKEN } from "../utils/consts";

export const getJobs = async (limit?: number): Promise<IDataRPC<Job[]>> => {
    return await request<Job[]>({
        method: 'popular-jobs',
        host: RPCHosts.Platform,
        ...(limit && {
            params: {limit}
        })
    });
};

export const getProjects = async (limit?: number): Promise<IDataRPC<Project[]>> => {
    return await request<Project[]>({
        method: 'popular-projects',
        host: RPCHosts.Platform,
        ...(limit && {
            params: {limit}
        })
    });
};

export const getCurrentProject = async (id: number): Promise<IDataRPC<Project>> => {
    return await request<Project>({
        method: 'get-project',
        host: RPCHosts.Platform,
        params: {
            id,
        },
    });
};

// get-project-team
export const getProjectTeam = async (projectId: number): Promise<IDataRPC<ProjectTeamMember[]>> => {
    return await request<ProjectTeamMember[]>({
        method: 'get-team-members',
        host: RPCHosts.Platform,
        params: {
            'project-id': projectId,
        },
    });
};

// get-project-vacancies
export const getProjectVacancies = async (projectId: number): Promise<IDataRPC<Application[]>> => {
    return await request<Application[]>({
        method: 'get-job-applications',
        host: RPCHosts.Platform,
        params: {
            'project-id': projectId,
        },
    })
};

//apply-to-job
export const applyToJob = async (jobId: number, token: string): Promise<IDataRPC<Application>> => {
    return await request({
        method: 'apply-to-job',
        host: RPCHosts.Platform,
        params: {
            'job-id': jobId,
        },
        settings: {
            authToken: token,
        }
    });
};

//accept-application

//decline-application

// get-job
export const getVacancy = async (jobId: number, token?: string): Promise<IDataRPC<Job>> => {
    return await request({
        method: 'get-job',
        host: RPCHosts.Platform,
        params: {
            'id': jobId,
        },
        ...(token && {
            settings: {
                authToken: token,
            }
        }),
    });
};