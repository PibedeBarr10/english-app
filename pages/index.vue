<template>
    <h1>hello world!</h1>
    <p>
        <!-- {{ data?.pageVisits }} -->
    </p>
    <div>
        <p
            v-for="(word, index) in allWords"
            :key="`word_${index}`"
        >
            {{ word.englishWord }} -> {{ word.polishWord }}
            <span
                style="color: red; cursor: pointer;"
                @click="deleteWord(word.id)"
            >
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

<script setup lang="ts">
// const { data } = await useFetch('/api/page-visits')

const allWords = ref()
await getAllWords()


async function getAllWords() {
    const { data } = await useFetch('/api/words')
    allWords.value = data.value?.allWords
}

const englishWord = ref('')
const polishWord = ref('')

async function submit() {
    const { data } = await $fetch('/api/word', {
        method: 'post',
        body: {
            englishWord: englishWord.value,
            polishWord: polishWord.value
        }
    })

    englishWord.value = ''
    polishWord.value = ''
    
    const result = await getAllWords()
    console.log('Successfully submitted', data)
    console.log('allWords', result)
}
async function deleteWord(id: number) {
    const { data } = await $fetch('/api/word', {
        method: 'delete',
        body: {
            id
        }
    })

    allWords.value = allWords.value.filter(word => word.id !== id)

    console.log('Successfully deleted', data)
}
</script>
