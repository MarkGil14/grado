<template>
    <div class="container">
         <div class="row mt-5" v-if="$gate.isAdminOrAuthor()">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">User List</h3>

                <div class="card-tools">
                    <button class="btn btn-success" @click="newModal"><i class="fa fa-user-plus"></i> Add New</button>                   
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                  <tbody>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Created at</th>
                    <th>Modify</th>
                  </tr>

                
                  <tr v-for="user in users.data" :key="user.id">
                    <td>{{user.id}}</td>
                    <td>{{ user.name }}</td>
                    <td>{{user.email}}</td>
                    <td><span class="tag tag-success">{{user.type | upText}}</span></td>
                    <td>{{user.created_at | myDate}}</td>
                    <td>
                        <a href="#" @click="editModal(user)">
                            <i class=" fa fa-edit text-success"></i>
                        </a>

                        <a href="#" @click="deleteUser(user.id)">
                            <i class=" fa fa-trash text-danger"></i>
                        </a>

                    </td>
                  </tr>
           
                </tbody></table>
              </div>
              <!-- /.card-body -->
              <div class="card-footer">
                <pagination :data="users" @pagination-change-page="getResults"></pagination>                  
              </div>
            </div>
            <!-- /.card -->
          </div>
        </div>

        <div  v-if="!$gate.isAdminOrAuthor()">
            <not-found></not-found>
        </div>

                    <!-- Modal -->
            <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addNewLabel" v-show="!editmode">Add New</h5>
                        <h5 class="modal-title" id="addNewLabel" v-show="editmode">Update Users Info</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="editmode ? updateUser() : createUser()">
                    <div class="modal-body">
                        <div class="form-group">
                            <input v-model="form.name" type="text" name="name" class="form-control" placeholder="Name" :class="{ 'is-invalid' : form.errors.has('name')  }">
                            <has-error :form="form" field="name"></has-error> 
                        </div>

                        <div class="form-group">
                            <input v-model="form.email" type="text" name="email" class="form-control" placeholder="Email" :class="{ 'is-invalid' : form.errors.has('email')  }">
                            <has-error :form="form" field="email"></has-error> 
                        </div>

                        <div class="form-group">
                            <textarea v-model="form.bio" type="text" name="bio" class="form-control" placeholder="Bio" :class="{ 'is-invalid' : form.errors.has('bio')  }"></textarea>
                            <has-error :form="form" field="bio"></has-error> 
                        </div>

                        <div class="form-group">
                            <select v-model="form.type" id="type" name="type" class="form-control"  :class="{ 'is-invalid' : form.errors.has('name')  }">
                                <option value="">Select User Type</option>
                                <option value="admin">Admin</option>
                                <option value="user">Standard Author</option>
                                <option value="author">Author</option>
                            </select>
                            <has-error :form="form" field="type"></has-error> 
                        </div>


                        <div class="form-group">
                            <input v-model="form.password" type="password" id="password" name="password" class="form-control" placeholder="Password" :class="{ 'is-invalid' : form.errors.has('password')  }">
                            <has-error :form="form" field="password"></has-error> 
                        </div>
                        



                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" v-show="!editmode" class="btn btn-primary">Create</button>
                        <button type="submit" v-show="editmode" class="btn btn-success">Update</button>
                    </div>
                    </form>
                    </div>
                </div>
            </div>


    </div>

    
</template>

<script>
    export default {
        data() {
            return {
                editmode : false,
                users : {},
                form: new Form({
                    id : '',
                    name : '',
                    email : '',
                    password : '',
                    type : '',
                    bio : '',
                    photo : ''
                })
            }
        },
        methods : {
            getResults(page = 1) {
                axios.get('api/user?page=' + page)
                    .then(response => {
                        this.users = response.data;
                    });
            },            
            updateUser()
            {
                this.$Progress.start();               
                this.form.put('api/user/' + this.form.id)
                .then(() => {
                            $('#addNew').modal('hide');
                            swal.fire(
                            'Updated!',
                            'Information has been Updated',
                            'success'
                        )
                        this.$Progress.finish();
                        Fire.$emit('AfterCreate');
                })
                .catch(() => {
                    this.$Progress.fail();
                });
            },
            editModal(user)
            {
                this.editmode = true;
                this.form.reset();
                $('#addNew').modal('show');
                this.form.fill(user);
            },            
            newModal()
            {
                this.editmode = false;
                this.form.reset();
                $('#addNew').modal('show');
            },
            deleteUser(id)
            {

                swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {

                if (result.value) {

                    // Send request tot the server
                    this.form.delete('api/user/'+id).then(() => {
                        swal.fire(
                            'Deleted!',
                            'Your file has been deleted',
                            'success'
                        )
                        
                        Fire.$emit('AfterCreate');

                    }).catch(() => {
                        swal("Failed!", "Oops ! Something went wrong, Please try again", "warning");
                    });
                                         
                }
                })                
 
            },
            loadUsers()
            {      
                if(this.$gate.isAdminOrAuthor()){
                    axios.get('api/user').then(({ data }) => (this.users = data));
                }
            },
            createUser()
            {
                this.$Progress.start();
                this.form.post('api/user')
                .then(()=> {
                    $("#addNew").modal('hide');
                    toast.fire({
                        type : 'success',
                        title : 'User Successfully Created'
                    })
                    this.$Progress.finish();
                    Fire.$emit('AfterCreate');
                })
                .catch(()=> {
                    
                });

          

            }
        },
        created() {
            Fire.$on('searching', () => {
                let query = this.$parent.search;
                axios.get('api/findUser?q=' + query)
                .then((data) => {
                    this.users = data.data;
                })
                .catch((err) => {
                    console.log(err);
                });
            });
            this.loadUsers();
            Fire.$on('AfterCreate', () => {
                this.loadUsers();
            });
            // setInterval(() => this.loadUsers() , 3000);

        }
    }
</script>
