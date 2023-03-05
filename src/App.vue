<script setup>
  import { onMounted ,ref} from "vue";
  import {getGuest} from './../src/api/guest.api'
  import HelloWorld from "./components/HelloWorld.vue";

  const itemsBbdd = ref([])
  const itemsFiltred = ref([])
  const filterName = ref('')
  const filterAcom = ref('')
  const numNinios = ref(0)
  const numAdultos = ref(0)

  let delayTimer;

  const searchNombre = () => {
      clearTimeout(delayTimer);
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
    const guest = resp.data.guests
    const element = []

    for (let index = 0; index < guest.length; index++) {
      if(!removeAccents(guest[index].nombre).toLowerCase().includes(removeAccents("test").toLowerCase())){
        element.push(guest[index])
        numAdultos.value = numAdultos.value + guest[index].numAdultos
        numNinios.value = numNinios.value + guest[index].numNinios
      }
    }

    itemsBbdd.value=element
    itemsFiltred.value=element
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
    <br>
    <label>Total menus adulto:{{ numAdultos}}</label>
    <br>
    <label>Total menus infantil:{{ numNinios}}</label>
  </div>
  <pre>{{ itemsFiltred }}</pre>
</template>

