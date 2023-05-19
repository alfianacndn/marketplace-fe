import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
state : { 
    token: null,
    user: {profileName:null,username:null}
},

mutations : {
    LOGIN_SUCCESS(state, response) {
        state.token = response.data.data.token
        state.user.profileName = response.data.data.profileName
        state.user.username = response.data.data.username
    }
}

})