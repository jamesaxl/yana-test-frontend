<template>

  <div class="container">
    <h3>Providers</h3>
    <div>
      <b-button squared @click="$router.push({name: 'provider-add'})">+</b-button>
      <b-table striped hover :items="providers" :fields="fields">
        <template #cell(created_at)="row">
          {{  row.item.created_at | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}
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
      providers: [],
      fields: [
        {
          key: 'name',
          sortable: true
        },
        {
          key: 'email',
          sortable: false
        },
        {
          key: 'phone',
          sortable: false
        },
        {
          key: 'add_by.email',
          label: 'Created by',
        },
        {
          key: 'created_at',
        },
        { key: 'actions', label: 'Actions' }
      ],
    }
  },
  methods: {
    editPage(item) {
      this.$router.push('/provider/edit/' + item.id)
    },
    deleteUser(item){
      this.$store.dispatch('deleteProvider', item.id )
        .then(response => {
          console.log(response.data)
          this.retrieveProviders()

        })
        .catch(error => {
          console.log(error)
        })
    },
    retrieveProviders() {
      this.$store.dispatch('retrieveProviders')
        .then(response => {
          console.log(response.data.data.data)
          this.providers = response.data.data.data
        })
        .catch(error => {
          console.log(error.response.data)
          this.serverError = error.response.data
        })
    },
  },
  beforeMount () {
    this.retrieveProviders()
  }
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