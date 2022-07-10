<template>
    <div id = "test">{{ test }}</div>
</template>

<script lang="ts">
export default {   
    data() {
        return {
            test: 'Hello world---from vue'
        }
    }
}
</script>

<style scoped>
    #test {
        color: blue;
    }
</style>
