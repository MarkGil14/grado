<style scoped>
    .widget-user-header
    {
        background-position: center;
        background-size: cover;
        height: 250px;
    }
</style>


<template>
    <div class="container">
        <div class="row">
                <div class="col-md-12 mt-3">
                    <div class="card card-widget widget-user">
                <!-- Add the bg color to the header using any of the bg-* classes -->
                    <div class="widget-user-header text-white" style="background: url('./background/vector_stag_valley_w1.jpeg');">
                        <h3 class="widget-user-username">{{ this.form.name }}</h3>
                        <h5 class="widget-user-desc">{{ this.form.type }}</h5>
                    </div>
                    <div class="widget-user-image">
                        <img class="img-circle" :src="getProfilePhoto()" alt="User Avatar">
                    </div>
                    <div class="card-footer">
                        <div class="row">
                        <div class="col-sm-4 border-right">
                            <div class="description-block">
                            <h5 class="description-header">3,200</h5>
                            <span class="description-text">SALES</span>
                            </div>
                            <!-- /.description-block -->
                        </div>
                        <!-- /.col -->
                        <div class="col-sm-4 border-right">
                            <div class="description-block">
                            <h5 class="description-header">13,000</h5>
                            <span class="description-text">FOLLOWERS</span>
                            </div>
                            <!-- /.description-block -->
                        </div>
                        <!-- /.col -->
                        <div class="col-sm-4">
                            <div class="description-block">
                            <h5 class="description-header">35</h5>
                            <span class="description-text">PRODUCTS</span>
                            </div>
                            <!-- /.description-block -->
                        </div>
                        <!-- /.col -->
                        </div>
                        <!-- /.row -->
                    </div>
                </div>

            </div>




<div class="col-md-12">
            <div class="card">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                  <li class="nav-item"><a class="nav-link" href="#activity" data-toggle="tab">Activity</a></li>
                  <li class="nav-item"><a class="nav-link active show" href="#settings" data-toggle="tab">Settings</a></li>
                </ul>
              </div><!-- /.card-header -->
              <div class="card-body">
                <div class="tab-content">
                  <div class="tab-pane" id="activity">
  
 
                  </div>

                  <div class="tab-pane active show" id="settings">
                    <form class="form-horizontal">
                      <div class="form-group">
                        <label for="inputName" class="col-sm-2 control-label">Name</label>
                          <input type="text" class="form-control" id="inputName" placeholder="Name" v-model="form.name"  :class="{ 'is-invalid' : form.errors.has('name')  }">
                            <has-error :form="form" field="name"></has-error> 
                      </div>
                      <div class="form-group">
                        <label for="inputEmail" class="col-sm-2 control-label">Email</label>
                       <input type="email" class="form-control" id="inputEmail" placeholder="Email"  v-model="form.email"   :class="{ 'is-invalid' : form.errors.has('email')  }">
                        <has-error :form="form" field="email"></has-error> 
                      </div>
                       <div class="form-group">
                            <label for="inputExperience" class="col-sm-2 control-label">Experience</label>
                            <textarea class="form-control"   :class="{ 'is-invalid' : form.errors.has('bio')  }" id="inputExperience" placeholder="Experience"  v-model="form.bio"></textarea>
                        <has-error :form="form" field="bio"></has-error> 
                       </div>
                      <div class="form-group">

                          <label for="photo">Photo</label>
                          <input type="file"   :class="{ 'is-invalid' : form.errors.has('photo')  }" class="form-input" name="photo" @change="updateProfile">
                        <has-error :form="form" field="photo"></has-error> 

                      </div>
                      <div class="form-group">
                          <label>Password</label>
                          <input type="password" class="form-control"   :class="{ 'is-invalid' : form.errors.has('password')  }" v-model="form.password">
                        <has-error :form="form" field="password"></has-error> 
                      </div>
                      <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                          <button type="submit" class="btn btn-success" @click.prevent="updateInfo">Submit</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div><!-- /.card-body -->
            </div>
            <!-- /.nav-tabs-custom -->
          </div>



        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
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
        mounted() {
            console.log('Component mounted.')
        },
        methods : {
            getProfilePhoto()
            {
                return  this.form.photo;
            },  
            updateInfo()
            {
                this.form.put('api/profile')
                .then(() => {
                    
                    this.$Progress.finish();
                })
                .catch((err) => {
                    console.log(err);
                    this.$Progress.fail();
                });
            },
            updateProfile(e)
            {
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.onloadend = (file) => {
                    this.form.photo = reader.result; 
                }   
                reader.readAsDataURL(file);
            }
        },
        created() {
            axios.get('api/profile')
            .then(({ data }) => (this.form.fill(data)))
            .catch((err) => {
                console.log(err);
            });
        }
    }
</script>
