<template>

  <div class="container">
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
            required
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
            required
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
            required
            placeholder="Enter quantity"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Category:" label-for="category">
        <b-form-select
            id="category"
            v-model="form.categoryId"
            :options="categories"
            required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-4" label="Provider:" label-for="provider">
        <b-form-select
            id="category"
            v-model="form.providerId"
            :options="providers"
            required
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
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
        categoryId: null,
        providerId: null,
        logo: null,
      },
      categories: [{ text: 'Select One', value: null }],
      providers: [{ text: 'Select One', value: null }],
    }
  },
  methods: {
    manageMessage(errorMessage, successMessage){
      this.successMessage = successMessage
      this.errorMessage = errorMessage
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
    onSubmit(evt) {
      evt.preventDefault()

      this.$store.dispatch('addProduct', {
        name: this.form.name,
        price: this.form.price,
        quantity: this.form.quantity,
        category_id: this.form.categoryId,
        provider_id: this.form.providerId,
      })
        .then(response => {
          console.log(response.data)
          this.manageMessage('', response.data.message)
          this.clearField()
        })
        .catch(error => {
          console.log(error.response)
          if (error.response.status === 400 || error.response.status === 422)
            this.manageMessage(error.response.data.message, '')
        })
    },
    onReset(evt) {
      evt.preventDefault()
      this.clearField()
    },
    clearField() {
      this.form.name = ''
      this.form.price = ''
      this.form.quantity = '',
      this.form.categoryId = null
      this.form.providerId = null
    }
  }, beforeMount() {
    this.retrieveCategories()
    this.retrieveProviders()
  },
}
</script>

<style scoped>
.container {
  margin-top: 50px;
  font-size: 16px;
}
</style>