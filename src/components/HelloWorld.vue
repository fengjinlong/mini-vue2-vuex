<template>
  <div class="hello">
    <p>name:{{ name }}</p>
    <p>age this 接受{{ age }}</p>
    <p>age 直接store 取值{{ this.$store.state.age }}</p>
    <p>age 计算属性:{{ getAge }}</p>
    <button @click="add">mutations btn</button
    ><!-- 异步减 -->
    <button @click="sub">Async Sub</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      name: "name",
      age: "age",
    };
  },
  computed: {
    getAge: function () {
      return this.$store.getters.myAge;
    },
  },
  created() {
    this.name = this.$store.getters.myName;
    this.age = this.$store.getters.myAge;
  },
  methods: {
    add() {
      this.$store.commit("addAge", 2);
    },
    sub() {
      this.$store.dispatch("asyncSub", 1);
    },
  },
};
</script>
