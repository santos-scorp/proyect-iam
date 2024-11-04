<template>
    <div class="d-flex flex-column min-vh-100">
    <!-- Header -->
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid ">
            <a class="navbar-brand" href="#">
                <img src="../assets/images/upy.png" alt="Bootstrap" width="100px" >
                <span class="brand-text ms-4 text-upy">Control Y Manejo de Identidades</span>
            </a>
        </div>
    </nav>
  <!-- Contenido Principal -->
    <main class="flex-grow-1 d-flex align-items-center justify-content-center">
        <div class="login card p-4" style="width: 300px;">
            <h4 class="text-center text-upy">Inicio de Sesion</h4>
            <div class="input-group mb-3 has-validation">
                <div :class=" vUser.code ? 'form-floating form-group is-invalid' : 'form-floating form-group'">
                    <input v-model="user.code" type="text" :class="vUser.code ? 'form-control is-invalid' : 'form-control '" id="input-code" placeholder="code">
                    <label for="input-code text-upy">Codigo</label>
                </div>
                <div v-if="vUser.code" class="invalid-feedback">{{ vUser.code }}</div>
            </div>
            <div class="form-group mb-3">
                <div :class=" vUser.code ? 'form-floating form-group is-invalid' : 'form-floating form-group'">
                    <input v-model="user.password" type="password":class="vUser.password ? 'form-control is-invalid' : 'form-control '" id="input-password" placeholder="Password">
                    <label for="input-password text-upy">Contraseña</label>
                </div>
                <div v-if="vUser.password" class="invalid-feedback">{{ vUser.password }}</div>
            </div>
            <button type="button" @click="loginUser" class="btn btn-success mx-auto d-block mt-2">Iniciar Sesión</button>
        </div>
    </main>

  <!-- Footer -->
  <footer class="bg-secondary text-white text-center py-2 mt-auto">
    <p class="mb-0">© 2024 By Pedro Ernesto Santos Diaz</p>
  </footer>
    </div>
</template>

<script>
import usersService from '../services/usersService';
import { TokenService } from '../services/tokenService';
import { SessionService } from '../services/sessionService';
import Swal from 'sweetalert2'

export default {
    name: 'Login',
    data() {
        return {
            user: {
                code:'',
                password: ''
            },
            vUser: {
                code: '',
                password: ''
            },
            loading: false,         
        }
    },
    methods: {
        loginUser () {            
            this.loading = true
            usersService.login(this.user)
            .then(res => {
                TokenService.set(res.token)
                SessionService.set(res.user)
                if (res.token) {
                    this.$router.push({ name: 'dashboard'})
                }
            })
            .catch(err => {   
                if (err.response.data.errors)  {                                               
                    this.setFieldErrors(err.response.data.errors)
                } else {
                    this.alertDenied()
                }
            })
            
            this.loading = false
        },
        alertDenied(){
            const Toast = Swal.mixin({
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            })
            Toast.fire({
                title: 'Acceso Denegado',
                text: 'Usuario o contraseña invalidos',
                icon: 'error'
            },)
        },
        setFieldErrors(errors) {
           Object.keys(this.vUser).forEach(field => this.vUser[field] = null);            
           errors.forEach(err => {            
                const {path, msg} = err
                if (this.vUser[path] !== undefined) {                    
                    this.vUser[path] = msg
                }
            })            
        }
    }
}
</script>
<style scoped>

main {
  padding: 20px;
  background-color: #4d267f;
}

.login {
    width: 400px;
    border: 1px solid #6b6b6b;
    padding: 60px;
    background-color: rgba(255, 255, 255, 0.8); /* Fondo blanco con 80% de opacidad */
    border-radius: 8px; /* Bordes redondeados */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para mayor contraste */
    width: 300px;
}
.login h3 {
    color: #4d267f;
}

.text-upy {
    color:#4d267f;
    font-weight:700;
}
</style>