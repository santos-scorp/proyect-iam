<script>

import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
import Swal from 'sweetalert2'
import usersService from '../services/usersService';
import configService from '../services/config';
export default {
  components: { QrcodeStream },
  name: 'DoorChecker',
  data() {
    return {
      paused: false,
      result: '',
      urlImage: configService.urlStatic+ "/images/profiles/",
      showScanConfirmation: false,
      password: null,
      showPassword: false,
      user: {
        code: '',
        password: ''
      },
      vUser: {
        password:''
      }
    }
  },

  methods: {
    startFrontCamera () {
    this.facingMode = 'user'
    
  },
    onCameraOn() {
      this.showScanConfirmation = false
    },

    onCameraOff() {
      this.showScanConfirmation = true
    },

    onError: console.error,

    async onDetect(detectedCodes) {
      
      usersService.checkCodeDoor(detectedCodes[0].rawValue).then(async (res) => {
        console.log(res);
        
        this.result = res.user
        await this.timeout(3000)
        this.result = ''
        
      }).catch(err => {
        this.alertDenied()
      })
      await this.timeout(500)
      this.paused = false
    },
    alertSuccess(){
        const Toast = Swal.mixin({
            toast:true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        })
        Toast.fire({
            title: 'Acceso Autorizado',
            html: `
            
            `,
            icon: 'success'
        },)
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
            text: 'No cuenta con los permisos necesarios',
            icon: 'error'
        },)
    },
    alertInvalid(){
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
    timeout(ms) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms)
      })
    },
    setFieldErrors(errors) {
        Object.keys(this.vUser).forEach(field => this.vUser[field] = null);            
        errors.forEach(err => {            
            const {path, msg} = err
            if (this.vUser[path] !== undefined) {                    
                this.vUser[path] = msg
            }
        })            
    },
    resetValues() {
      this.paused= false
      this.result= ''
      this.showScanConfirmation= false
      this.password= null
      this.showPassword= false
      this.user= {
        code: '',
        password: ''
      }
      this.vUser= {
        password:''
      }
    }
  }
}
</script>

<template>
   <div class="d-flex flex-column min-vh-100">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid ">
              <a class="navbar-brand" href="#">
                  <img src="../assets/images/upy.png" alt="Bootstrap" width="100px" >
                  <span class="brand-text ms-4 text-upy">Control de Entrada</span>
              </a>
          </div>
      </nav>
      <main class="flex-grow-1 align-items-center">
        <div class="m-2" v-if="!result">
            <qrcode-stream
            :constraints="{ facingMode }"
            :paused="paused"
            @detect="onDetect"
            @camera-on="onCameraOn"
            @camera-off="onCameraOff"
            @error="onError"
          />
        </div>
        <div v-if="result" class="text-center d-block">
          <div>
            <h4 class="text-white">Bienvenido</h4>
            <h5 class="text-white">Acceso Registrado</h5>
            <img :src="urlImage + result.photo" alt="" width="250px">
          </div>
          <div class="text-white mt-3"><h6>{{ result.name }} {{ result.lastName }}</h6></div>
          <div class="text-white"><h6>{{ result.rol }}</h6></div>
        </div>
      </main>
      <!-- Footer -->
    <footer class="bg-secondary text-white text-center py-2 mt-auto">
      <p class="mb-0">© 2024 By Pedro Ernesto Santos Diaz</p>
    </footer>
  </div>
</template>
<style scoped>

main {
  padding: 20px;
  background-color: #4d267f;
}
.text-upy {
    color:#4d267f;
    font-weight:700;
}
</style>