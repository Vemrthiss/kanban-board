<template>
    <button class="btn danger-btn" :class="customClass">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        props: {
            customClass: String
        }
    }
</script>

<style lang="scss" scoped>
    .danger-btn {
        display: block;
        overflow: hidden;
        position: relative;
        background-color: #cccccc;
        transform: translate(0); //weird workaround for the below effect to work
        transition: color .3s;

        &:hover {
            color: white;
        }

        &:hover::before {
            width: 100%;
        }

        &::before {
            content: "";
            position: absolute;
            top:0;
            left: 0;
            width: 0%;
            height: 100%;
            z-index: -1;
            transition: width .3s;
            background-image: linear-gradient(to right, #bc4e9c, #f80759);
        }
    }
</style>