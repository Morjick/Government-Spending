<template>
  <div>
    <Header />

    <div class="container">
      <h1 class="center">Поиск бюджетных оргназиаций</h1>

      <Options v-on:options="optionFilter" />

      <div class="filter_container">
        <p>Что удалось найти:</p>
      </div>

      <Result />
    </div>

  </div>
</template>

<script>
import axios from 'axios'

import Header from './components/header'
import Options from './components/options'
import Result from './components/result'

export default {
  name: 'App',
  data() {
    return {
      options: []
    }
  },
  methods: {
    title() {
      document.title = 'Государственные траты'
    },
    optionFilter(options) {
      console.log(options)
    },
    async getContact() {
      const data = await axios.get('https://openapi.clearspending.ru/restapi/v3/contracts/top/?year=2021')
      
      // https://openapi.clearspending.ru/restapi/v3/contracts/top/?year=2021
      console.log(data)
      this.options = data

      this.editFilter()
    },
    editFilter() {
      console.log(this.options, 'hello')
    }
  },
  mounted() {
    this.title()
    this.getContact()
  },
  components: { Header, Options, Result, }
}
</script>

<style>
@import url('styles/css/style.min.css');
</style>
