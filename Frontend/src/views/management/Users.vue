<script>
import usersService from '../../services/usersService';
import NewUser from '../../components/management/NewUser.vue';
import ResetPassword from '../../components/management/ResetPassword.vue';
import Credentials from '../../components/management/Credentials.vue';
import Swal from 'sweetalert2'
import EditUser from '../../components/management/EditUser.vue';

export default {
    data () {
        return {
            users: [],
            page: 1,
            perPage: 10,
            pages: [],
            userSelected: 0,
            user :{
                name: '',
                lastName: '',
                code: '',
                photo: null,                
                idRol: '',
                password: '',
                confirmPassword: ''
            },
        }
    },
    created (){
        this.allUsers()
        
    },
    components: {NewUser,EditUser, ResetPassword, Credentials},
    methods: {
        setPages () {
            let numberOfPages = Math.ceil(this.users.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        },
        paginate (users) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return  users.slice(from, to);
        },
        allUsers() {
            usersService.all()
            .then(res => {
                this.users = res.users                
            })
            
            this.page = 1;
            this.pages = [];
        },
        editUser(user) {
            this.user = user
        },
        deleteUser (id) {
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
                    usersService.delete(id)
                    .then(res => {
                        this.allUsers()
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
        },
        userSelectId(id) {
            this.userSelected = id
        }
    },
    watch: {
        users () {
            this.setPages();
        },
        allUsers () {
            this.setPages();
        }
    },
    computed: {
        displayedUsers () {
            return this.paginate(this.users);
        }
    }
}
</script>
<template>
    <div class="container-fluid">
        <nav class="m-4" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                <li class="breadcrumb-item"><a href="#">Administración</a></li>
                <li class="breadcrumb-item active" aria-current="page">Users</li>
            </ol>
        </nav>
        <h3>Administración de Usuarios</h3>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Nuevo Usuario</button>
        <table class="table table-dark table-hover">
           <thead>
            <tr>
                <th>Nombre completo</th>
                <th>Rol</th>
                <th>Code</th>
                <th>Opciones</th>
            </tr>
           </thead>
           <tbody>
                <tr v-for="item in displayedUsers">
                    <td>{{ item.name}} {{item.lastName }}</td>
                    <td>{{ item.rol }}</td>
                    <td>{{ item.code }}</td>
                    <td>
                        <a class="ps-2" v-toolTips='"Credencial"' href="#" @click="editUser(item)" data-bs-toggle="modal" data-bs-target="#modal-credential"><fa icon="address-card" size="xl" /></a>
                        <a class="ps-2" v-toolTips='"Editar"' href="#" @click="editUser(item)" data-bs-toggle="modal" data-bs-target="#modal-edit" data-bs-title="Default tooltip"><fa icon="user-pen" size="xl" /></a>
                        <a class="ps-2" v-toolTips='"Reset Contraseña"' data-bs-toggle="modal" data-bs-target="#modal-password" @click="userSelectId(item.id)" href="#"><fa icon="key" size="xl" /></a>
                        <a class="ps-2" v-toolTips='"Eliminar"' @click="deleteUser(item.id)" href="#"><fa icon="trash-can" size="xl" /></a>
                    </td>
                </tr>
           </tbody> 
        </table>
        <nav aria-label="Page navigation ">
            <ul class="pagination">
                <li class="page-item" v-if="page != 1" @click="page--"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item" v-for="pageNumber in pages.slice(page-1, page+5)" @click="page = pageNumber"><a class="page-link" href="#">{{pageNumber}}</a></li>
                <li class="page-item" @click="page++" v-if="page < pages.length" ><a class="page-link" href="#">Next</a></li>
            </ul>
        </nav>
        <ResetPassword :idUser="userSelected"/>
        <NewUser @close-form="allUsers()"/>
        <EditUser @close-form="allUsers()" :user="user"/>
        <Credentials :user="user"/>
    </div>
</template>