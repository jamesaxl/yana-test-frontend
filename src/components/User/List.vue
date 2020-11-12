<template>

  <div class="container">
    <h3>Users</h3>
    <div>
      <b-button squared @click="$router.push({name: 'user-add'})">+</b-button>
      <b-table striped hover :items="users" :fields="fields">
        <template #cell(is_enabled)="row">
          {{ checkValidation(row.item.is_enabled) }}
        </template>
        <template #cell(actions)="row">
          <b-button size="sm" @click="editPage(row.item)" class="mr-1">
            Edit
          </b-button>
          <b-button size="sm" @click="deleteUser(row.item)">
            Delete
          </b-button>
        </template>
      </b-table>
    </div>
  </div>

</template>

<script>

export default {

  name: "List",
  data() {
    return {
      fields: [
        {
          key: 'id',
          sortable: true
        },
        {
          key: 'first_name',
          sortable: true
        },
        {
          key: 'last_name',
          sortable: false
        },
        {
          key: 'email',
          sortable: false
        },
        {
          key: 'role.name',
          label: 'Role',
        },
        {
          key: 'is_enabled',
          label: 'Is enabled',
        },
        { key: 'actions', label: 'Actions' }
      ],
      users: []
    }
  },
  methods: {
    editPage(item) {
      this.$router.push('/user/edit/' + item.id)
    },
    deleteUser(item){
      this.$store.dispatch('deleteUser', item.id )
        .then(response => {
          console.log(response.data)
          this.retrieveUsers()

        })
        .catch(error => {
          console.log(error)
        })
    },
    retrieveUsers() {
      this.$store.dispatch('retrieveUsers' )
        .then(response => {
          console.log(response.data.data)
          this.users = response.data.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    checkValidation(flag) {
      if (flag === true)
        return 'yes'
      return 'No'
    }
  },
  beforeMount(){
    if (this.$store.state.role !== 'admin') {
      this.$router.push({name: 'dashboard'})
    }
    this.retrieveUsers()
  },
}
</script>

<style scoped>

.container {
  margin-top: 50px;
  font-size: 16px;
}

.table {
  margin-top: 5px;
}

</style>