<template>
  <article v-if="page" class="article">
    <h1>{{ page.title }}</h1>
    <nuxt-content :document="page" />
  </article>
  <div v-else-if="error">
    {{error}}
  </div>
</template>
<style scoped>
.article {
  margin: 10px;
}
</style>
<script>
export default {
  async fetch () {
    try {
      this.page = await this.$content(`faust/${this.$route.params.page || 'index'}`).fetch();
    } catch(err) {
      this.error = err;
    }
  },
  data(){
    return {
        page: null,
        error: null
    }
  }
}
</script>