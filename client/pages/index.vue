<template>
  <div class="container-fluid">
    <div class="row no-gutter">
      <!-- The image half -->
      <div class="col-md-6 d-none d-md-flex bg-image"></div>

      <!-- The content half -->
      <div class="col-md-6 bg-light">
        <div class="login d-flex align-items-center py-5">
          <!-- Demo content-->
          <div class="container">
            <div class="row">
              <div class="col-lg-10 col-xl-7 mx-auto">
                <h3 class="display-4">Inicio de sesión</h3>
                <p class="text-muted mb-4">Proyecto de replicación</p>
                <form @submit.prevent="sendCredentials">
                  <div class="form-group mb-3">
                    <input
                      v-model="inputEmail"
                      placeholder="Email address"
                      required=""
                      autofocus=""
                      class="form-control rounded-pill border-0 shadow-sm px-4"
                    />
                  </div>
                  <div class="form-group mb-3">
                    <input
                      v-model="inputPassword"
                      type="password"
                      placeholder="Password"
                      required=""
                      class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                    />
                  </div>
                  <div class="custom-control custom-checkbox mb-3">
                    <input
                      id="customCheck1"
                      type="checkbox"
                      checked
                      class="custom-control-input"
                    />
                    <label for="customCheck1" class="custom-control-label"
                      >Remember password</label
                    >
                  </div>
                  <button
                    type="submit"
                    class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm font-weight-bold"
                  >
                    Sign in
                  </button>
                  <div class="text-center d-flex justify-content-between mt-4">
                    <p>
                      Don´t have a account?
                      <a href="/register-user" class="font-italic text-muted">
                        <u>Create user</u></a
                      >
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <!-- End -->
        </div>
      </div>
      <!-- End -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.use(VueSweetalert2)
export default {
  data() {
    return {
      inputEmail: '',
      inputPassword: '',
    }
  },
  methods: {
    async sendCredentials() {
      let response = await axios({
        url: '/api/auth/login',
        method: 'post',
        baseURL: process.env.baseURL,
        data: {
          email: this.inputEmail,
          password: this.inputPassword,
        },
      })
      if (response.data.success) {
        this.$swal({
          title: 'Inicio de sessión correctamente',
          icon: 'success',
        })
        document.cookie = `express:sess=${response.data.jwt}`
        await this.$router.push('/empresa/dashboard')
      } else {
        this.$swal({
          title: 'Credenciales incorrectas',
          icon: 'error',
        })
      }
    },
  },
}
</script>

<style>
.login,
.image {
  min-height: 100vh;
}

.bg-image {
  background-image: url('https://res.cloudinary.com/mhmd/image/upload/v1555917661/art-colorful-contemporary-2047905_dxtao7.jpg');
  background-size: cover;
  background-position: center center;
}
</style>
