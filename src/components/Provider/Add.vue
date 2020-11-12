<template>

  <div class="container">
    <h3>Add provider</h3>
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
      <b-button type="reset" variant="danger">Reset</b-button>
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

      this.$store.dispatch('addProvider', this.form)
          .then(response => {
            console.log(response.data)
            this.manageMessage('', response.data.message)
            this.clearField()
          })
          .catch(error => {
            console.log(error)
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
      this.form.email = ''
      this.form.phone = ''
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 50px;
  font-size: 16px;
}
</style>