import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (componentName) {
    return () => import(`@/components/${componentName}.vue`)
}

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: load('Home')
        },
        {
            path: '/logout',
            name: 'Logout',
            component: load('Logout')
        },
        {
            path: '/login',
            name: 'Login',
            component: load('Login')
        },
        {
            path: '/signup',
            name: 'Signup',
            component: load('Signup')
        },
        {
            path: '/mypage',
            name: 'Mypage',
            component: load('Mypage')
        },
        {
            path: '/franchises',
            name: 'Franchises',
            component: load('Franchises')
        },
        {
            path: '/cart',
            name: 'Cart',
            component: load('Cart')
        },
        {
            path: '/pay',
            name: 'Pay',
            component: load('Pay')
        }
    ]
})

export default router