<template>
  <div class="d-flex flex-row" style="width:100%">
    <div style="width:50%" class="d-flex flex-column px-15 py-10">
       <div class="d-flex flex-row for-icon mb-3">
            <v-icon color="#6D55A3" size="20" class="back-icon" @click="$router.push('/landing-page')">mdi-keyboard-backspace</v-icon>
        </div>

        <div class="title-content">
            <p> Register your Account </p>
        </div>
        <div class="detail mb-3">
            <p> Let us help you! Our registration process is quick and easy, please enter your details.</p>
        </div>
        <div class="sub-title">
            <p> Name </p>
        </div>
        <v-text-field
            hide-details
            outlined
            dense
            v-model="form.profileName"
        ></v-text-field>
        <div class="sub-title">
            <p> Username </p>
        </div>
        <v-text-field
            hide-details
            outlined
            dense
            v-model="form.username"
        ></v-text-field>
         <div class="sub-title">
            <p> Password </p>
        </div>
        <v-text-field
            hide-details
            outlined
            dense
            v-model="form.password"
            type="password"
        ></v-text-field>
        <v-btn x-large color="#FCD269" class="font-weight-bold my-3 text-capitalize" @click="forRegister()"> Register</v-btn>
        <div class="detail d-flex" style="margin:auto">
            <p> Don’t have an account?</p>
            <a style="color:#6D55A3" @click="$router.push('/login')"> Sign In here</a>
        </div>
    </div>
    <div style="width:50%" class="background">
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      form:{profileName:'',username:'',password:''}
    }
  },
  methods:{
    forRegister(){
      this.$http.post("/auth/register", this.form)
      .then((res) => {
        console.log(res)
        this.$router.push('/login')
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