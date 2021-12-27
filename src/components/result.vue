<template>
  <div class="result">
    <div class="result_inner">

      <div 
        v-for="contract of contracts" 
        :key="contract.id" 
        :id="contract.regNum"
        class="cart"
      >

        <div class="cart_item">
          <p>Номер контpакта:</p>
          <button class="fool-btn">{{contract.regNum}}</button>
        </div>

        <div class="cart_item">
          <p>Заказчик:</p>
          <button class="fool-btn"> {{contract.customer.fullName }}</button>
        </div>

        <div class="cart_item">
          <p>Поставщик:</p>
          <button class="fool-btn">{{ contract.suppliers[0].organizationName }}</button>
        </div>

        <div class="cart_item">
          <p>Предмет:</p>
          <button class="fool-btn">{{ contract.products[0].name }}</button>
        </div>

        <div class="cart_item">
          <p>Федеральный закон:</p>
          <button class="fool-btn">№ {{ contract.fz }} ФЗ</button>
        </div>

        <div class="cart_item">
          <p>Дата заключения:</p>
          <button class="fool-btn">{{ contract.signDate }}</button>
        </div>

        <div class="cart_item">
          <p>Цена:</p>
          <button class="fool-btn">{{contract.price}} рублей</button>
        </div>

        <button @click="downloadCart(contract.regNum)" class="download_btn">
          <img src="@/assets/download.png" alt="">
        </button>

      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      contractsData: this.contracts,
      optionsData: this.options
    }
  },
  props: ['contracts', 'options'],
  methods: {
    loger() {
      console.log(this.contractsData)
    },
    async downloadCart(id) {
      const Element = document.getElementById(id)
      console.log(Element)

      let href = `https://openapi.clearspending.ru/restapi/v3/contracts/get/?regnum=${id}`
      let cartData = await axios.get(href)

      const data = JSON.stringify(cartData.contracts.data)
      window.localStorage.setItem('arr', data)
      console.log(JSON.parse(window.localStorage.getItem('arr')))

      const blob = new Blob([data], {type: 'text/plain'})
      const e = document.createEvent('MouseEvents'),
      a = document.createElement('a')
      a.download = "test.json"
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
    }
  },
  mounted() {
    this.loger()
  }
}
</script>