<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">

            <v-img
              :src="require('@/assets/images/logos/helpdiana-new.png')"
              max-height="100px"
              max-width="250px"
              alt="logo"
              contain
              class="me-3 "
            ></v-img>

        </v-card-title>

        <!-- title -->
        <v-card-text class="card-text align-center justify-center">
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Welcome To HELPDIANA
          </p>
          <p class="mb-2">
            AI로 당신의 진단서를 해석합니다.
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text class="login-button">
          <v-btn
            v-for="link in socialLink"
            :key="link.icon"
            outlined
            color="primary"
            @click="googleLogin()"
          >
            <v-icon :color="$vuetify.theme.dark ? link.colorInDark : link.color">
              {{ link.icon }}
            </v-icon>
            <span>Login with Google</span>
          </v-btn>
        </v-card-text>

        <!-- create new account  -->
        <!-- <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2">
            New on our platform?
          </span>
          <router-link :to="{name:'pages-register'}">
            Create an account
          </router-link>
        </v-card-text> -->

        <!-- divider -->
        <v-card-text class="d-flex align-center mt-2">
          <v-divider></v-divider>
          <span class="mx-5">2021 Capstone Project</span>
          <v-divider></v-divider>
        </v-card-text>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark':'light'}.png`)"
    >

    <!-- tree -->
    <v-img
      class="auth-tree"
      width="247"
      height="185"
      src="@/assets/images/misc/tree.png"
    ></v-img>

    <!-- tree  -->
    <v-img
      class="auth-tree-3"
      width="377"
      height="289"
      src="@/assets/images/misc/tree-3.png"
    ></v-img>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import Api from '../../api/api'
import { mdiFacebook, mdiTwitter, mdiGithub, mdiGoogle, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'

export default {
  setup() {
    const isPasswordVisible = ref(false)
    const email = ref('')
    const password = ref('')
    const googleIcon = {
        icon: mdiGoogle,
        color: '#db4437',
        colorInDark: '#db4437',
    }
    const socialLink = [
      {
        icon: mdiGoogle,
        color: '#db4437',
        colorInDark: '#db4437',
      },
    ]

    return {
      isPasswordVisible,
      email,
      password,
      socialLink,
      googleIcon,

      icons: {
        mdiGoogle,
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },
  methods : {
    googleLogin(){
        this.$gAuth.signIn()
        .then((GoogleUser) => {
          console.log(GoogleUser)
          console.log(GoogleUser.wc)
          console.log(GoogleUser.wc.access_token)
          console.log("logging")
          let data = {
            access_token : GoogleUser.wc.access_token
          }
          console.log(data)
          Api.googleLoginDirect(data)
          .then((res)=>{
            console.log(res)
            console.log(res.data)
            this.$store.commit('GOOGLELOGIN', res.data)
            //나중에 수정할것 이위치에 action으로 그 accesstoken이 valid한지 valid하지 않은지 해야함
            //dispatch로 하고 그다음에 redirect해야함 지금 시간이 없어서 제외함
            this.redirect()
          })
          .catch((err) => {
            console.log("error1")

          })

        })
        .catch((error) => {
          console.log("에러2")
          console.log(error)
        })
    },
    redirect(){
      this.$router.push("/")
    }
    
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
.card-text{
  text-align : center;
}
.login-button{
  display : grid;
  margin:0px;
}
</style>
