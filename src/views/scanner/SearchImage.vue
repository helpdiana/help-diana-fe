<template>
<v-container>
    <v-row><p class="text-2xl mb-6"> 사진 올리기 </p></v-row>
    <v-row>
        <v-btn
          color="primary"
        >
          사진 올리기
          <v-file-input 
            @change="preview_image"
            hide-input
            v-model="image"
            prepend-icon="mdi-camera"
            >
          </v-file-input>
        </v-btn>
        <v-btn
          color="success"
          @click="processImage()"
        >
          사진 저장 및 가공
        </v-btn>
    </v-row>
	<v-row>
		<v-col class="p-a-0" cols="12" sm="6" md="4" lg="3" xl="2" v-for="url in this.url" :key=url.key>
			<!-- 카드 UI에 사진 담아내기-->
			<v-card height="200px">
				<v-img :src="url" height="200px">
				</v-img>
			</v-card>
		</v-col>
	</v-row>
</v-container>
</template>

<script>
export default {
  components : {
  },
  data(){
    return {
      images:[],
      url : [],
      image:null,
    }
  },
  computed :{
    
  },
  methods:{
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
    }
  },
  mounted(){
  },
  created(){
  }
};
</script>

<style>
</style>
