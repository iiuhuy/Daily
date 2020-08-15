<template>
  <a :href="url">
    <slot :slotData="website">
      {{ website.subTitle }}
      <!-- 默认值显示 subTitle ，即父组件不传内容时 -->
    </slot>
  </a>
</template>

<script>
export default {
  props: ["url"],
  data() {
    return {
      website: {
        url: "https://www.baidu.com",
        title: "百度一下",
        subTitle: "百度一下你就知道！？",
      },
    };
  },
};
</script>
