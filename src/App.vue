<script setup>
  import { onMounted ,ref} from "vue";
  import {getGuest} from './../src/api/guest.api'

  const itemsBbdd = ref([])
  const itemsFiltred = ref([])
  const filterName = ref('')
  const filterAcom = ref('')

  let delayTimer;

  const searchNombre = () => {
      clearTimeout(delayTimer);
      console.log()
      delayTimer = setTimeout(function() {
          itemsFiltred.value = itemsBbdd.value.filter(e => removeAccents(e.nombre).toLowerCase().includes(removeAccents(filterName.value).toLowerCase()))
      }, 500); // Will do the ajax stuff after 1000 ms, or 1 s
  }

  const searchAcompa = () => {
      clearTimeout(delayTimer);
      console.log(itemsBbdd.value)
      delayTimer = setTimeout(function() {
          itemsFiltred.value = itemsBbdd.value.filter(e => removeAccents(e.acompaniantesNombre).toLowerCase().includes(removeAccents(filterAcom.value).toLowerCase()))
      }, 500); // Will do the ajax stuff after 1000 ms, or 1 s
  }

  const removeAccents = (str) => {
    if(str !== null)
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    else return '';
  } 

  onMounted(async()=>{
    const resp = await getGuest()
    itemsBbdd.value=resp.data.guests
    itemsFiltred.value=resp.data.guests
  })
</script>

<template>
  <div>
    <label>Nombre</label><input type="text" v-model="filterName" @keydown="searchNombre()"/>
  </div>
  <div>
    <label>Acompañante</label><input type="text" v-model="filterAcom" @keydown="searchAcompa()"/>
  </div>
  <div >
    <label>Total:{{ itemsBbdd.length}}</label>
  </div>
  <pre>{{ itemsFiltred }}</pre>
</template>

