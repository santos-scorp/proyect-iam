<template>
    <div class="container-fluid p-0 m-0 text-start">
        <div class="row">
            <div class="col-md-3 col-xl-2  p-0 m-0 mt-4">
                <ul class="list-group navbar-nav">
                    <li class="list-group-item nav-item">
                        <router-link class="nav-link active" aria-current="page" to="/users">
                            <fa icon="users" size="xl" />
                            <span class="ms-4">Usuarios</span>
                        </router-link>
                    </li>
                    <li class="list-group-item">
                        <router-link class="nav-link active" aria-current="page" to="/roles">
                            <fa icon="user-tag" size="xl" />
                            <span class="ms-4">Roles</span>
                        </router-link>
                    </li>
                    <!--<li class="list-group-item">
                        <router-link class="nav-link active" aria-current="page" to="/permissions">
                            <fa icon="check-double" size="xl"  />
                            <span class="ms-4">Permisos</span>
                        </router-link>
                    </li>-->
                </ul>
            </div>
            <div class="col">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>