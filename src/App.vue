<script setup>
  import { onMounted ,ref} from "vue";
  import {getGuest} from './../src/api/guest.api'

  const items= ref([])

  onMounted(async()=>{
    const resp = await getGuest()
    items.value=resp.data.guests
  })
</script>

<template>
  <pre>{{ items }}</pre>
</template>

