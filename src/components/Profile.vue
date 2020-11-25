<template>
    <div>
        <vs-input label="Логин" label-placeholder="Логин" block :value="login"/>
        <vs-input label="ФИО" label-placeholder="ФИО" style="margin-top: 30px;" block :value="fullName"/>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Profile",
        props: {
            fullName: '',
            login: ''
        },
        data: () => ({
               
        }),
        methods:{
            
        }
    }
</script>

<style scoped>

</style>