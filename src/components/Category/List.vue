<template>
  <div class="container">
    <h3>Categories</h3>
    <div>
      <b-button squared @click="$router.push({name: 'category-add'})">+</b-button>
      <b-table striped hover :items="categories" :fields="fields">
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
      categories: [],
      fields: [
        {
          key: 'name',
          sortable: true
        },
        {
          key: 'add_by.email',
          label: 'Created by',
        },
        {
          key: 'created_at',
          label: 'Created at',
        },
        { key: 'actions', label: 'Actions' }
      ],
    }
  },
  methods: {
    editPage(item) {
      this.$router.push('/category/edit/' + item.id)
    },
    deleteUser(item){
      this.$store.dispatch('deleteCategory', item.id )
          .then(response => {
            console.log(response.data)
            this.retrieveCategories()

          })
          .catch(error => {
            console.log(error)
          })
    },
    retrieveCategories() {
      this.$store.dispatch('retrieveCategories' )
        .then(response => {
          console.log(response.data.data)
          this.categories = response.data.data.data
        })
        .catch(error => {
          console.log(error.response.data)
        })
    }
  },
  beforeMount() {
    this.retrieveCategories()
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