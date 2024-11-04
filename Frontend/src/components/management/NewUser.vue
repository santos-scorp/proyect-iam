<script>
import rolesServices from '../../services/rolesServices'
import configService from '../../services/config';
import usersService from '../../services/usersService';
import Swal from 'sweetalert2'

export default {
    name: 'NewUser',
    data () {
        return {
            user :{
                name: '',
                lastName: '',
                code: '',                
                idRol: '',
                password: '',
                confirmPassword: ''
            },
            imgSrc: configService.urlStatic,
            cropImg: '',
            data: null,
            roles:[],
            permissions: [],
            codeCheck: {user :''},
            image: null,
            urlImage: configService.urlStatic+ "/images/templates/profile.png",
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
    mounted () {
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
            usersService.insert(this.user)
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
                title: 'Usuario Creado con exito',
                icon: 'success'
            },)
        },
        chargeLists () {
            rolesServices.all()
            .then(res => {
                this.roles = res.roles;
                console.log(this.roles);
            })
            
            
        },
        checkList(e) {
            if (this.user.permissions.find(el => e.target.value === el))
            {
                const result = this.user.permissions.filter(el => e.target.value != el)
                this.user.permissions = result.sort()
            }
            else {
                this.user.permissions.push(e.target.value)
            }            
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
            let file = e.target.files[0];
            const allowedTypes = ["image/jpg","image/jpeg","image/png","image/gif"];
            if (allowedTypes.includes(file.type)){
                this.image = file;
                this.urlImage = URL.createObjectURL(file)               
            }
        },
        async generarCodigo() {
            const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let codigo = '';
            const result = await usersService.checkCode(codigo)
            .then(res => this.codeCheck = res);            
            
            if (!this.codeCheck.user) {
                for (let i = 0; i < 10; i++) {
                    const indice = Math.floor(Math.random() * caracteres.length);
                    codigo += caracteres[indice];
                }
                this.user.code = codigo;
            } else {
                this.generarCodigo()
            }
                       
        },
        resetInfo() {
            
            this.errors = {
                        vName: '',
                        vLastName: '',
                        vIdRol: '',
                        vCode: '',
                        vPassword: '',
                        vConfirmPassword: ''

                    }
            this.user = {
                name: '',
                lastName: '',
                code: '',                
                idRol: '',
                password: '',
                confirmPassword: ''
            };
            this.urlImage =  configService.urlStatic+ "/images/templates/profile.png";            
        }
           
    },
    computed: {
        displayRoles () {
            return this.roles
        },
    }
}
</script>
<template>
   <div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Administración de Usuario</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-6">
                            <h3>Nuevo Usuario</h3>
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
                            <div class="input-group has-validation mb-3">
                                <div :class="errors.vPassword != '' ? 'form-floating form-group is-invalid' : 'form-floating form-group'">
                                    <input type="password" :class="errors.vPassword != '' ? 'form-control is-invalid' : 'form-control '" v-model="user.password" @input="event => user.password = event.target.value" id="password" placeholder="Contraseña">
                                    <label for="floatingPassword">Password</label>
                                </div>
                                <div class="invalid-feedback">
                                    {{errors.vPassword != '' ? errors.vPassword : '' }}
                                </div>
                            </div>
                            <div class="input-group has-validation mb-3">
                                <div :class="errors.vConfirmPassword != '' ? 'form-floating form-group is-invalid' : 'form-floating form-group'">
                                    <input type="password" :class="errors.vConfirmPassword != '' ? 'form-control is-invalid' : 'form-control '" v-model="user.confirmPassword" @input="event => user.confirmPassword = event.target.value" id="confirmPassword" placeholder="Confirmar Contraseña">
                                    <label for="floatingPassword">Confirmar Contraseña</label>
                                </div>
                                <div class="invalid-feedback">
                                    {{errors.vConfirmPassword != '' ? errors.vConfirmPassword : '' }}
                                </div>
                            </div>
                            
                            <div class="input-group has-validation mx-auto">
                                <div :class="errors.vCode != '' ? 'form-floating form-group is-invalid' : 'form-floating form-group'">
                                    <input type="text" v-model="user.code" readonly :class="errors.vCode != '' ? 'form-control is-invalid' : 'form-control '" @input="event => user.code = event.target.value" id="code" placeholder="code">
                                    <label for="floatingInput">Code</label>                                                                  
                                </div>
                                <input type="button" class="btn btn-success" @click="generarCodigo" value="Generar codigo"/>
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
                                <img width="200px" :src="urlImage" class="mx-auto d-block" alt="...">
                            </div>
                            
                            <div class="input-group mb-3">
                                <input type="file" class="form-control" @change="event => searchFile(event)" placeholder="Seleccionar imagen" id="inputGroupFile01">
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


