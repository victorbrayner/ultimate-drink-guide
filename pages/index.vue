<template>
  <div>
    <v-container >
      <v-card
        class="mx-auto elevation-20 rounded-xl"
        max-width="700"
        title="Ultimate Drink Guide"
        prepend-icon="mdi-glass-cocktail"
      >
        <v-container>
          <search />
        </v-container>
        <v-container>
          <tables-tabs />
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useDrinksStore } from '../store/drinks';
import { onMounted } from "vue";

const store = useDrinksStore();

onMounted(() => {
  store.fetchSavedDrinks()
  store.fetchCategories()
});

</script>
