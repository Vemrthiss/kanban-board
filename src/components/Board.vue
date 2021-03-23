<template>
    <div class="main__board board">
        <form action="" class="board__category-form">
            <input type="text" placeholder="Add a new category" v-model="newCategory">
            <AddCategoryBtn @new-category-submitted="addNewCategory"></AddCategoryBtn>
        </form>
        <div class="board-field">
            <BoardCategory v-for="category of existingCategories" :key="category" :category="category"></BoardCategory>
        </div>
    </div>
</template>

<script>
    import AddCategoryBtn from './buttons/AddCategoryBtn';
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
                    if (this.existingCategories.includes(newCategoryToAdd)) { // makes sure that the category has not already been added
                        alert('This category has already been added!');
                    } else { // if category hasnt been added, add it to the store
                        console.log(newCategoryToAdd);
                        this.$store.dispatch('addNewCategory', newCategoryToAdd); //adds new category to store
                    }
                    this.newCategory = ''; //reset the text input field
                }
            }
        },
        components: {
            AddCategoryBtn,
            BoardCategory
        }
    }
</script>

<style lang="scss" scoped>
    .board {
        overflow-x: scroll;
        overflow-y: scroll;
        //width: 90vw;
        display: grid;
        grid-template-rows: 10% 1fr;
        
        &__text {
            width: 100vw; //testing
        }
    }

    .board-field {
        display: flex;
    }
</style>