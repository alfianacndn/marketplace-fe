<template>
  <div>
    <v-card>
        <div class="pb-10" style="background-color:#FFFFFF !important">
            <div  style="background-color:#6D55A3 !important;color:white">
                <v-card-title class="pl-8 pb-2 pt-5" style="font-size:2rem"> {{title}} </v-card-title>
            </div>

            <div class="px-8 pt-8 pb-3" v-if="title=='Edit Barang' || title == 'Tambah Barang'">
                <div class="d-flex flex-row mb-4 ">
                    <p style="margin:auto;width:8em"> Nama Barang</p>
                    <v-text-field v-model="form.namaBarang" hide-details dense outlined placeholder="Masukan Nama Barang"> </v-text-field>
                </div>
                <div class="d-flex flex-row mb-4 ">
                    <p style="margin:auto;width:8em"> Harga Barang</p>
                    <v-text-field  v-model="form.harga" hide-details dense outlined placeholder="Masukan Harga Barang"> </v-text-field>
                </div>
                <div class="d-flex flex-row mb-4 ">
                    <p style="margin:auto;width:8em"> Stok Barang</p>
                    <v-text-field  v-model="form.stok" hide-details dense outlined placeholder="Masukan Stok Barang"> </v-text-field>
                </div>
                <div class="d-flex flex-row  ">
                    <p style="margin:auto;width:8em"> Supplier Barang</p>
                    <v-autocomplete
                        v-model="form.supplier"
                        :items="items"
                        dense
                        item-text="namaSupplier"
                        outlined
                        placeholder="Masukan Nama Supplier"
                        return-object
                    ></v-autocomplete>
                </div>
            </div>

            <div class="px-8 pt-8 pb-3" v-else>
                <div class="d-flex flex-row mb-4 ">
                    <p style="margin:auto;width:8em" > Nama Supplier</p>
                    <v-text-field v-model="formSupplier.namaSupplier" hide-details dense outlined placeholder="Masukan Nama Supplier"> </v-text-field>
                </div>
                <div class="d-flex flex-row mb-4 ">
                    <p style="margin:auto;width:8em"> Alamat Supplier</p>
                    <v-text-field v-model="formSupplier.alamat" hide-details dense outlined placeholder="Masukan Alamat Supplier"> </v-text-field>
                </div>
                <div class="d-flex flex-row mb-4 ">
                    <p style="margin:auto;width:8em"> No Telp Supplier</p>
                    <v-text-field v-model="formSupplier.noTelp" hide-details dense outlined placeholder="Masukan No Telp Supplier"> </v-text-field>
                </div>
            </div>
        </div>
        <div class="d-flex flex-row-reverse px-8 pb-8">
            <v-btn class="ml-5" @click="forSave()"> Simpan </v-btn>
            <v-btn text @click="forClose"> Tutup </v-btn>
        </div>
    </v-card>
  </div>
</template>

<script>
export default {
    props:['dialog','title','valueSupplier','valueBarang'],
    data(){
        return {
            form: {
                namaBarang:'',
                harga:'',
                stok:'',
                supplier:{
                    alamat:'',
                    id:null,
                    namaSupplier:'',
                    noTelp:''
                },
            },
            formSupplier:{
                namaSupplier:'',
                noTelp:'',
                alamat:''
            },
            items: [{}],

        }
    },
    methods:{
        forClose(){
          this.$emit('update:dialog', false);
        },
        getDataSupplier(){
            this.$http.get("/supplier/find-all?limit=10000&offset=1",{
                headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((res) => {
                console.log(res)
                this.items=res.data.data
            })
        },
        forSave(){
            
            console.log(this.form)
            if (this.title == 'Tambah Barang'){
                this.$http({ method: 'post', url: "/barang/create", headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }, data:this.form})
                .then((res) => {
                    console.log(res)
                    this.$toast.success('Berhasil menambahkan!',{timeout:1500})
                    this.forClose()
                }).catch((err) => {
                    console.log(err)
                    this.$toast.error('Tidak erhasil menambahkan!',{timeout:1500})

                })
            } else if (this.title == 'Tambah Supplier'){
                this.$http({ method: 'post', url: "/supplier/create", headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }, data:this.formSupplier})
                .then((res) => {
                    console.log(res)
                    this.$toast.success('Berhasil menambahkan!',{timeout:1500})
                    this.forClose()
                }).catch((err) => {
                    console.log(err)
                    this.$toast.error('Tidak erhasil menambahkan!',{timeout:1500})

                })
            } else if (this.title == 'Edit Supplier'){
                this.$http({ method: 'put', url: "/supplier/update/"+this.valueSupplier.id, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }, data:this.formSupplier})
                .then((res) => {
                    console.log(res)
                    this.$toast.success('Berhasil memperbaharui!',{timeout:1500})
                    this.forClose()
                }).catch((err) => {
                    console.log(err)
                    this.$toast.error('Tidak erhasil memperbaharui!',{timeout:1500})

                })
            } else if (this.title == 'Edit Barang'){
                console.log(this.form)
                this.$http({ method: 'put', url: "/barang/update/"+this.valueBarang.id, headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }, data:this.form})
                .then((res) => {
                    console.log(res)
                    this.$toast.success('Berhasil memperbaharui!',{timeout:1500})
                    this.forClose()
                }).catch((err) => {
                    console.log(err)
                    this.$toast.error('Tidak erhasil memperbaharui!',{timeout:1500})

                })
            }
            
        },
        setDataSupplier(){
            this.formSupplier= this.valueSupplier
            console.log(this.formSupplier)
        },
        setDataBarang(){
            this.form = this.valueBarang
            console.log(this.form)
        }
    },
    mounted(){
        this.getDataSupplier()
        if (this.title == 'Edit Supplier'){
            this.setDataSupplier()
        } else if (this.title == 'Edit Barang'){
            this.setDataBarang()
        }
    },
    watch:{
        dialog(){
            if(this.title == 'Edit Supplier'){
                this.setDataSupplier()
            } else if (this.title == 'Edit Barang'){
                this.setDataBarang()
            }
        }
    }
}
</script>

<style>

</style>