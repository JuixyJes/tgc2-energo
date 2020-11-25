<template>
    <div id="app" :vs-theme="theme">
        <SideBar :theme.sync="theme" :active-object.sync="activeObject"/>
        <LoginDialog :login.sync="login" :full-name.sync="fullName" v-if="!login"/>
        <div class="app-container" :class="theme === 'light' ? 'light-theme':'dark-theme'"  style="height: 100vh !important; margin-left: 260px">
            <Profile :login="login" :full-name="fullName" v-if="activeObject === 'Profile'" style="margin-left: 120px; margin-right: 120px; padding-top: 100px"/>
            <AccountingObjects v-if="activeObject === 'AccountingObjects'" style="margin-left: 120px; margin-right: 120px;padding-top: 100px"/>
        </div>
    </div>
</template>

<script>
    import SideBar from "./components/SideBar";
    import LoginDialog from "./components/LoginDialog";
    import Profile from "./components/Profile";
    import AccountingObjects from "./components/AccountingObjects";

    export default {
        components: {
            AccountingObjects,
            Profile,
            LoginDialog,
            SideBar
        },
        data: () => ({
            activeObject: 'Profile',
            theme: 'light',
            login: '',
            fullName: '',
            loginDialogActive: true,
        }),
        methods: {
            
        }
    }
</script>

<style lang="stylus">
    getColor(vsColor, alpha = 1)
        unquote("rgba(var(--vs-" + vsColor + "), " +alpha + ")")

    getVar(var)
    unquote("var(--vs-" + var + ")")
    .app-container
      margin-left 260px  
        
    .dark-theme
        background-color #181818
        
    .light-theme
        background-color #dddddd
        
    .not-margin
        margin 0px
        font-weight normal
        padding 10px

    .con-form
        width 100%

        .flex
            display flex
            align-items center
            justify-content space-between

            a
                font-size .8rem
                opacity .7

                &:hover
                    opacity 1

        .vs-checkbox-label
            font-size .8rem

        .vs-input-content
            margin 10px 0px
            width calc(100%)

            .vs-input
                width 100%

    .footer-dialog
        display flex
        align-items center
        justify-content center
        flex-direction column
        width calc(100%)

        .new
            margin 0px
            margin-top 20px
            padding: 0px
            font-size .7rem

            a
                color getColor('primary') !important
                margin-left 6px

                &:hover
                    text-decoration underline

        .vs-button
            margin 0px
</style>
