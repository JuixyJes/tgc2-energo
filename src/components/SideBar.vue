﻿
<template>
    <vs-sidebar
            square
            absolute
            v-model="active"
            open
    >
        <vs-button flat square block border :active="activeProfile" @click="activateProfile">
            <img src="/img/regular/bx-user.svg" alt="" height="30" @click="activateProfile">
            <span @click="activateProfile">Профиль</span>
        </vs-button>
        <vs-button flat square block border :active="activeAccountingObjects" @click="activateAccountingObjects">
            <img src="/img/regular/bx-id-card.svg" alt="" height="30" @click="activateAccountingObjects">
            <span @click="activateAccountingObjects">Объекты учета</span>
        </vs-button>

        <template #footer>
            <vs-row justify="space-between">
                <span style="height: 20px; margin-top: 15px">Сменить тему</span>
                <vs-switch style=" margin-top: 10px" v-model="switchActive" @click="changeTheme">
                    <img src="/img/solid/bxs-moon.svg" alt="" v-if="switchActive"/>
                    <img src="/img/solid/bxs-sun.svg" alt="" v-else/>
                    <template #circle>
                    </template>

                </vs-switch>
            </vs-row>
        </template>
    </vs-sidebar>
</template>

<script>
    export default {
        name: "SideBar",
        props: {
            theme: {
                type: String,
                required: false,
                default: 'dark'
            },
            activeObject: {
                type: String,
                required: true,
                default: 'Profile'
            }
        },
        data: () => ({
            active: 'home',
            activeProfile: true,
            activeAccountingObjects: false,
            switchActive: false,
        }),
        methods: {
            activateProfile() {
                this.activeProfile = true;
                this.activeAccountingObjects = false;
                this.$emit('update:activeObject', 'Profile');
            },
            activateAccountingObjects() {
                this.activeAccountingObjects = true;
                this.activeProfile = false;
                this.$emit('update:activeObject', 'AccountingObjects');
            },
            changeTheme() {
                if (this.switchActive) {
                    this.$emit('update:theme', 'light');
                } else {
                    this.$emit('update:theme', 'dark');
                }
            }
        }
    }
</script>

<style scoped>

</style>