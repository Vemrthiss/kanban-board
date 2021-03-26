<template>
    <div class="main__board board">
        <form action="" class="board__category-form">
            <input type="text" placeholder="Add a new category" v-model="newCategory" class="main__input board__input">
            <AddBtn @new-category-submitted="addNewCategory" :customClass="'add-category'"></AddBtn>
        </form>
        <div class="board-field">
            <transition-group name="category">
                <BoardCategory v-for="categoryObj of existingCategories" :key="categoryObj.categoryTitle" :categoryObj="categoryObj"></BoardCategory>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import AddBtn from './buttons/AddBtn';
    import BoardCategory from './BoardCategory';

    export default {
        data() {
            return {
                newCategory: ''
            }
        },
        computed: {
            existingCategories() {
                return this.$store.getters.getCategories;
            }
        },
        methods: {
            addNewCategory() {
                if (this.newCategory) { // makes sures the input field isnt empty before submitting form
                    const newCategoryToAdd = this.newCategory;
                    if (this.existingCategories.find(categoryObj => categoryObj.categoryTitle === newCategoryToAdd)) { // makes sure that the category has not already been added
                        alert('This category has already been added!');
                    } else { // if category hasnt been added, add it to the store
                        this.$store.dispatch('addNewCategory', newCategoryToAdd); //adds new category to store
                    }
                    this.newCategory = ''; //reset the text input field
                }
            }
        },
        components: {
            AddBtn,
            BoardCategory
        }
    }
</script>

<style lang="scss" scoped>
    .board {
        overflow-x: scroll;
        overflow-y: scroll;
        display: grid;
        grid-template-rows: 10% 1fr;

        &__category-form {
            display: flex;
            align-items: center;
            align-self: start;
        }
        
        &__text {
            width: 100vw; //testing
        }

        &__input {
            width: 30rem;
        }

        & > * {
            padding-left: 1rem;
        }
    }

    .board-field {
        display: flex;
    }

    .category-enter-active, .category-leave-active {
        transition: all 1s;
    }

    .category-enter-from, .category-leave-to {
        opacity: 0;
    }

    .category-enter-from {
        transform: translateX(5rem);
    }

    .category-leave-to {
        transform: translateX(-5rem);
    }

    .category-leave-active {
        position: absolute;
    }

    .category-move {
        transition: transform 1s;
    }
</style>