<template>
    <div class="container-fluid">
        <nav class="m-4" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">Dashboard</li>
                <li class="breadcrumb-item">Administración</li>
                <li class="breadcrumb-item active" aria-current="page">Roles</li>
            </ol>
        </nav>
        <h3>Administración de Roles</h3>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-newRol" data-bs-whatever="@mdo">Nuevo Rol</button>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Opciones</th>
                </tr>
           </thead>
           <tbody>
            <tr v-for="item in displayRoles">
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td>
                    <a class="ps-2" v-toolTips='"Editar"' href="#" @click="" data-bs-toggle="modal" data-bs-target="#modal-edit" data-bs-title="Default tooltip"><fa icon="pen" size="xl" /></a>
                    <a class="ps-2" v-toolTips='"Eliminar"' @click="deleteRol(item.id)" href="#"><fa icon="trash-can" size="xl" /></a>
                </td>
            </tr>
           </tbody>
        </table>
        <NewRol/>
    </div>
</template>
<script>
import rolesServices from '../../services/rolesServices';
import NewRol from '../../components/management/NewRol.vue';
import Swal from 'sweetalert2'
export default {
    data () {
        return {
            roles: [],
        }
    },
    components: {NewRol},
    created() {
        this.getAllRoles()
    }, 
    methods: {
        getAllRoles () {
            rolesServices.all()
            .then(res => {
                this.roles = res.roles
            })
        },
        deleteRol (id) {
            Swal.fire({
                title: "Esta seguro?",
                text: "Esta acción no se puede revertir",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, Eliminar!"
                }).then((result) => {
                if (result.isConfirmed) {                   
                    
                    rolesServices.delete(id)
                    .then(res => {
                        this.getAllRoles()
                    })
                    const Toast = Swal.mixin({
                        toast:true,
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
                    title: "El resgistro ha sido eliminado",
                    icon: "success"
                    });
                }
            });
        }
    },
    computed: {
        displayRoles() {
            return this.roles
        }
    }
}
</script>