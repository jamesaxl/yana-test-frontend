<template>

  <div class="container">
    <h3>Add user</h3>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-alert v-if="successMessage" variant="success" show>{{ successMessage }}</b-alert>
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

      <b-form-group id="input-group-2" label="First name:" label-for="first_name">
        <b-form-input
            id="first_name"
            v-model="form.firstName"
            required
            placeholder="Enter first name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Last name:" label-for="last_name">
        <b-form-input
            id="last_name"
            v-model="form.lastName"
            required
            placeholder="Enter last name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Role:" label-for="role">
        <b-form-select
            id="role"
            v-model="form.roleId"
            :options="roles"
            required
        ></b-form-select>
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

      <b-form-group id="input-group-6" label="Re-Password:" label-for="re_password">
        <b-form-input
            id="re_password"
            type="password"
            v-model="form.rePassword"
            required
            placeholder="Re-Enter password"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Is enabled:" label-for="is_enabled">
        <b-form-select
            id="is_enabled"
            v-model="form.isEnabled"
            :options="isEnabledOptions"
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
        email: '',
        firstName: '',
        lastName: '',
        roleId: null,
        password: '',
        rePassword: '',
        isEnabled: false
      },
      roles: [
        { text: 'Select One', value: null },
      ],
      isEnabledOptions: [
        { text: 'Not enabled', value: false },
        { text: 'Enabled', value: true }
      ]
    }
  },
  methods: {
    manageMessage(errorMessage, successMessage){
      this.successMessage = successMessage
      this.errorMessage = errorMessage
    },
    onSubmit(evt) {
      evt.preventDefault()
      this.$store.dispatch('addUser', {
        first_name : this.form.firstName,
        last_name : this.form.lastName,
        email : this.form.email,
        password : this.form.password,
        password_confirmation : this.form.rePassword,
        role_id: this.form.roleId,
        is_enabled: this.form.isEnabled,
      })
      .then(response => {
        console.log(response)
        this.manageMessage('', response.data.message)
        this.clearField()
      })
      .catch(error => {
        console.log(error.response.data)
        if (error.response.status === 400 || error.response.status === 422)
          this.manageMessage(error.response.data.message, '')
      })
    },
    onReset(evt) {
      evt.preventDefault()
      this.clearField()
    },
    clearField() {
      this.form.email = ''
      this.form.firstName = ''
      this.form.lastName = ''
      this.form.role = null
      this.form.password = ''
      this.form.rePassword = ''
    },
    retrieveRoles() {
      this.$store.dispatch('retrieveRoles' )
        .then(response => {
          console.log(response.data)
          let data = response.data.data
          data.forEach(element => this.roles.push({text: element.name, value: element.id}));
        })
        .catch(error => {
          console.log(error.response.data)
        })
    },
  },
  beforeMount() {
    this.retrieveRoles()
    if (this.$store.state.role !== 'admin') {
      this.$router.push({name: 'dashboard'})
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 50px;
  font-size: 12px;
}
</style>