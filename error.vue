<template>
  <div class="container">
    <v-container>
      <v-card
        class="mx-auto elevation-20 rounded-xl"
        max-width="700"
      >
        <h1 v-if="error.statusCode === 404" class="text-center" >Whoops... 404. Look like you're lost</h1>
        <h1 v-else class="text-center">So... something not cool happened - {{ error.statusCode }} </h1>
        <v-btn
        block
        class="mt-2 elevation-3"
        color="primary"
        @click="goBack"
        >
          Back to the guide
        </v-btn>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
props: ['error'],
methods: {
  goBack() {
    this.$router.push('/');
  },
},
};
</script>

<style scoped lang="sass">
.container 
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  height: 100vh
</style>