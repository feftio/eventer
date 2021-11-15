<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld :msg="number"/>
    <button @click="clicking" v-show="message == ''" style="width: 100px; height: 50px;">{{number}}</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data () {
    return {
      message: ''
    }
  },
  methods: {
    clicking () {
      this.message = Math.random()
    }
  },
  computed: {
    number () {
      return 'Number is: ' + this.message
    }
  },
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
