<template>
    <h1>hello world!</h1>
    <p>
        <!-- {{ data?.pageVisits }} -->
    </p>
    <div>
        <p v-for="(word, index) in allWords" :key="`word_${index}`">
            {{ word.englishWord }} -> {{ word.polishWord }}
            <span style="color: red; cursor: pointer;" @click="deleteWord(+word.id)">
                x
            </span>
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

<!-- eslint-disable no-console -->
<script setup lang="ts">
// const { data } = await useFetch('/api/page-visits')

const allWords = toRef(await getAllWords())

async function getAllWords() {
    const { data } = await useFetch('/api/words')
    return data.value?.allWords
}

const englishWord = ref('')
const polishWord = ref('')

async function submit() {
    const { data } = await useFetch('/api/word', {
        method: 'POST',
        body: {
            englishWord: englishWord.value,
            polishWord: polishWord.value,
        },
    })

    englishWord.value = ''
    polishWord.value = ''

    allWords.value = await getAllWords()
    console.log('Successfully submitted', data)
    console.log('allWords', allWords.value)
}
async function deleteWord(id: number) {
    const { data } = await $fetch('/api/word', {
        method: 'delete',
        body: {
            id,
        },
    })

    allWords.value = allWords.value?.filter(word => word.id !== id)

    console.log('Successfully deleted', data)
}
</script>
