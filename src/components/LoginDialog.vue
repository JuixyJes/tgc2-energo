<template>
    <div class="center">
        <vs-dialog blur prevent-close not-close v-model="active">
            <template #header>
                <h4 class="not-margin">
                    Войдите в систему
                </h4>
            </template>

            <div class="con-form">
                <vs-input v-model="login" placeholder="Email">
                </vs-input>
                <vs-input type="password" v-model="password" placeholder="Пароль">
                </vs-input>
            </div>

            <template #footer>
                <div class="footer-dialog">
                    <vs-button style="margin-bottom: 10px" flat block @click="loginClick">
                        Войти
                    </vs-button>
                </div>
            </template>
        </vs-dialog>
        
    </div>
</template>

<script>
    import axios from 'axios'
    import formData from 'formdata'

    export default {
        name: "LoginDialog",
        props: {
            activeLoginDialog: {
                type: Boolean,
                required: false,
                default: true,
            }, 
            userLogin: {
                type: String,
                required: false,
                default: '',
            },
            fullName: {
                type: String,
                required: false,
                default: '',
            },
            
        },
        data: () => ({
            active: true,
            login: '',
            userFullName: '',
            password: '',
        }),
        computed: {},
        methods: {
            clearUserToken() {
                localStorage.removeItem('user_token')
            },
            openNotification(position = null, color, title, text) {
                const noti = this.$vs.notification({
                    flat: true,
                    color,
                    position,
                    title: title,
                    text: text,
                })
            },
            async loginClick() {
                this.clearUserToken();
                let data = new FormData();
                data.append('username', this.login);
                data.append('password', this.password);
                let config = {
                    method: 'post',
                    url: 'http://aspt.tgc2-energo.ru/token',
                    data: data
                };
                const loading = this.$vs.loading({
                    type: 'square',
                    background: this.color,
                    color: '#05abb4'
                })
                await axios(config)
                    .then(function (response) {
                        localStorage.setItem('user_token', response.data.access_token);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                if (localStorage.getItem('user_token')) {
                    this.active = !this.active;
                    await this.loadData();
                    loading.close();
                } else {
                    this.openNotification('bottom-center', 'danger', 'Вы не вошли', 'Попробуйте снова')
                    loading.close();
                }
            },
            async loadData() {
                let data = new FormData();
                let token = localStorage.getItem('user_token');
                let config = {
                    method: 'get',
                    url: 'http://aspt.tgc2-energo.ru/User',
                    headers: {
                        "Authorization": "Bearer " + token
                    },
                    data: data
                };

                await axios(config)
                    .then(response => {
                        this.login = response.data.login;
                        this.$emit('update:login', this.login);
                        
                        this.userFullName = response.data.fullName;
                        this.$emit('update:fullName', this.userFullName);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }
        }
    }
</script>

<style scoped>

</style>