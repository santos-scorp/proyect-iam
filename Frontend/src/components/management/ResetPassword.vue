<script>
import usersService from '../../services/usersService';
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            reset: {
                id: '',
                password: '',
                confirmPassword: ''
            },
            errors: {
                vPassword: '',
                vConfirmPassword:''
            }
        }
    },
    props:['idUser'],
    methods: {
        resetPassword(id) {
            this.reset.id = id
            usersService.resetPassword(this.reset)
            .then(res => {   
                this.resetFields()
                this.alertSuccess()
            }).catch(err => {
                this.validateErrors(err.response.data.errors)
            })
        },
        validateErrors(errors) {
            this.errors = {
                vPassword: '',
                vConfirmPassword: ''
            }
            errors.forEach((el, i) => {                
                switch (el.path) {
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
                title: 'Contraseña actualizada correctamente',
                icon: 'success'
            },)
        },
        resetFields() {
            this.reset = {
                id: '',
                password: '',
                confirmPassword: ''
            }
            this.errors = {
                vPassword: '',
                vConfirmPassword:''
            }
        }
    }
}
</script>

<template>
    <div class="modal" tabindex="-1" id="modal-password">
        <div class="modal-dialog">
            {{ idUser }}
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">                
                <div class="input-group has-validation mb-3">
                    <div :class="errors.vPassword != '' ? 'form-floating form-group is-invalid' : 'form-floating form-group'">
                        <input type="password" :class="errors.vPassword != '' ? 'form-control is-invalid' : 'form-control '" v-model="reset.password" id="passwordModal" placeholder="Contraseña">
                        <label for="floatingPassword">Password</label>
                    </div>
                    <div class="invalid-feedback">
                        {{errors.vPassword != '' ? errors.vPassword : '' }}
                    </div>
                </div>
                <div class="input-group has-validation mb-3">
                    <div :class="errors.vConfirmPassword != '' ? 'form-floating form-group is-invalid' : 'form-floating form-group'">
                        <input type="password" :class="errors.vConfirmPassword != '' ? 'form-control is-invalid' : 'form-control '" v-model="reset.confirmPassword" id="confirmPasswordModal" placeholder="Confirmar Contraseña">
                        <label for="floatingPassword">Confirmar Contraseña</label>
                    </div>
                    <div class="invalid-feedback">
                        {{errors.vConfirmPassword != '' ? errors.vConfirmPassword : '' }}
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="resetPassword(idUser)">Save changes</button>
            </div>
            </div>
        </div>
    </div>
</template>