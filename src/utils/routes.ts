export const ROUTES = {
    INDEX: '/',
    SIGNUP: '/signup',
    LOGIN: '/login',
    PROJECTS: '/projects',
    SERVICES: '/services',
    EXPERTS: '/users/administrators',
    PARTICIPANTS: '/users/participants',
    USER: '/profile/:id',
    PROJECT: '/profile/:id',
    JOBS: '/vacancies',
    CHAT: '/chat',
}

export const NOT_NAVBAR_ROUTES = [
    ROUTES.LOGIN,
    ROUTES.SIGNUP,
]