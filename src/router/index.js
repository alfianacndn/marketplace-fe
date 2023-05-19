import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../pages/loginPage.vue"
import Register from "../pages/registerPage.vue"
import Dashboard from "../pages/dashboardPage.vue"
import Barang from "../pages/barangPage.vue"
import Supplier from "../pages/supplierPage.vue"
Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes:[
        {
            path:"/login",
            component:Login,
            name:'Login'
        },
        
        {
            path:"/register",
            component:Register,
            name:'Register'

        },
        {
            path:"/dashboard",
            component:Dashboard,
            name:'Dashboard'

        },
        {
            path:"/barang",
            component:Barang,
            name:'Barang'

        },
        {
            path:"/supplier",
            component:Supplier,
            name:'Supplier'

        }
    ]
})

export default router;