import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = process.env.VUE_APP_API

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        email: localStorage.getItem('email') || null,
        role: localStorage.getItem('role') || null,
    },
    getters: {
        loggedIn(state) {
            return state.token !== null
        },
    },
    mutations: {
        retrieveToken(state, token) {
            state.token = token
        },
        retrieveEmail(state, email) {
          state.email = email
        },
        retrieveRole(state, role) {
            state.role = role
        },
        destroyToken(state) {
            state.token = null
        },
        destroyEmail(state) {
            state.email = null
        },
        destroyRole(state) {
            state.role = null
        },
    },
    actions: {
        destroyToken(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

            if (context.getters.loggedIn) {
                return new Promise((resolve, reject) => {
                    axios.post('/user/logout')
                        .then(response => {
                            localStorage.removeItem('access_token')
                            localStorage.removeItem('email')
                            localStorage.removeItem('role')
                            context.commit('destroyToken')
                            context.commit('destroyEmail')
                            context.commit('destroyRole')
                            resolve(response)
                        })
                        .catch(error => {
                            localStorage.removeItem('access_token')
                            localStorage.removeItem('email')
                            localStorage.removeItem('role')
                            context.commit('destroyToken')
                            context.commit('destroyEmail')
                            context.commit('destroyRole')
                            reject(error)
                        })
                })
            }
        },
        retrieveToken(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('/login', {
                    email: credentials.email,
                    password: credentials.password,
                })
                .then(response => {
                    const token = response.data.token
                    const email = response.data.user.email
                    const role = response.data.user.role.name

                    localStorage.setItem('access_token', token)
                    localStorage.setItem('email', email)
                    localStorage.setItem('role', role)

                    context.commit('retrieveToken', token)
                    context.commit('retrieveEmail', email)
                    context.commit('retrieveRole', role)
                    resolve(response)

                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
            })
        },
        retrieveRoles(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

            return new Promise((resolve, reject) => {
                axios.get('/role/all')
                    .then(response => {
                        // context.commit('retrieveUsers', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        retrieveUsers(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

            return new Promise((resolve, reject) => {
            axios.get('/user/all')
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
            })
        },
        retrieveUser(context, id) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

            return new Promise((resolve, reject) => {
                axios.get('/user/show/' + id)
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        addUser(context, data) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

            return new Promise((resolve, reject) => {
                axios.post('/user/store', data)
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        updateUser(context, data) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            return new Promise((resolve, reject) => {
                axios.post('/user/update/' + data.id, data)
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        deleteUser(context, id) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            return new Promise((resolve, reject) => {
                axios.delete('/user/delete/' +id)
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        addCategory(context, form) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

            return new Promise((resolve, reject) => {
                axios.post('/category/store', form)
                    .then(response => {
                        context.commit('addCategory', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        retrieveCategories(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

            return new Promise((resolve, reject) => {
                axios.get('/category/all')
                    .then(response => {
                        //context.commit('retrieveUsers', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        retrieveCategory(context, id) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

            return new Promise((resolve, reject) => {
                axios.get('/category/show/' + id)
                    .then(response => {
                        //context.commit('retrieveUsers', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        updateCategory(context, data) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

            return new Promise((resolve, reject) => {
                axios.post('/category/update/' + data.id, data)
                    .then(response => {
                        //context.commit('retrieveUsers', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        deleteCategory(context, id) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

            return new Promise((resolve, reject) => {
                axios.delete('/category/delete/' + id)
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        retrieveProviders(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

            return new Promise((resolve, reject) => {
                axios.get('/provider/all')
                    .then(response => {
                        //context.commit('retrieveUsers', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        retrieveProvider(context, id) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

            return new Promise((resolve, reject) => {
                axios.get('/provider/show/' + id)
                    .then(response => {
                        //context.commit('retrieveUsers', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        addProvider(context, form) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

            return new Promise((resolve, reject) => {
                axios.post('/provider/store', form)
                    .then(response => {
                        context.commit('addProvider', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        updateProvider(context, data) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

            return new Promise((resolve, reject) => {
                axios.post('/provider/update/' + data.id, data)
                    .then(response => {
                        //context.commit('retrieveUsers', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        deleteProvider(context, id) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

            return new Promise((resolve, reject) => {
                axios.delete('/provider/delete/' + id)
                    .then(response => {
                        //context.commit('retrieveUsers', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        retrieveProducts(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            return new Promise((resolve, reject) => {
                axios.get('/product/all')
                    .then(response => {
                        //context.commit('retrieveUsers', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        retrieveProduct(context, id) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            return new Promise((resolve, reject) => {
                axios.get('/product/show/' + id)
                    .then(response => {
                        //context.commit('retrieveUsers', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        updateProduct(context, data) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            return new Promise((resolve, reject) => {
                axios.post('/product/update/' + data.id, data)
                    .then(response => {
                        //context.commit('retrieveUsers', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        deleteProduct(context, id) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            return new Promise((resolve, reject) => {
                axios.delete('/product/delete/' + id)
                    .then(response => {
                        //context.commit('retrieveUsers', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        addProduct(context, form) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

            return new Promise((resolve, reject) => {
                axios.post('/product/store', form)
                    .then(response => {
                        // context.commit('addProduct', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
    }
})
