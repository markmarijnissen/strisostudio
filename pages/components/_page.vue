<template>
  <article v-if="page">
    <h1>{{ page.title }}</h1>
    <nuxt-content :document="page" />
  </article>
  <div v-else-if="error">
    {{error}}
  </div>
</template>
<script>
export default {
  async fetch () {
    try {
      this.page = await this.$content(`components/${this.$route.params.page || 'index'}`).fetch();
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