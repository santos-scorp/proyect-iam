<script></script>
<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Santos IAM</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item"><router-link class="nav-link active" aria-current="page" to="/dashboard">Dashboard</router-link></li>
                <li class="nav-item"><router-link class="nav-link active" aria-current="page" to="/registers">Registros</router-link></li>
                <li class="nav-item"><router-link class="nav-link active" aria-current="page" to="/management">Administracion</router-link></li>
            </ul>
        </div>
    </div>
  </nav>
  <main class="container-fluid">
    <router-view></router-view>
  </main>
</template>