<template>
  <div class="d-flex flex-row" style="width:100%">
    <div style="width:50%" class="d-flex flex-column pa-15">

      <div class="d-flex flex-row for-icon mb-15">
        <v-icon color="#6D55A3" size="20" class="back-icon" >mdi-keyboard-backspace</v-icon>
      </div>
      <div class="title-content">
        <p> Log In to your Account </p>
      </div>
      <div class="detail mb-8">
        <p> Welcome back! Please enter your details.</p>
      </div>
      <div class="sub-title">
        <p> Email </p>
      </div>
      <v-text-field
        hide-details
        outlined
        v-model="form.username"
      ></v-text-field>
      <div class="sub-title">
        <p> Password </p>
      </div>
      <v-text-field
        hide-details
        outlined
        type="password"
        v-model="form.password"
      ></v-text-field>
      <v-btn x-large color="#FCD269" class="font-weight-bold mb-3 text-capitalize" @click="forLogin()"> Login</v-btn>
      <div class="detail d-flex" style="margin:auto">
        <p> Don’t have an account?</p>
        <a style="color:#6D55A3" @click="$router.push('/register')"> Sign Up here</a>
      </div>
    </div>
    <div style="width:50%" class="background">
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      form:{
        username:'',
        password:'',
      }
    }
  },
  methods:{
    forLogin(){
      this.$http.post("/auth/login", this.form)
      .then((res) => {
        console.log(res)
        this.$store.commit('LOGIN_SUCCESS', res)
        this.$router.push('/barang')
        console.log(this.$store.state.token)
        localStorage.setItem('token',res.data.data.token)
        localStorage.setItem('name',res.data.data.profileName)
        localStorage.setItem('username',res.data.data.username)
      })
      .catch((err) => {
        console.log(err)
        
      })
    }
  }

}
</script>

<style scoped>
  .title-content{
    font-weight:600;
    font-size:2em;
  }
  .detail{
    font-weight: 400;
    font-size:1em;
    color:#8A8A8A;
  }
  p{
    margin:0
  }
  .background{
        min-height: 100vh;
        background:url('../assets/bg-1.png');
        background-size:cover;
        background-position: bottom;
    }
</style>