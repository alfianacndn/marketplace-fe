<template>
  <div>
    <v-navigation-drawer 
      app 
      clipped 
      flat 
      light 
      class="for-side-bar py-10"
    >
      <v-list class="ml-7 mr-7 " >
        <p style="font-weight:bold;color:#6D55A3"> {{profileName}} </p>
        <div class="d-flex flex-row">
          <div class="mr-3" style="width:0.8em;height:0.8em;border-radius:0.8em;background-color:green"></div>
          <p class="for-username" style="margin:auto 0"> {{username}} </p>
        </div>
        <v-divider class="my-3"> </v-divider>
        <v-list-item 
          class=" pl-2 py-0   " 
          style="width:100%;"
          :style="$route.name==menu.name?'background-color:#F0F0F0;border-left: 3px solid #8949F8;':''"
          link
          @click="clickMenu(menu)"
          v-for="(menu,i) in menus" :key="i"
        >
          <v-icon  size="20" class="mr-4" :color="$route.name==menu.name?'#8949F8':'#4D4D4D'">{{menu.icon}}</v-icon>
          <p class="ml-1" :class="$route.name==menu.name?'for-subt-acctive':'for-subt'" > {{menu.name}} </p>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data(){
    return{
      selectedMenu:{},
      menus:[
        {name:'Barang',routing:'/barang',icon:'mdi-list-box'},
        {name:'Supplier',routing:'/supplier',icon:'mdi-account'},
      ],
      profileName:'',
      username:'',

    }
  },
  methods:{
    clickMenu(val){
      this.selectedMenu=val
      this.$router.push(val.routing)
    },
  },
  created(){
    this.profileName = localStorage.getItem('name')
    this.username = localStorage.getItem('username')

  },
}
</script>

<style scoped>
.for-side-bar{
  background-color:white !important;
  margin :auto
}
p{
  margin-bottom:0;
}
.for-subt{
  color:rgba(0, 0, 0, 0.7);
  font-weight: 500;
}
.content-area {
  background-color:#f5f5f5;
  margin-left:250px;
  margin-top:60px;
  transition:0.2s;
  min-height: calc(100vh - 60px);
}
.for-subt-acctive{
  color:#8949F8 !important;
  font-weight: 700;
}
.for-username{
  font-size:0.75em;
  color:rgba(0, 0, 0, 0.5);

}
</style>