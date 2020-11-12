<template>

  <div id="app" class="container">
    <h3>Edit provider</h3>
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
            placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Email:" label-for="email">
        <b-form-input
            id="first_name"
            type="email"
            v-model="form.email"
            required
            placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Phone:" label-for="phone">
        <b-form-input
            id="phone"
            type="text"
            v-model="form.phone"
            required
            placeholder="Enter phone"
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
  name: "Add",
  data() {
    return {
      successMessage: '',
      errorMessage: '',
      form: {
        name: '',
        email: '',
        phone: '',
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

      let data = {id: this.$route.params.id}
      if (this.form.name !== '')
        data['name'] = this.form.name

      if (this.form.email !== '')
        data['email'] = this.form.email

      if (this.form.phone !== '')
        data['phone'] = this.form.phone

      this.$store.dispatch('updateProvider', data )
        .then(response => {
          console.log(response.data)

          let data = response.data.data
          this.form.name = data.name
          this.form.email = data.email
          this.form.phone = data.phone
          this.manageMessage('', response.data.message)
        })
        .catch(error => {
          console.log(error)
          this.manageMessage(error.response.data.message, '')
        })
    },
    onReset(evt) {
      evt.preventDefault()
      this.$router.push({name: 'provider-list'})
    },
    retrieveProvider() {
      this.$store.dispatch('retrieveProvider', this.$route.params.id )
          .then(response => {
            console.log(response.data)
            let data = response.data.data
            this.form.name = data.name
            this.form.email = data.email
            this.form.phone = data.phone
          })
          .catch(error => {
            console.log(error.response.data)
            if (error.response.status === 400)
              this.$router.push({ name: 'provider-list' })
          })
    }
  },
  beforeMount() {
    this.retrieveProvider()
  }
}
</script>

<style scoped>
.container {
  margin-top: 50px;
  font-size: 16px;
}
</style>