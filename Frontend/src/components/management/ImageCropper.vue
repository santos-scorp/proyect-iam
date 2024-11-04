<template>
    <div>  
      <div class="content">
        <section class="cropper-area">
          <div class="img-cropper">
            <div>
              <vue-cropper
              ref="cropper"
              :aspect-ratio="16 / 16"
              :view-mode="2"
              :src="imgSrc + this.profile"
              preview=".preview"
               :min-container-width="300"
               :min-container-height="400"

            />
            </div>
          </div>
          <div class="actions">
            <a
              href="#"
              role="button"
              @click.prevent="cropImage"
            >
              Cortar
            </a>
            <a
              href="#"
              role="button"
              @click.prevent="reset"
            >
              Reset
            </a>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  import VueCropper from 'vue-cropperjs';
  import 'cropperjs/dist/cropper.css';
  import configService from '../../services/config';
  
  export default {
    components: {
      VueCropper,
    },
    name:'ImageCropper',    
    props:['profile'],
    data() {
      return {
        imgSrc: configService.urlStatic +'/images/profiles/',
        imageCroped: '',
      };
    },
    updated(){
      this.setImage()
    },
    methods: {
      cropImage() {
        // get image data for post processing, e.g. upload or setting image src
        console.log(this.$refs);
        
        this.imageCroped = this.$refs.cropper.getCroppedCanvas().toDataURL();
        
        
      },
      reset() {
        this.$refs.cropper.reset();
      },
      setImage() {
        // const file = this.profile;
        this.$refs.cropper.replace(this.imgSrc + this.profile);
      },
      showFileChooser() {
        this.$refs.input.click();
      },
    },
    watch: {
      imageCroped: function () {
        this.$emit('imageCroped', this.imageCroped)
      }
    }
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>



.content {
  display: flex;
  justify-content: space-between;
}

.cropper-area {
  width: 614px;
}

.actions {
  margin-top: 1rem;
}

.actions a {
  display: inline-block;
  padding: 5px 15px;
  background: #0062CC;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  margin-right: 1rem;
  margin-bottom: 1rem;
}


.preview-area {
  width: 307px;
}

.preview-area p {
  font-size: 1.25rem;
  margin: 0;
  margin-bottom: 1rem;
}

.preview-area p:last-of-type {
  margin-top: 1rem;
}

.preview {
  width: 100%;
  height: calc(372px * (9 / 16));
  overflow: hidden;
}

.crop-placeholder {
  width: 100%;
  height: 200px;
  background: #ccc;
}

.cropped-image img {
  max-width: 100%;
}
    

  </style>