<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p
      @click="changeCounter"
    >store counter ------- {{$store.state.counter}}</p>
    <p
      @click="dispatchCounter(5)"
    >dispatch</p>
    <div>{{$store.getters.doubleCounter}}</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    changeCounter(){
      // console.log(this.$store)
      this.$store.dispatch("add")
    },
    dispatchCounter(payload){
      this.$store.dispatch('add', payload)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
