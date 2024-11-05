<script>
import rolesServices from '../../services/rolesServices'
import configService from '../../services/config';
import usersService from '../../services/usersService';
import Swal from 'sweetalert2'
import { SessionService } from '../../services/sessionService';
export default {
    name: 'EditUser',    
    props:['user'],
    data () {
        return {
            urlImage: configService.urlStatic+ "/images/profiles/",
            uploadImage: null,
            cropImg: '',
            data: null,
            roles:[],
            permissions: [],
            codeCheck: {user :''},
            image: false,
            errors: {
                vName: '',
                vLastName: '',
                vIdRol: '',
                vCode: '',
                vPassword: '',
                vConfirmPassword: ''

            }
        }
    },
    mounted() {
        this.chargeLists()
    },
    emits:['close-form'],
    setup(props, {emit}) {
        const close = (event) => {
            emit('close-form')
        }
        return {
            close
        }
    },    
    methods: {
        insertUser() {
            this.user.idAcceso = 6
            let u = SessionService.get()
            this.user.idUser = u.id
            usersService.update(this.user)
            .then(res => {                                   
                if (this.image != null){
                    usersService.uploadProfile(this.image, this.user.code).then(res => console.log(res));
                }                
                this.resetInfo()
                this.alertSuccess()

            }).catch(err => {
                this.validateErrors(err.response.data.errors)
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
                title: 'Usuario actualizado con exito',
                icon: 'success'
            },)
        },
        chargeLists () {
            rolesServices.all()
            .then(res => {
                this.roles = res.roles;
            })
            
            
        },
        validateErrors(errors) {
            this.errors = {
                vName: '',
                vLastName: '',
                vIdRol: '',
                vCode: '',
                vPassword: '',
                vConfirmPassword: ''
            }
            errors.forEach((el, i) => {                
                switch (el.path) {
                    case 'name':
                        this.errors.vName = el.msg
                        break;
                    case 'lastName':
                        this.errors.vLastName = el.msg
                        break;
                    case 'idRol':
                        this.errors.vIdRol = el.msg
                        break;
                    case 'code':
                        this.errors.vCode = el.msg
                        break;
                    case 'password':
                        this.errors.vPassword = el.msg
                        break;
                    case 'confirmPassword':
                        this.errors.vConfirmPassword = el.msg
                        break;
                    
                    default:
                        break;
                }
            });
        },
        searchFile(e){
            this.image = true;
            let file = e.target.files[0];
            const allowedTypes = ["image/jpg","image/jpeg","image/png","image/gif"];
            if (allowedTypes.includes(file.type)){
                this.uploadImage = file;
                this.urlImage = URL.createObjectURL(file)               
            }
        },
        resetInfo() {
            this.image = false;
            this.$refs.imgPhoto.value= null;
            this.urlImage =  configService.urlStatic+ "/images/profiles/";
            this.errors = {
                        vName: '',
                        vLastName: '',
                        vIdRol: '',
                        vCode: '',
                        vPassword: '',
                        vConfirmPassword: ''

                    }
                        
        }
           
    },
    computed: {
        displayRoles () {
            return this.roles
        }
    }
}
</script>
<template>
   <div>
    <div class="modal fade" id="modal-edit" tabindex="-1" aria-labelledby="modal-edit" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Administración de Usuario</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-6">
                            <h3>Editar Usuario</h3>
                            <div class="input-group has-validation mb-3">
                                <div :class=" errors.vName != '' ? 'form-floating form-group is-invalid' : 'form-floating form-group'" >
                                    <input type="text" :class="errors.vName != '' ? 'form-control is-invalid' : 'form-control '" required v-model="user.name" @input="event => user.name = event.target.value" id="name" placeholder="Name">
                                    <label for="floatingInput">Nombres</label>                  
                                </div>
                                <div class="invalid-feedback">
                                    {{errors.vName != '' ? errors.vName : '' }}
                                </div>
                            </div>
                            <div class="input-group has-validation mb-3">
                                <div :class="errors.vLastName != '' ? 'form-floating form-group is-invalid' : 'form-floating form-group'">
                                    <input type="text" :class="errors.vLastName != '' ? 'form-control is-invalid' : 'form-control '" required v-model="user.lastName" @input="event => user.lastName = event.target.value" id="lastName" placeholder="LastName">
                                    <label for="floatingInput">Apellidos</label>
                                </div>
                                <div class="invalid-feedback">
                                    {{errors.vLastName != '' ? errors.vLastName : '' }}
                                </div>
                            </div>
                            <div class="input-group has-validation mb-3">
                                <select v-model="user.idRol" :class="errors.vIdRol != '' ? 'form-select form-select-lg is-invalid' : 'form-select form-select-lg '"  aria-label="Large select example" >
                                    <option>Selecciona un rol</option>
                                    <option v-for="item in displayRoles" :value="item.id">{{ item.name }}</option>
                                </select>
                                <div class="invalid-feedback">
                                    {{errors.vIdRol != '' ? errors.vIdRol : '' }}
                                </div>
                            </div>                            
                            <div class="input-group has-validation mx-auto">
                                <div :class="errors.vCode != '' ? 'form-floating form-group is-invalid' : 'form-floating form-group'">
                                    <input type="text" v-model="user.code" readonly :class="errors.vCode != '' ? 'form-control is-invalid' : 'form-control '" @input="event => user.code = event.target.value" id="code" placeholder="code">
                                    <label for="floatingInput">Code</label>                                                                  
                                </div>
                                <div class="invalid-feedback">
                                    {{errors.vCode != '' ? errors.vCode : '' }}
                                </div>
                            </div>
                        </div>                        
                        <div class="col border">                            
                            <div>
                                <h3 class="text-center">Foto de Perfil</h3>
                            </div>
                            <div class=" " width="200px;">
                                <img v-if="image" width="200px" :src="urlImage" class="mx-auto d-block" alt="...">
                                <img v-if="!image"width="200px" :src="urlImage+ user.photo" class="mx-auto d-block" alt="...">
                            </div>
                            
                            <div class="input-group mb-3">
                                <input type="file" class="form-control" ref="imgPhoto" @change="event => searchFile(event)" placeholder="Seleccionar imagen" id="inputGroupFile01">
                            </div>
                        </div>
                    </div>
                </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="() => {resetInfo(), close()}">Cerrar</button>
                <button type="button" class="btn btn-primary" @click="() => {insertUser(), close()}">Guardar</button>
            </div>
        </div>
      </div>
    </div>
   </div>
</template>


