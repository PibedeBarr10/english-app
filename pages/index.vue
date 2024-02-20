<template>
    <h1>hello world!</h1>
    <p>
        {{ data?.pageVisits }}
    </p>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/page-visits')
</script>
