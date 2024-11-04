<script>
import permissionsService from '../../services/permissionsService';
import rolesServices from '../../services/rolesServices';
import Swal from 'sweetalert2'
export default {
    data () {
        return {
            rol: {
                name: '',
                description: '',
                permissions: []
            },
            errors: {
                vName: '',
                vDescription: ''
            },            
            permissions: [],
        }
    },
    mounted() {
        this.getAllPermissions()
    },
    methods: {
        insertRol () {
            rolesServices.insert(this.rol)
            .then(res => {
                this.alertSuccess()
            }).catch(err => console.log(err))
        },        
        getAllPermissions () {
            permissionsService.all()
            .then(res => {
                this.permissions = res.Permission               
            })            
        },
        alertSuccess(){
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
                title: 'Rol Creado con exito',
                icon: 'success'
            },)
        },
        listPermissions (id) {
            let list = []  
            if (this.rol.permissions.includes(id)){
                list = this.rol.permissions.filter(el => el != id)
                this.rol.permissions = list.sort()
            } else {
                this.rol.permissions.push(id)
                list = this.rol.permissions
                this.rol.permissions = list.sort()
            }            
        }
    },
    computed: {        
        displayPermissions() {
            return this.permissions
        }
    }
}
</script>
<template>
    <div class="modal fade" id="modal-newRol"  tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Nuevo Rol</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="input-group has-validation mx-auto">
                            <div :class="errors.vName != '' ? 'form-floating form-group is-invalid' : 'form-floating form-group'">
                                <input type="text" v-model="rol.name" :class="errors.vName != '' ? 'form-control is-invalid' : 'form-control '" id="name" placeholder="name">
                                <label for="floatingInput">Nombre</label>                                                                  
                            </div>
                            <div class="invalid-feedback">
                                {{errors.vName != '' ? errors.vName : '' }}
                            </div>
                        </div>
                        <div class="input-group has-validation mx-auto">
                            <div :class="errors.vDescription != '' ? 'form-floating form-group is-invalid' : 'form-floating form-group'">
                                <textarea v-model="rol.description" :class="errors.vDescription != '' ? 'form-control is-invalid' : 'form-control '" id="name" placeholder="name" rows="4"></textarea>
                                <label for="floatingInput">Descripcion</label>                                                              
                            </div>
                            <div class="invalid-feedback">
                                {{errors.vDescription != '' ? errors.vDescription : '' }}
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h3>Lista de Permisos</h3>
                        <ul class="list-group">
                            <li v-for="(item, index) in displayPermissions" class="cursor-pointer list-group-item list-group-item-action">
                                <div  class="form-check form-switch cursor-pointer" >
                                    <input class="form-check-input cursor-pointer" type="checkbox" @change="listPermissions(item.id)" role="switch" :id="index">
                                    <label class="form-check-label cursor-pointer" :for="index">{{ item.permission }}</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" @click="insertRol">Guardar</button>
            </div>
            </div>
        </div>
    </div>
    
</template>
<style>
.cursor-pointer {
    cursor: pointer;
}
</style>