<template>
    <Header></Header>
    <Main v-bind="$attrs"></Main>
    <Footer></Footer>
</template>

<script>
    import Footer from './Footer';
    import Header from './Header';
    import Main from './Main';

    export default {
        components: {
            Header,
            Footer,
            Main
        }
    }
</script>

<style lang="scss" scoped>

</style>