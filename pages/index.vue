<template>
    <h1>hello world!</h1>
    <p>
        <!-- {{ data?.pageVisits }} -->
    </p>
    <div>
        <p
            v-for="(word, index) in data.allWords"
            :key="`word_${index}`"
        >
            {{ word.englishWord }} -> {{ word.polishWord }}
        </p>
    </div>
    <div>
        <form @submit.prevent="submit">
            <p>English</p>
            <input v-model="englishWord">

            <p>Polish</p>
            <input v-model="polishWord">

            <button type="submit">
                Submit
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
// const { data } = await useFetch('/api/page-visits')

const { data } = await useFetch('/api/words')

const englishWord = ref('')
const polishWord = ref('')

async function submit() {
    const { data } = await $fetch('/api/add-word', {
        method: 'post',
        body: {
            englishWord: englishWord.value,
            polishWord: polishWord.value
        }
    })

    console.log('Successfully submitted', data)
}
</script>
