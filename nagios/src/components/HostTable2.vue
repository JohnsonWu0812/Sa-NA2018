<template>
  <vuetable ref="vuetable"
    api-url="http://localhost:3000/todo"
    :fields="['hostName', 'active']"
  ></vuetable>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'

export default {
  components: {
    Vuetable
  }
}
</script>
