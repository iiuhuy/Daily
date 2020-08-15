<template>
  <div>
    <p>vue 高级特性</p>
    <hr />

    <h4>自定义 v-model</h4>
    <p>{{ name }}</p>
    <CustomVModel v-model="name" />

    <h4>NextTick</h4>
    <NextTick />

    <h4>SlotDemo</h4>
    <SlotDemo :url="website.url">
      {{ website.title }}
    </SlotDemo>

    <br />

		<!-- 作用域插槽： -->
    <ScopedSlotDemo :url="website.url">
      <template v-slot="slotProps">
        {{ slotProps.slotData.title }}
      </template>
    </ScopedSlotDemo>

    <h4>动态组件</h4>
    <component :is="NextTickName" />

    <h4>异步组件</h4>
    <FormDemo v-if="showFormDemo" />
    <button @click="showFormDemo = true">show form demo</button>

    <h4>KeepAlive</h4>
    <KeepAlive />

    <h4>MixinDemo</h4>
    <MixinDemo />
  </div>
</template>

<script>
import CustomVModel from "./CustomVModel";
import NextTick from "./NextTick";
import SlotDemo from "./SlotDemo";
import ScopedSlotDemo from "./ScopedSlotDemo";
import KeepAlive from "./KeepAlive";
import MixinDemo from "./MixinDemo";

export default {
  components: {
    CustomVModel,
    NextTick,
    SlotDemo,
    ScopedSlotDemo,
    FormDemo: () => import("../BaseUse/FormDemo"),
    KeepAlive,
    MixinDemo,
  },
  data() {
    return {
      name: "乌兹永远滴神！",
      website: {
        url: "https://github.com/",
        title: "Github",
        subTitle: "GayHub",
      },
      NextTickName: "NextTick",
      showFormDemo: false,
    };
  },
};
</script>
<style>
h4 {
  color: purple;
}
</style>
