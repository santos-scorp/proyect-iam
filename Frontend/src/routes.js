import {createRouter, createMemoryHistory, createWebHistory} from 'vue-router'
import {SessionService} from '../src/services/sessionService'
import Main from './views/Main.vue'
import Dashboard from './views/Dashboard.vue'
import SiteChecker from './views/SiteChecker.vue'
import MainManagement from './views/management/MainManagement.vue'
import MainRegisters from './views/registers/MainRegisters.vue'
import Users from './views/management/Users.vue'
import Permissions from './views/management/Permissions.vue'
import Roles from './views/management/Roles.vue'
import Login from './views/Login.vue'
import DoorChecker from './views/DoorChecker.vue'

const routes = [
    {
        path: '/', 
        component: Main, 
        name: 'main',
        redirect: { name: "dashboard" },
        meta: {
            authRequired: true
        },
        children: [
            {
                path: 'dashboard',
                component: Dashboard,
                name: 'dashboard'
            },
            {
                path: 'registers',
                component: MainRegisters,
                name: 'registers'
            }
            ,
            {
                path: 'management',
                component: MainManagement,
                name: 'management',
                children: [
                    {
                        path: '/users',
                        component: Users,
                        name: 'users'
                    },
                    {
                        path: '/roles',
                        component: Roles,
                        name: 'roles'
                    },
                    {
                        path: '/permissions',
                        component: Permissions,
                        name: 'permissions'
                    }
                ]
            }
        ]
    },
    {path: '/login', component: Login, name: 'login'},
    {path: '/site', component: SiteChecker, name: 'site'},
    {path: '/door', component: DoorChecker, name: 'door'}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.authRequired) {
        const user = SessionService.get()
        console.log(user)
        if (user) {
            return next()
        } else {
            router.push({
                name: 'login'
            })
        }
    } else {
        return next()
    }
});

export default router