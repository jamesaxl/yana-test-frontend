<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">

      <b-navbar-brand v-if="$store.getters.loggedIn" href="#" @click="$router.push({name: 'dashboard'})">Dashboard</b-navbar-brand>
      <b-navbar-brand v-else="" href="#" @click="$router.push({name: 'login'})">Login</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right v-if="$store.getters.loggedIn">
            <template #button-content>
              <em>{{$store.state.email}}</em>
            </template>
            <b-dropdown-item v-if="$store.state.role==='admin'" href="#" @click="$router.push({name: 'user-list'})">Users</b-dropdown-item>
            <b-dropdown-item href="#" @click="$router.push({name: 'provider-list'})">Providers</b-dropdown-item>
            <b-dropdown-item href="#" @click="$router.push({name: 'category-list'})">Categories</b-dropdown-item>
            <b-dropdown-item href="#" @click="$router.push({name: 'product-list'})">Products</b-dropdown-item>
            <b-dropdown-item href="#" @click="logout()">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>

</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'Root',
  data() {
    return {
    }
  },
  methods: {
   logout() {
     this.$store.dispatch('destroyToken')
       .then(response => {
         console.log(response.data)
         this.$router.push({name: 'login'})
       })
       .catch(error => {
         console.log(error)
       })
   }
  }
}
</script>

<style scoped>

</style>

