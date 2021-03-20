<template>
    <div class="footer">
        <div class="footer__text">
            <p class="footer__text-content">Copyright &copy; Joel Tay</p>
        </div>

        <div class="footer__icon-group">
            <a class="footer__icon footer__icon-github" :href="githubLink">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-github" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                </svg>
            </a>

            <a class="footer__icon footer__icon-email" :href="emailLink">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <polyline points="3 7 12 13 21 7" />
                </svg>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                githubLink: "https://github.com/Vemrthiss/kanban-board",
                emailLink: "mailto:joeltwh1999@gmail.com"
            }
        }
    }
</script>

<style lang="scss" scoped>
    .footer {
        height: 10vh; //testing
        display: flex;
        justify-content: space-between;

        &__icon-group {
            display: flex;
        }

        &__icon {
            transition: all .3s;
            cursor: pointer;
            height: 4rem;
            width: 4rem;

            &:hover {
                transform: scale(1.1);
            }
        }
    }
</style>