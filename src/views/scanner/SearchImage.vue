<template>
<v-container>
    <v-row><p class="text-2xl mb-6"> 사진 올리기 </p></v-row>
    <v-row>
      <div>
        <v-btn
          color="primary"
          class="text-none mr-2"
          small
          round
          depressed
          :loading="isSelecting"
          @click="onButtonClick"
        >
          <v-icon left>
            {{icons.mdiCloudUpload}}
          </v-icon>
          사진 올리기
        </v-btn>
        <input
          ref="uploader"
          class="d-none"
          type="file"
          accept="image/*"
          @change="onFileChanged"
        >
        <v-btn
          color="success"
          small
          @click="processImage()"
        >
          사진 저장 및 가공
        </v-btn>
      </div>
    </v-row>
	<v-row class="card-view">
		<v-col class="card-view-image pa-2" cols="12" sm="6" md="4" lg="3" xl="2" v-for="(url,index) in this.url" :key=index>
			<!-- 카드 UI에 사진 담아내기-->
      <span class="card-view-number">
        {{index + 1}}
      </span>
			<v-card height="200px" outlined
      >
      <v-btn
        class="mx-2 delete-button"
        x-small
        fab
        color="red"
        @click="deleteImage(index)"
      >
      <v-icon dark>
        mdi-close
      </v-icon>
    </v-btn>
				<v-img :src="url" height="200px">
				</v-img>
			</v-card>
		</v-col>
	</v-row>
</v-container>
</template>

<script>
import { mdiCloudUpload } from '@mdi/js'
export default {
  components : {
  },
  data(){
    return {
      icons : {
        mdiCloudUpload
      },
      images:[],
      url : [],
      image:null,
      isSelecting : false,
    }
  },
  computed :{
    
  },
  methods:{
    onButtonClick(){
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true })

      this.$refs.uploader.click()
    },
    onFileChanged(e){
      this.images.push(e.target.files[0])
      this.url = []
      for(let i = 0; i<this.images.length; i++){
        this.url.push(URL.createObjectURL(this.images[i]))
      }
    },
    preview_image(){
      this.images.push(this.image)
      this.url = []
      for(let i = 0; i<this.images.length; i++){
        this.url.push(URL.createObjectURL(this.images[i]))
      }
    },
    processImage(){
      //여기서 이미지 그다음서버에 돌리고 스피너를 넣어야합니다.
      this.$router.push('process-image')
    },
    deleteImage(index){
      if(index > -1){
        this.url.splice(index,1)
        this.images.splice(index,1)
      }
    }
  },
  mounted(){
  },
  created(){
  }
};
</script>

<style lang="scss">
.card-view-image{
  padding : 12px 0;
  .delete-button{
    position:absolute;
    top : 10px;
    right:0;
    z-index:9999;
    color : red;
  }
  .card-view-number{
    position:absolute;
    z-index:9999;
    left:40px;
    color : blue;
    font-weight : bold;
  }
}

</style>
