<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <h1>HelloWorld</h1>
    <HelloWorld msg="Welcome to Your Vue.js App" />

    <h1>TplDemo</h1>
    <TplDemo />

    <h1>ConditionDemo</h1>
    <ConditionDemo />

    <h1>EventDemo</h1>
    <EventDemo />

    <h1>ComponentDemo</h1>
    <ComponentDemo />

    <h1>AdvancedUse</h1>
    <AdvancedUse />

    <h1>CartDemo</h1>
    <CartDemo />

    <h1>FormDemo</h1>
    <FormDemo />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import TplDemo from "./components/BaseUse/TplDemo";
import ConditionDemo from "./components/BaseUse/ConditionDemo";
import EventDemo from "./components/BaseUse/EventDemo";
import ComponentDemo from "./components/ComponentsDemo/index";
import AdvancedUse from "./components/AdvancedUse/index";
import CartDemo from "./components/Cart/index";
import FormDemo from "./components/BaseUse/FormDemo";

export default {
  name: "app",
  components: {
    HelloWorld,
    EventDemo,
    ComponentDemo,
    AdvancedUse,
    CartDemo,
    ConditionDemo,
    TplDemo,
    FormDemo,
  },
};
</script>

<style>
h1 {
  color: pink;
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
