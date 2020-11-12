<template>

  <div id="app" class="container">
    <b-form @submit="onSubmit" @reset="onReset">
      <b-alert v-if="successMessage" variant="success" show>{{ successMessage }}</b-alert>
      <b-alert v-if="errorMessage" variant="danger" show>{{ errorMessage }}</b-alert>
      <b-form-group
          id="input-group-1"
          label="Name:"
          label-for="name">

        <b-form-input
            id="name"
            v-model="form.name"
            type="text"
            placeholder="Enter Product name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-2"
          label="Price:"
          label-for="price">

        <b-form-input
            id="price"
            v-model="form.price"
            type="number"
            placeholder="Enter price"
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-3"
          label="Quantity:"
          label-for="quantity">

        <b-form-input
            id="quantity"
            v-model="form.quantity"
            type="number"
            placeholder="Enter quantity"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Category:" label-for="category">
        <b-form-select
            id="category"
            v-model="form.category"
            :options="categories"
            required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-5" label="Provider:" label-for="provider">
        <b-form-select
            id="category"
            v-model="form.provider"
            :options="providers"
            required
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Cancel</b-button>
    </b-form>
    <br>
    <br>
    <br>

  </div>

</template>

<script>
export default {
  name: "Add",
  data() {
    return {
      successMessage: '',
      errorMessage: '',
      form: {
        name: '',
        price: '',
        quantity: '',
        category: null,
        provider: null,
        logo: null,
      },
      categories: [{ text: 'Select One', value: null }],
      providers: [{ text: 'Select One', value: null }],
    }
  },
  methods: {
    manageMessage(errorMessage = '', successMessage = '') {
      this.successMessage = successMessage
      this.errorMessage = errorMessage
    },
    onSubmit(evt) {
      evt.preventDefault()

      let data = {id: this.$route.params.id}
      if (this.form.name !== '')
        data['name'] = this.form.name

      if (this.form.quantity !== '')
        data['quantity'] = this.form.quantity

      if (this.form.price !== '')
        data['price'] = this.form.price

      if (this.form.category !== null)
        data['category_id'] = this.form.category

      if (this.form.provider !== null)
        data['provider_id'] = this.form.provider

      this.$store.dispatch('updateProduct', data )
        .then(response => {
          console.log(response.data)

          let data = response.data.data

          this.form.name = data.name
          this.form.quantity = data.quantity
          this.form.price = data.price
          this.form.category = data.category.id
          this.form.provider = data.provider.id

          this.manageMessage('', response.data.message)
        })
        .catch(error => {
          console.log(error)
          this.successMessage = ''
          if (error.response.status === 422 || error.response.status === 400)
            this.manageMessage(error.response.data.message, '')
        })

    },
    onReset(evt) {
      evt.preventDefault()
      this.$router.push({ name: 'product-list' })
    },
    retrieveCategories() {
      this.$store.dispatch('retrieveCategories')
        .then(response => {
          console.log(response.data.data.data)
          let data = response.data.data.data
          data.forEach(element => this.categories.push({text: element.name, value: element.id}));
        })
        .catch(error => {
          console.log(error.response.data)
        })
    },
    retrieveProviders() {
      this.$store.dispatch('retrieveProviders')
        .then(response => {
          console.log(response.data.data.data)

          let data = response.data.data.data
          data.forEach(element => this.providers.push(
            {text: element.name, value: element.id}
            )
          );
        })
        .catch(error => {
          console.log(error.response.data)
        })
    },
    retrieveProduct() {
      this.$store.dispatch('retrieveProduct', this.$route.params.id )
        .then(response => {
          console.log(response.data)
          let data = response.data.data
          this.form.name = data.name
          this.form.price = data.price
          this.form.quantity = data.quantity
          this.form.category = data.category_id
          this.form.provider = data.provider_id
        })
        .catch(error => {
          console.log(error.response.data)
          if (error.response.status === 400)
            this.$router.push({ name: 'product-list' })
        })
    }
  },
  beforeMount() {
    this.retrieveCategories()
    this.retrieveProviders()
    this.retrieveProduct()
  }
}
</script>

<style scoped>

.container {
  margin-top: 35px;
}

</style>