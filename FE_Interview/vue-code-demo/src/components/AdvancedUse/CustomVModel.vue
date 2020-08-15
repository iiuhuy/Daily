<template>
  <!-- 例如：vue 颜色选择 -->
  <input
    type="text"
    :value="textName"
    @input="$emit('changeName', $event.target.value)"
  />
  <!--
		1. 上面的 input 使用了 :value 而不是 v-model
		2. 上面的 changeName 和 model.event 要对应起来
		3. textName 属性对应起来
	-->
</template>

<script>
export default {
  model: {
    prop: "textName", // 对应 props textName
    event: "changeName",
  },
  props: {
    textName: String,
    default() {
      return "";
    },
  },
};
</script>
