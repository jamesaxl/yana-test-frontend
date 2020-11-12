<template>

  <div class='container'>

    <b-form @submit="onSubmit" @reset="onReset">
      <b-alert v-if="errorMessage" variant="danger" show>{{ errorMessage }}</b-alert>
      <b-form-group
          id="input-group-1"
          label="Email:"
          label-for="email">
        <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Password:" label-for="password">
        <b-form-input
            id="password"
            type="password"
            v-model="form.password"
            required
            placeholder="Enter password"
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
  name: "Login",
  data() {
    return {
      errorMessage: '',
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()

      this.$store.dispatch('retrieveToken', {
        email: this.form.email,
        password: this.form.password,
      })
      .then(response => {
        console.log(response)
        this.$router.push({name: 'dashboard'})
      })
      .catch(error => {
        console.log(error)
        if (error.response.status === 401)
          this.errorMessage = error.response.data.message
      })
    },
    onReset(evt) {
      evt.preventDefault()
      this.form.email = ''
      this.form.password = ''
    }
  }
}
</script>

<style scoped>

.container {
  margin-top: 100px;
}

</style>