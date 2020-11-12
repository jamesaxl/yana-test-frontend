<template>

  <div class="container">
    <h3>Edit category</h3>
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
            placeholder="Enter category name"
        ></b-form-input>
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
  name: "Edit",
  data() {
    return {
      successMessage: '',
      errorMessage: '',
      form: {
        name: '',
      },
    }
  },
  methods: {
    manageMessage(errorMessage, successMessage) {
      this.successMessage = successMessage
      this.errorMessage = errorMessage
    },
    onSubmit(evt) {
      evt.preventDefault()

      this.$store.dispatch('updateCategory', {id: this.$route.params.id, name: this.form.name} )
        .then(response => {
          console.log(response.data)
          let data = response.data.data
          this.form.name = data.name
          this.manageMessage('', response.data.message)
        })
        .catch(error => {
          console.log(error)
          this.manageMessage(error.response.data.message, '')
        })
    },
    onReset(evt) {
      evt.preventDefault()
      this.$router.push({name: 'category-list'})
    },
    retrieveCategory(){
      this.$store.dispatch('retrieveCategory', this.$route.params.id )
        .then(response => {
          console.log(response.data)
          let data = response.data.data
          this.form.name = data.name
        })
        .catch(error => {
          console.log(error.response.data)
          if (error.response.status === 400)
            this.$router.push({ name: 'category-list' })
        })
    }
  }, beforeMount() {
    this.retrieveCategory()
  }
}
</script>

<style scoped>
.container {
  margin-top: 50px;
  font-size: 16px;
}
</style>