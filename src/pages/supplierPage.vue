<template>
  <div class="pa-15">
    <div class="d-flex flex-row-reverse">
      <template>
        <div class="text-center">
          <v-dialog
            v-model="dialogAdd"
            width="500"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="#8949F8"
                outlined
                dark
                v-bind="attrs"
                v-on="on"
                @click="add='Tambah Supplier'"
              >
                Tambah Supplier
              </v-btn>
            </template>

            <AddEdit :dialog.sync="dialogAdd" :title="add"/>
          </v-dialog>
        </div>
      </template>
      <download-excel
            class="btn btn-default"
            :data="items"
            :fields="json_fields"
            worksheet="Supplier"
            name="Data-Supplier.xls"
          >
            <v-btn
                color="#8949F8"
                dark
                class="mr-5"
                @click="exportXLX()"
              >
                Export
              </v-btn>
      </download-excel>
    </div>
    <v-card class="mt-5">
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
                    Nama Supplier
                  </th>
                  <th class="text-left">
                    Alamat
                  </th>
                  <th class="text-left">
                    No Telp
                  </th>
                  <th class="text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,i) in items" :key="i"
                >
                  <td class="text-center">{{previousData+i}}</td>
                  <td class="text-left">{{item.namaSupplier}}</td>
                  <td class="text-left">{{item.alamat}}</td>
                  <td class="text-left">{{item.noTelp}}</td>
                  <td class="text-left">
                    <v-icon color="red" class="mr-8" @click="forDelete(item)"> mdi-delete </v-icon>
                    <v-icon  @click="forEdit(item)" color="green" > mdi-pencil </v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
        </v-simple-table>
        <div class="d-flex flex-row-reverse py-4 px-4 align-center" >
            <v-icon @click="switchPages('next')" size="35" class="ml-5" :style="hasNext==true?'color:#737373':'color:#E0E0E0'"> mdi-chevron-right </v-icon>
            <v-icon @click="switchPages('previous')" size="35" class="ml-10" :style="hasPrevious==true?'color:#737373':'color:#E0E0E0'"> mdi-chevron-left </v-icon>
            
            <p class="navigation ml-10" style="color: rgba(0,0,0,.7) !important"> {{previousData}}-{{currentData}} dari {{totalData}} </p>
            <v-menu offset-y :close-on-click="closeOnClick" >
                <template v-slot:activator="{ on, attrs }">
                    <div style="" class="d-flex flex-row px-1 ml-10" >
                        <input  v-model="currentTake" min="1" max="50" style="width:35px;border-bottom:solid 1px" type="number" @change="getData">
                         <v-icon v-bind="attrs" v-on="on">mdi-arrow-down-bold </v-icon>
                    </div>
                </template>
                <v-list class="pa-0">
                    <v-list-item @click="editTake(take)" v-for="(take,i) in takesData" :key="i">
                        <v-list-item-title >{{ take }}</v-list-item-title>
                    </v-list-item>
                </v-list> 
            </v-menu>
            <p class="navigation " style="color: rgba(0,0,0,.7) !important">  Baris per halaman: </p>
        </div>
    </v-card>
    <v-dialog
      v-model="dialogEdit" width="500"
    >
      <AddEdit :dialog.sync="dialogEdit" :title="add" :valueSupplier="value"/>
    </v-dialog>
  </div>
</template>

<script>
import AddEdit from '../components/AddEdit.vue'

export default {
  components:{AddEdit},
  
  data(){
    return {
      items:[{}],
      selectedDialog:'',
      dialogAdd: false,
      dialogEdit:false,
      edit:'Edit Supplier',
      add:'Tambah Supplier',
      takesData:[5,10,15,20],
      currentPage:1,
      currentTake:10,
      totalPage:0,
      totalData:0,
      currentData:10,
      previousData:1,
      closeOnClick: true,
      hasPrevious:false,
      hasNext:false,
      value:{},
      json_fields: {
          'Nama Supplier': 'namaSupplier',
          'Alamat Supplier': 'alamat',
          'No Telp Supplier' : 'noTelp'
        },
        json_meta: [
          [
            {
              key: 'charset',
              value: 'utf-8',
            },
          ],
        ],
    }
    
  },
  methods:{
    forEdit(val){
      this.add='Edit Supplier'
      this.dialogEdit = true
      this.value = val
    },
    forDelete(val){
      this.$http.delete("/supplier/delete/" + val.id,{
        headers:{
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((res) => {
        console.log(res)
        this.$toast.success('Berhasil hapus data!',{timeout:1500})
        this.getData()
      })
      .catch((err) => {
        console.log(err)
        this.$toast.error('Tidak berhasil hapus data!',{timeout:1500})

      })
    },
    getData(){
       if (this.currentTake >50){
        this.currentTake = 50
      } else if (this.currentTake==0){
        this.currentTake=1
      }
      this.$http.get("/supplier/find-all?limit="+this.currentTake+'&offset=' +this.currentPage,{
        headers:{
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((res) => {
        console.log(res)
        this.items = res.data.data
        this.currentPage =res.data.page
        this.totalPage = res.data.total_page
        this.totalData = res.data.total_record
        if (this.totalPage>this.currentPage){
          this.hasNext = true
        } else {
          this.hasNext = false
        }

        if (this.currentPage==1){
          this.hasPrevious = false
        } else {
          this.hasPrevious = true
        }
        if (this.totalData < this.currentPage * this.currentTake){
                this.currentData = this.totalData
            } else {
                this.currentData =this.currentPage * this.currentTake
            }
            this.previousData = ((this.currentPage-1) * this.currentTake) +1
      })
      .catch((err) =>
        console.log(err))
    },
    editTake(val){
      this.currentPage =1
      this.currentTake = val
      this.getData()
    },
    switchPages(kind){
            if (kind=='next' && this.hasNext){
                this.currentPage = this.currentPage+1
                    this.getData('next')
            } else if (kind=='previous' && this.hasPrevious) {
                this.currentPage = this.currentPage - 1
                    this.getData('previous')
            }
        },
  },
  mounted(){
    this.getData()
  }
}
</script>

<style>

</style>