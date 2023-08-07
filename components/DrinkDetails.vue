<template>
  <div>
    <v-card
      class="mx-auto elevation-20 rounded-xl"
      max-width="500"
      max-height="900"
      :title="getDrinkDetails[0].strDrink"
      :subtitle="getDrinkDetails[0].strCategory"
    >
      <v-card-text>
        <v-img
          width="200"
          class="mx-auto rounded-xl elevation-10"
          cover
          :src="getDrinkDetails[0].strDrinkThumb"
        ></v-img>
        <v-container>
          <div class="text-center">
            <v-chip
              class="ma-2"
              color="info"
              size="small"
            >
              {{ getAlcoholicOfDrink }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="primary"
              size="small"
            >
              {{ getGlassOfDrink }}
            </v-chip>
          </div>
        </v-container>
        <v-divider></v-divider>
        <v-container>
          <h1 class="text-h6 text-center pa-2">Instructions</h1>
          <v-tabs
            v-model="model"
            fixed-tabs
          >
            <v-tab
              v-for="i in getInstructionsOfDrink"
              :key="getInstructionsOfDrink.indexOf(i)"
              :value="getInstructionsOfDrink.indexOf(i)"
            >
              {{ i.language }}
            </v-tab>
          </v-tabs>
          <v-window v-model="model">
            <v-window-item
              v-for="i in getInstructionsOfDrink"
              :key="getInstructionsOfDrink.indexOf(i)"
              :value="getInstructionsOfDrink.indexOf(i)"
            >
              <v-card>
                <v-card-text>{{i.description}}</v-card-text>
              </v-card>
            </v-window-item>
          </v-window>
        </v-container>
        <v-divider></v-divider>
        <v-container>
          <div class="text-center">
            <v-chip
              v-for="ingredient in getIngredientsOfDrink"
              :key="getIngredientsOfDrink.indexOf(ingredient)"
              class="ma-2"
              size="small"
            >
              {{ ingredient }}
            </v-chip>
          </div>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="$emit('closeDialog')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useDrinksStore } from "../store/drinks";

const model = ref(0)

const store = useDrinksStore();

const getIngredientsOfDrink = computed(() => {
  return store.getIngredientsOfDrink;
});

const getDrinkDetails = computed(() => {
  return store.getDrinkDetails;
});

const getInstructionsOfDrink = computed(() => {
  return store.getInstructionsOfDrink;
});

const getGlassOfDrink = computed(() => {
  return store.getGlassOfDrink;
});

const getAlcoholicOfDrink = computed(() => {
  return store.getAlcoholicOfDrink;
});

</script>