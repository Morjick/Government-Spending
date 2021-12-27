<template>
  <div>
    <Header />

    <div class="container">
      <h1 class="center">Поиск бюджетных оргназиаций</h1>

      <Options v-on:options="optionFilter" />

      <div class="filter_container">
        <p>Что удалось найти:</p>
      </div>

      <!-- <p v-if="this.error"> {{this.error}} </p> -->
      <div v-if="this.loader" class="filter_container">
        <p class="center">Подождите, загружаем...</p>
      </div>
      
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
// import Contacts from '../data/contacts.json'

export default {
  name: 'App',
  data() {
    return {
      contracts: [],
      options: [],
      loader: false,
      // error: ''
    }
  },
  methods: {
    title() {
      document.title = 'Государственные траты'
    },
    optionFilter(options) {
      lodaer = true
      this.options = options
      let Options = []

      let startHref = 'http://openapi.clearspending.ru/restapi/v3/contracts/get/?'

      if(this.options.contactNumber) {
        Options.number = `&regnum=${this.options.contactNumber}`
        startHref += Options.number
      }
      
      if(this.options.contractDate) {
        Options.signDate = `&signDate=${this.options.contractDate}`
        startHref += Options.signDate
      }

      if(this.options.innCustomer) {
        Options.innCustomer = `&customerinn=${this.options.innCustomer}`
        startHref += Options.innCustomer
      }

      if(this.options.innSupplier) {
        Options.innSupplier = `&supplierinn=${this.options.innSupplier}`
        startHref += Options.innSupplier
      }

      if(this.options.kppCustomer) {
        Options.kppCustomer = `&customerkpp=${this.options.kppCustomer}`
        startHref += Options.kppCustomer
      }

      if(this.options.kppSupplier) {
        Options.kppSupplier = `&supplierkpp=${this.options.kppSupplier}`
        startHref += Options.kppSupplier
      }

      if(this.options.adress) {
        Options.adress = `&customerregion=${this.options.adress}`
        startHref += Options.adress
      }

      if(this.options.fz) {
        Options.fz = `&fz=${this.options.fz}`
        startHref += Options.fz
      }

      const data = await axios.get('https://openapi.clearspending.ru/restapi/v3/contracts/top/?year=2021')

      let contacts = JSON.stringify(data)
      let opt =  JSON.parse(contacts)
      this.contracts = opt.contracts.data
      this.loader = false

      // `http://openapi.clearspending.ru/restapi/v3/contracts/get/?regnum=0173100000414000011`
      
      console.log(Options)
    },
    async getContact() {
      this.loader = true
      try {
        const data = await axios.get('https://openapi.clearspending.ru/restapi/v3/contracts/top/?year=2021')
      
        // https://openapi.clearspending.ru/restapi/v3/contracts/top/?year=2021
        console.log(data)
        this.contracts = data
        this.loader = false
      } catch(e) {
        this.error = e
        let contacts = JSON.stringify(Contacts)
        let opt =  JSON.parse(contacts)
        this.contracts = opt.contracts.data
        this.loader = false
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
