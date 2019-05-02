<template>
    <nav class="nabvar navbar-expand-sm navbar-dark bg-info mb-2">
        <div class="container">
            <a href="" class="navbar-brand">Laravel Vue with SPA</a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <template v-if="!currentUser">
                        <li>
                            <router-link to="/login" class="nav-link">Login</router-link>
                            <router-link to="/register" class="nav-link">Register</router-link>
                        </li>
                    </template>
                    <template v-else>
                        <li>
                            <router-link to="customers" class="nav-link">Customers</router-link>
                        </li>
                        <li class="nav-item dropdown">
                            <a href="#" id="navbarDropdown" class="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-expanded="false" aria-haspopup="true">
                                {{ currentUser.name }} <span class="caret"></span>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a href="#!" @click.prevent="logout" class="dropdown-iten">Logout</a>
                            </div>
                        </li>
                    </template>

                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name : 'app-header',
    methods : {
        logout()
        {
            this.$store.commit('logout');
            this.$router.push('/login');
        }
    },
    computed : {
        currentUser(){
            return this.$store.getters.currentUser
        }
    }
}
</script>