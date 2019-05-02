import { getLocalUser } from "./helpers/auth";
import Axios from "axios";

const user = getLocalUser();
export default {
    state : {
        currentUser : user,
        isLoggedIn: !!user,
        loading : false,
        authError : null,
        customers : []
    },
    getters : {
        isLoading(state)
        {
            return state.loading;
        },
        isLoggedIn(state)
        {
            return state.isLoggedIn;
        },
        currentUser(state)
        {
            return state.currentUser;
        },
        authError(state)
        {
            return state.authError;
        },
        customers(state)
        {
            return state.customers;
        },        
    },
    mutations : {
        login(state){
            state.loading = true;
            state.auth_error = null;

        },
        loginSuccess(state, payload)
        {
            state.loading = false;
            state.auth_error = null;
            state.isLoggedIn = true;
            state.currentUser = Object.assign({} , payload.user, {token : payload.access_token});
            localStorage.setItem('user', JSON.stringify(state.currentUser));
        },
        loginFailed(state, payload)
        {
            state.loading = false;
            state.authError = payload.error;
        },
        logout(state)
        {
            localStorage.removeItem('user');
            state.isLoggedIn = false;       
            state.currentUser = null;     
        },
        updateCustomers(state, payload)
        {
            state.customers = payload;
        }
    },
    actions : {
        login(context)
        {
            context.commit('login');
        },

        getCustomers(context)
        {
            axios.get('/api/customers', {
                headers : {
                    "Authorization" : `Bearer ${context.state.currentUser.token}`
                }
            })
            .then((response) => {
                context.commit('updateCustomers', response.data.customers);
            })
        }
    }

}