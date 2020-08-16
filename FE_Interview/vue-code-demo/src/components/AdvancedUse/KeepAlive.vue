<template>
  <div>
    <button @click="changeState('A')">A</button>
    <button @click="changeState('B')">B</button>
    <button @click="changeState('C')">C</button>

    <!-- <KeepAliveStageA v-if="state === 'A'" />
    <KeepAliveStageB v-if="state === 'B'" />
    <KeepAliveStageC v-if="state === 'C'" /> -->

    <keep-alive>
      <KeepAliveStageA v-if="state === 'A'" />
      <KeepAliveStageB v-if="state === 'B'" />
      <KeepAliveStageC v-if="state === 'C'" />
    </keep-alive>
  </div>
</template>

<script>
import KeepAliveStageA from "./KeepAliveStateA";
import KeepAliveStageB from "./KeepAliveStateB";
import KeepAliveStageC from "./KeepAliveStateC";

export default {
  components: {
    KeepAliveStageA,
    KeepAliveStageB,
    KeepAliveStageC,
  },
  data() {
    return {
      state: "A",
    };
  },
  methods: {
    changeState(state) {
      this.state = state;
    },
  },
};
</script>
