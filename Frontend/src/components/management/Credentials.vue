<template>
    <div class="modal fade" id="modal-credential" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5">Credencial de Usuario</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body row">                
                <div class="col-md-6 m-0 p-0 template" ref="templateReference">
                   <div>
                        <img :src="imagUrl" class="template" />
                   </div>
                    <div class="cropped-image" >
                        <img
                        v-if="imageCropped"
                        :src="imageCropped"
                        alt="Cropped Image"
                        />
                    </div>
                    <div class="name-text">
                        {{ user.name }} <br> {{ user.lastName }}
                    </div>
                    <div class="rol-text">
                        {{ user.rol }}
                    </div>
                    <div class="qr-img">
                        <vue-qr  :text="!user.code ? 'hola' : user.code" :size="200" :colorDark='"#4d267f"' :colorLight='"#fff"' />
                    </div>
                </div>
                <div class="col-md-6">
                    <ImageCropper @imageCroped="handleImage" :profile="user.photo"/>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="desacargarImg">Descargar Credencial</button>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import configService from '../../services/config';
import ImageCropper from './ImageCropper.vue';
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
import { generarImagen } from '../../utils/useHtmlImage.js'
export default {
    name: 'Credentials',
    props: ['user'],
    data() {
        return {
            imagUrl: configService.urlStatic + '/images/templates/credencial.png',
            imageCropped: '',
            downloading: false
        }
    },
    components: {ImageCropper, vueQr},
    methods: {
        handleImage (value) {
           this.imageCropped = value 
        },
        desacargarImg() {
            console.log(this.$refs.templateReference);
            
            generarImagen(this.$refs.templateReference).then(imagen => {
                const linkDownload = document.createElement('a')
                linkDownload.href = imagen
                linkDownload.download = this.user.photo
                linkDownload.click()
            }).catch(err => {
                console.log(err);                
            })
        },
        
    }
}
</script>
<style>
    .cropped-image img {
      max-width: 145px;
      position: absolute;
      top: 83px;
      left: 96px;
      border-radius: 50%;
    }
    .template {
        width: 300px;
        margin: 0;
        padding: 0;
    }
    .name-text{
        position: absolute;
        background-color: #f9faf4;
        text-align: center;
        top: 240px;
        font-size: 1em;
        font-weight: 700;        
        color: #4d267f;
        width: 300px;
        font-family: Arial, Helvetica, sans-serif;
    }
    .rol-text {
        position: absolute;
        background-color: #f9faf4;
        text-align: center;
        top: 287px;
        font-size: 1em;        
        color: #4d267f;
        width: 300px;
        font-family: Arial, Helvetica, sans-serif;
        z-index: 2;
    }
    .qr-img {
        position: absolute;
        top: 305px;
        left: 68px;
    }
    
</style>
