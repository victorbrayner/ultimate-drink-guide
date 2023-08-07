<template>
  <div>
    <v-tabs
      v-model="tab"
      fixed-tabs
    >
      <v-tab value="one">RESULTS</v-tab>
      <v-tab value="two">FAVORITES</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item key="one" value="one">
        <drinks-table table-mode="search" />
      </v-window-item>
      <v-window-item key="two" value="two">
        <drinks-table table-mode="favorites" />
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup lang="ts">
  const tab = ref(0)
</script>