<script>
import { SessionService } from '../services/sessionService';
import { hasPermissions } from '../utils/hasPermissions';
export default {
  data () {
    return {
      userPermissions: [3],
      requiredPermissions: [1,2],
      user: []
    }
  },
  mounted() {
    this.getPermissions()
  },
  methods: {
    logout() {
      SessionService.remove()
    },
    getPermissions() {
      this.user = SessionService.get()    
    },

  }
}
</script>
<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Santos IAM</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class=" collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item" v-if="user.rol == 'Monitor' || user.rol == 'Administrador'"><router-link class="nav-link active" aria-current="page" to="/registers">Registros</router-link></li>
                <li class="nav-item" v-if="user.rol == 'Administrador'"><router-link class="nav-link active" aria-current="page" to="/management">Administración</router-link></li>
                <li class="nav-item" v-if="user.rol == 'Monitor' || user.rol == 'Administrador'"><router-link class="nav-link active" aria-current="page" to="/monitoreo">Monitoreo</router-link></li>
            </ul>
            <div class="d-flex">
              <span>{{ user.name }} {{ user.lastName }}</span>
            </div>
            <div class="d-flex">              
              <a class="btn" @click="logout" href="#">Cerrar Sesión</a>
            </div>
        </div>
    </div>
  </nav>
  <main class="container-fluid">
    <router-view></router-view>
  </main>
</template>
<style scoped>
.navbar {
  background-color: #4d267f !important;
  color: white !important;
}

.navbar-brand, .navbar-nav , .nav-link, .btn{
  color: white !important;
}

</style>