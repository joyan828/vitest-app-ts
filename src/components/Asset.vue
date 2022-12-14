<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { math } from '../utils/math'
import { $assetApi } from '../services/api.service'

const props = defineProps<{ loggedIn: boolean }>()

const total = ref<String>('0')
const tokens = ref<any>({})

const fetchTokens = async () => {
  if(props.loggedIn) {
    const res = await $assetApi.getTokensAccount()
    const sortedValue = sortDecending(res, 'balance')
    tokens.value = sortedValue;
  } else {
    const res = await $assetApi.getTokens()
    const sortedValue = sortDecending(res, 'totalSupply')
    tokens.value = sortedValue;
  }
}

const sum = (tokens: any) => {
  let totalVal = '0';
  for(const symbol in tokens) {
    const token = tokens[symbol]
    const estimatedVal = math('mul', token.USDValue, token.balance)
    totalVal = math('plus', totalVal, estimatedVal)
  }
  return totalVal
}

const sortDecending = (tokens: any, base: string) => {
  const arr = Object.values(tokens);
  return arr.sort((a:any, b:any) => Number(b[base]) - Number(a[base]))
}

onMounted(async () => {
  await fetchTokens();
})

watchEffect(async () => { 
  await fetchTokens()
  if(props.loggedIn) {
    total.value = sum(tokens.value)
  } else {
    total.value = '0'
  }
})

</script>

<template>
  <section>
    <h1 v-if="!loggedIn">All</h1>
    <h1 v-else>My</h1>
    <div class="total-balance">Your balance is $ <strong>{{ total }}</strong></div>

    <table class="tb">
      <colgroup>
        <col :style="{ width: '190px' }" />
        <col :style="{ width: '270px' }" />
        <col :style="{ width: '210px' }" />
        <col :style="{ width: '400px' }" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col" class="left">Token</th>
          <th scope="col">Amount</th>
          <th scope="col">Price</th>
          <th scope="col">Estimated Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="token in tokens" :key="token.symbol">
          <td class="left">
            <img
              :src="token.icon_image"
            />
            <span>{{token.symbol}}</span>
          </td>
          <td>
            <em class="balance" v-if="loggedIn">{{token.balance}}</em>
            <em data-test="total-supply" v-else>{{token.totalSupply}}</em>
          </td>
          <td>$ <em>{{token.USDValue}}</em></td>

          <td>
            $
            <em v-if="loggedIn">{{ math('mul', token.USDValue, token.balance) }}</em>
            <em v-else>{{ math('mul', token.USDValue, token.totalSupply) }}</em>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
export default {
  name: "Asset",
  props: {
    loggedIn: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
* {
  text-align: left;
}
h1 {
  font-size: 20px;
}
header {
  text-align: right;
}
.total-balance {
  margin-bottom: 50px;
}
thead { 
  height: 40px;
}
td {
  height: 40px;
}
td:first-child {
  display: flex;
  align-items: center;
}
td:first-child span {
  margin-left: 8px;
}
</style>
