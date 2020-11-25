<template>
    <div class="center">
        <!-- Таблицы -->
        <vs-table v-model="selected">
            <template #thead>
                <vs-tr>
                    <vs-th>
                        Наименование
                    </vs-th>
                </vs-tr>
            </template>
            <template #tbody>
                <vs-tr
                        :key="i"
                        v-for="(tr, i) in objects"
                        :data="tr"
                        :is-selected="selected === tr"
                >
                    <vs-td>
                        {{ tr.pointName }}
                    </vs-td>
                </vs-tr>
            </template>
        </vs-table>
        <vs-table style="margin-top: 10px" v-model="selectedReading">
            <template #thead>
                <vs-tr>
                    <vs-th sort @click="objectsReadings = $vs.sortData($event ,objectsReadings, 'period')">
                        Дата
                    </vs-th>
                    <vs-th sort @click="objectsReadings = $vs.sortData($event ,objectsReadings, 'value')">
                        Показание
                    </vs-th>
                </vs-tr>
            </template>
            <template #tbody>
                <vs-tr
                        :key="i"
                        v-for="(tr, i) in objectsReadings"
                        :data="tr"
                        :is-selected="selectedReading === tr"
                >
                    <vs-td>
                        {{formatDate(tr.period)}}
                    </vs-td>
                    <vs-td>
                        {{ tr.value }}
                    </vs-td>
                </vs-tr>
            </template>
        </vs-table>
        <div style="margin-top: 20px">
            <vs-button-group >
                <vs-button border success @click="activeAddingDialog=true">
                    Добавить запись
                </vs-button>
                <vs-button border danger @click="deleteReading(selectedReading.id)">
                    Удалить запись
                </vs-button> 
            </vs-button-group>
        </div>

        <!-- Диалог добавления показаний -->
        <vs-dialog blur v-model="activeAddingDialog">
            <template #header>
                <h4 class="not-margin">
                    Добавить показание
                </h4>
            </template>


            <div class="con-form">
                <vs-input type="date" v-model="inputDate" placeholder="Дата">
                </vs-input>
                <vs-input type="number" v-model="inputValue" placeholder="Показание">
                </vs-input>
            </div>

            <template #footer>
                <div class="footer-dialog">
                    <vs-button block @click="addReading">
                        Добавить
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
        name: "AccountingObjects",
        data: () => ({
            activeAddingDialog: false,
            editActive: false,
            edit: null,
            editProp: '',
            search: '',
            allCheck: false,
            page: 1,
            max: 3,
            active: 0,
            selected: null,
            selectedReading: null,
            objects: [],
            objectsReadings: [],
            inputDate: '',
            inputValue: '',
        }),
        mounted() {
            this.loadObjects();
        },
        watch: {
            selected() {
                this.loadReadings(this.selected.id);
            },
        },
        methods: {
            formatDate(date) {
                let newDate = date.toLocaleString()+'Z';
                newDate = new Date(newDate).toLocaleDateString('ru');
                return newDate
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
            async loadObjects() {
                let data = new FormData();
                let token = localStorage.getItem('user_token')
                let config = {
                    method: 'get',
                    url: 'http://aspt.tgc2-energo.ru/Points',
                    headers: {
                        "Authorization": "Bearer " + token
                    },
                    data: data
                };

                await axios(config)
                    .then(response => {
                        this.objects = response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            async loadReadings(id) {
                let data = new FormData();
                let token = localStorage.getItem('user_token')
                let config = {
                    method: 'get',
                    url: 'http://aspt.tgc2-energo.ru/Indication/' + id,
                    headers: {
                        "Authorization": "Bearer " + token
                    },
                    data: data
                };

                await axios(config)
                    .then(response => {
                        this.objectsReadings = response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            async deleteReading(id) {
                let token = localStorage.getItem('user_token');
                let config = {
                    method: 'delete',
                    url: 'http://aspt.tgc2-energo.ru/Indication/' + id,
                    headers: {
                        'Authorization': "Bearer " + token,
                    }
                };

                await axios(config)
                    .then(response => {
                        this.openNotification('bottom-center', 'success', 'Запись удалена', '');
                        this.loadReadings(this.selected.id);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            },
            async addReading() {

                let date = (new Date(this.inputDate).toISOString().slice(0, -1))
                let data = JSON.stringify({
                    "ownerId": this.selected.id,
                    "period": date,
                    "value": Number(this.inputValue)
                });
                let token = localStorage.getItem('user_token');
                let config = {
                    method: 'post',
                    url: 'http://aspt.tgc2-energo.ru/Indication/',
                    headers: {
                        'Authorization': "Bearer " + token,
                        'Content-Type': 'application/json'
                    },
                    data: data
                };

                await axios(config)
                    .catch(function (error) {
                        console.log(error);
                    });
                await this.loadReadings(this.selected.id);
                this.activeAddingDialog = !this.activeAddingDialog;
            }
        }
    }
</script>

<style scoped>

</style>