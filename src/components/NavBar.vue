﻿<template>
    <nav class="grey darken-3">
        <div class="nav-wrapper ">
            <v-col>
                <router-link to="/" class="brand-logo right" >
                    <img src="/img/logo_svnc.png" alt=""  style="margin-bottom: 100px" height="40">
                </router-link>
            </v-col>
        </div>
    </nav>
</template>

<script>
    export default {
        data: function () {
            return {
                menuVisible: false,
            }
        }
    }
</script>

<style lang="scss" scoped>
    nav {
        padding: 0 2rem;
    }
</style>