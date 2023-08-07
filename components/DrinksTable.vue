<template>
  <div>
    <v-data-table
      v-model:page="page"
      :headers="headers"
      :items="props.tableMode === 'search' ? getDrinks : getSavedDrinks"
      item-value="name"
      :items-per-page="itemsPerPage"
      class="elevation-5 rounded-lg"
      hide-default-footer
    >
      <template v-slot:item.name="{ item }">
      <v-btn
        variant="text"
        @click="openDetailsByName(item.columns.name)"
        append-icon="mdi-chevron-left"
      >
        {{ item.columns.name }}
        <v-dialog
          :loading="loading"
          v-model="dialog"
          activator="parent"
        >
          <drink-details  @close-dialog="dialog = false" />
        </v-dialog>
      </v-btn>
    </template>
    <template v-slot:item.save="{ item }">
      <v-icon
        v-if="props.tableMode === 'search'"
        @click="saveDrink(item.columns.name, item.columns.category)"
        size="small"
        class="me-2"
        color="primary"
      >
        mdi-heart-plus
      </v-icon>
      <v-icon
        v-else
        @click="saveDrink(item.columns.name, item.columns.category)"
        size="small"
        class="me-2"
      >
        mdi-heart-minus
      </v-icon>
    </template>
    <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination
          v-model="page"
          :length="pageCount"
        ></v-pagination>
      </div>
    </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useDrinksStore } from "../store/drinks";

const props = defineProps({
  tableMode: String
})

const dialog = ref(false)
const page = ref(1)
const itemsPerPage = ref(8)

const store = useDrinksStore();

const getDrinks = computed(() => {
  return store.getDrinks;
});

const getLenghtOfDrinks = computed(() => {
  return store.getLenghtOfDrinks;
});

const getLenghtOfSavedDrinks = computed(() => {
  return store.getLenghtOfSavedDrinks;
});

const getSavedDrinks = computed(() => {
  return store.getSavedDrinks;
});

const pageCount = computed(() => {
  if (props.tableMode === 'search') {
    return Math.ceil(getLenghtOfDrinks.value / itemsPerPage.value)
  }
  return Math.ceil(getLenghtOfSavedDrinks.value / itemsPerPage.value)
});

const loading = computed(() => {
  return store.isLoading;
});

function openDetailsByName (name: string) {
  store.toggleLoading()
  store.fetchDrinkByName(name)
}

function saveDrink (name: string, category: string) {
  const drink = {name: name, category: category}
  store.saveDrink(drink)
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      headers: [
        {
          title: 'Drink',
          align: 'start',
          sortable: false,
          key: 'name',
        },
        { title: 'Category', align: 'center', sortable: false, key: 'category' },
        { title: 'Save', align: 'end', sortable: false, key: 'save' },
      ]
    }
  }
})
</script>