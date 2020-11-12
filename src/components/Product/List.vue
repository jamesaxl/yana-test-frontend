<template>

  <div class="container">
    <h3>Products</h3>
    <div>
      <b-button squared @click="$router.push({name: 'product-add'})">+</b-button>
      <b-table striped hover :items="products" :fields="fields">
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
      products: [],
      fields: [
        {
          key: 'id',
          sortable: true
        },
        {
          key: 'name',
          sortable: true
        },
        {
          key: 'quantity',
          sortable: true
        },
        {
          key: 'price',
          sortable: true
        },
        {
          key: 'category.name',
          label: 'Category',
        },
        {
          key: 'provider.name',
          label: 'Provider',
        },
        {
          key: 'add_by.email',
          label: 'Add by',
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
      this.$router.push('/product/edit/' + item.id)
    },
    deleteUser(item){
      this.$store.dispatch('deleteProduct', item.id )
        .then(response => {
          console.log(response.data)
          this.retrieveProducts()

        })
        .catch(error => {
          console.log(error)
        })
    },
    retrieveProducts() {
      this.$store.dispatch('retrieveProducts')
        .then(response => {
          console.log(response.data.data.data)

          this.products = response.data.data.data
          //this.successMessage = 'response.data.message'
          // this.loading = false
          // this.$router.push({ name: 'dashboard' })
        })
        .catch(error => {
          // this.loading = false
          // this.serverError = error.response.data
          console.log(error.response.data)
          this.serverError = error.response.data
        })
    }
  },
  beforeMount() {
    this.retrieveProducts()
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