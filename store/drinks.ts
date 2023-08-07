import axios from "axios"
import { toRaw } from 'vue';
import nuxtStorage from 'nuxt-storage';

interface Drink {
  strDrink: string;
  strCategory?: string;
}

interface DrinkState {
  drinks: Drink[];
  categories: { strCategory: string }[];
  drinksByName: Drink[];
  uniqueCategory: string;
  loading: boolean;
  savedDrinks: Drink[];
}

export const useDrinksStore = defineStore('drink', {
  state: (): DrinkState => ({
    drinks: [],
    categories: [],
    drinksByName: [],
    uniqueCategory: '',
    loading: false,
    savedDrinks: [],
  }),
  getters: {
    getDrinks(state: DrinkState) {
      const formattedDrinks: Drink[] = [];
      state.drinks.forEach((drink: Drink) => {
        formattedDrinks.push({
          name: drink.strDrink,
          category: drink.strCategory ? drink.strCategory : state.uniqueCategory,
        });
      });
      return formattedDrinks;
    },
    getCategories(state: DrinkState) {
      const formattedCategories: Drink[] = [];
      state.categories.forEach((category) => {
        formattedCategories.push(category.strCategory);
      });
      return formattedCategories;
    },
    getDrinkDetails(state: DrinkState) {
      return state.drinksByName;
    },
    getDrinksByName(state: DrinkState) {
      const formattedDrinks: any[] = [];
      state.drinksByName.forEach((drink: Drink) => {
        formattedDrinks.push({ name: drink.strDrink, category: drink.strCategory });
      });
      return formattedDrinks;
    },
    isLoading(state: DrinkState) {
      return state.loading;
    },
    getIngredientsOfDrink(state: DrinkState) {
      const drink = toRaw(state.drinksByName[0]);
      const ingredients = [];
      for (const prop of Object.keys(drink)) {
        if (drink[prop] !== null && prop.includes('strIngredient')) {
          ingredients.push(drink[prop]);
        }
      }
      return ingredients;
    },
    getInstructionsOfDrink(state: DrinkState) {
      const drink = toRaw(state.drinksByName[0]);
      const instructions = [];
      const english = 'EN';
      for (const prop of Object.keys(drink)) {
        if (drink[prop] !== null && prop.includes('strInstructions')) {
          const language = prop.slice(15);
          instructions.push({
            language: prop === 'strInstructions' ? english : language,
            description: drink[prop],
          });
        }
      }
      return instructions;
    },
    getGlassOfDrink(state: DrinkState) {
      const drink = toRaw(state.drinksByName[0]);
      const glass = Object.keys(drink).find((prop) => prop === 'strGlass');
      return drink[glass];
    },
    getAlcoholicOfDrink(state: DrinkState) {
      const drink = toRaw(state.drinksByName[0]);
      const alcoholic = Object.keys(drink).find((prop) => prop === 'strAlcoholic');
      return drink[alcoholic];
    },
    getLenghtOfDrinks(state: DrinkState) {
      const drinks = toRaw(state.drinks);
      return drinks.length;
    },
    getLenghtOfSavedDrinks(state: DrinkState) {
      const drinks = toRaw(state.savedDrinks);
      return drinks.length;
    },
    getSavedDrinks(state: DrinkState) {
      return state.savedDrinks;
    },
  },
    actions: {
      fetchSavedDrinks() {
        const savedDrinks = nuxtStorage.localStorage.getData('drinks') || [];
        this.savedDrinks = savedDrinks
      },
      saveDrink(drink: { strDrink: string; strCategory?: string | undefined; }) {
        this.savedDrinks.push(drink)
        console.log(this.savedDrinks)
        nuxtStorage.localStorage.setData('drinks', this.savedDrinks, 1, 'h');
      },
      async fetchDrinkByName(name: string) {
        try {
          await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
          .then(data => this.drinksByName = data.data.drinks)
          .finally(() => this.toggleLoading())
          }
          catch (error) {
            alert(`Error while fetching drinks, ${error}`)
            console.log(`Error while fetching drinks, ${error}`)
        }
      },
      async fetchDrinksByName(name: string) {
        try {
          const data = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
          this.drinks = data.data.drinks
          }
          catch (error) {
            alert(`Error while fetching drinks, ${error}`)
            console.log(`Error while fetching drinks, ${error}`)
        }
      },
      async fetchDrinksByCategory(category: string) {
        try {
          const data = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
          this.drinks = data.data.drinks
          this.uniqueCategory = category
          }
          catch (error) {
            alert(`Error while fetching drinks, ${error}`)
            console.log(`Error while fetching drinks, ${error}`)
        }
      },
      async fetchCategories() {
        try {
          const data = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`)
          this.categories = data.data.drinks
          }
          catch (error) {
            alert(`Error while fetching categories, ${error}`)
            console.log(`Error while fetching categories, ${error}`)
        }
      },
      toggleLoading() {
        this.loading = !this.loading
      }
    },
})