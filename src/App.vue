<template>
  <div>
    <Header />

    <div class="container">
      <h1 class="center">Поиск бюджетных оргназиаций</h1>

      <Options v-on:options="optionFilter" />

      <div class="filter_container">
        <p>Что удалось найти:</p>
      </div>

      <p v-if="this.error"> {{this.error}} </p>
      <Result 
        :contracts="contracts" 
        :options="options"
      />
    </div>

  </div>
</template>

<script>
import axios from 'axios'

import Header from './components/header'
import Options from './components/options'
import Result from './components/result'
import Contacts from './data/contacts.json'

export default {
  name: 'App',
  data() {
    return {
      contracts: [],
      options: [],
      error: ''
    }
  },
  methods: {
    title() {
      document.title = 'Государственные траты'
    },
    optionFilter(options) {
      this.options = options
      let Options = []

      if(this.options.contactNumber) Options.number = `http://openapi.clearspending.ru/restapi/v3/contracts/get/?regnum=${this.options.contactNumber}`
      
      if(this.options.contractDate) Options.signDate = `http://openapi.clearspending.ru/restapi/v3/contracts/get/?signDate=${this.options.contractDate}`

      if(this.options.innCustomer) Options.innCustomer = `http://openapi.clearspending.ru/restapi/v3/contracts/get/?customerinn=${this.options.innCustomer}`

      if(this.options.innSupplier) Options.innSupplier = `http://openapi.clearspending.ru/restapi/v3/contracts/get/?supplierinn=${this.options.innSupplier}`

      if(this.options.kppCustomer) Options.kppCustomer = `http://openapi.clearspending.ru/restapi/v3/contracts/get/?customerkpp=${this.options.kppCustomer}`

      if(this.options.kppSupplier) Options.kppSupplier = `http://openapi.clearspending.ru/restapi/v3/contracts/get/?supplierkpp=${this.options.kppSupplier}`

      if(this.options.adress) Options.adress = `http://openapi.clearspending.ru/restapi/v3/contracts/get/?customerregion=${this.options.adress}`

      if(this.options.fz) Options.fz = `http://openapi.clearspending.ru/restapi/v3/contracts/get/?fz=${this.options.fz}`

      
      // `http://openapi.clearspending.ru/restapi/v3/contracts/get/?regnum=0173100000414000011`
      console.log(Options)
    },
    async getContact() {
      try {
        const data = await axios.get('https://openapi.clearspending.ru/restapi/v3/contracts/top/?year=2021')
      
        // https://openapi.clearspending.ru/restapi/v3/contracts/top/?year=2021
        console.log(data)
        this.contracts = data
      } catch(e) {
        this.error = e
        let contacts = JSON.stringify(Contacts)
        let opt =  JSON.parse(contacts)
        this.contracts = opt.contracts.data
      }
    },
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
