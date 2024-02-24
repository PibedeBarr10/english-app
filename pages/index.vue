<template>
    <h1 class="font-bold mb-4">
        English App
    </h1>
    <p>
        <!-- {{ data?.pageVisits }} -->
    </p>
    <ul>
        <li
            v-for="(word, index) in allWords"
            :key="`word_${index}`"
            class="flex justify-between mb-2"
        >
            <p>
                {{ word.englishWord }} -> {{ word.polishWord }}
            </p>
            <UButton
                icon="i-heroicons-trash"
                size="sm"
                square
                color="red"
                variant="solid"
                @click="deleteWord(+word.id)"
            />
        </li>
    </ul>

    <UDivider class="my-4" />

    <div>
        <h2 class="font-bold mb-4">
            Add new word
        </h2>
        <form
            class="flex flex-col gap-4"
            @submit.prevent="submit"
        >
            <UFormGroup label="English">
                <UInput
                    v-model="englishWord"
                    placeholder="English word..."
                />
            </UFormGroup>

            <UFormGroup label="Polish">
                <UInput
                    v-model="polishWord"
                    placeholder="Polish word..."
                />
            </UFormGroup>

            <UButton
                block
                type="submit"
            >
                Submit
            </UButton>
        </form>
    </div>
</template>

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
    if (!englishWord.value || !polishWord.value) {
        console.warn('Empty data')
        return
    }

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
