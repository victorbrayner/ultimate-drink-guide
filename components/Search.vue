<template>
  <div>
    <v-select
      v-model="selectedValue"
      label="Search by Category"
      :items="getCategories"
      variant="outlined"
      ></v-select>
      <v-btn 
        :disabled="!selectedValue"
        @click="searchByCategory(selectedValue)"
        block
        class="mt-2 rounded-xl elevation-3"
        color="primary"
      >
        Get Drinks
      </v-btn>
      <h3 class="pa-6 text-center">OR</h3>
      <v-spacer></v-spacer>
      <v-text-field v-model="name" clearable label="Search by Name" variant="outlined"></v-text-field>
      <v-btn 
        :disabled="!name"
        @click="searchByName(name)"
        block
        class="mt-2 rounded-xl elevation-3"
        color="primary"
      >
        Get Drinks
      </v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useDrinksStore } from "../store/drinks";

const selectedValue = ref()
const name = ref('')

const store = useDrinksStore();

const getCategories = computed(() => {
  return store.getCategories;
});

function searchByCategory (category: string) {
  store.fetchDrinksByCategory(category)
  this.name = ''
}

function searchByName (name: string) {
  store.fetchDrinksByName(name)
  this.selectedValue = null
}
</script>

<style scoped>

</style>
