<template>
  <div>
    <v-card class="ma-15">
      <v-simple-table 
          style=" border-bottom: thin solid rgba(0, 0, 0, 0.12) !important; "
          >
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">
                    No
                  </th>
                  <th class="text-left">
                    Nama Barang
                  </th>
                  <th class="text-left">
                    Stock
                  </th>
                  <th class="text-left">
                    Harga
                  </th>
                  <th class="text-left">
                    Nama Supplier
                  </th>
                  <th class="text-left">
                    Alamat Supplier
                  </th>
                  <th class="text-left">
                    No Telp Supplier
                  </th>
                  <th class="text-left">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,i) in items" :key="i"
                >
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center">
                    <v-btn> Hapus</v-btn>
                    <v-btn> Update</v-btn>

                  </td>
                </tr>
              </tbody>
            </template>
        </v-simple-table>
    </v-card>
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
      items:[{}]

    }
  },
  methods:{
    clickMenu(val){
      this.$router.push(val.routing)
    }
  }
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