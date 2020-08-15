<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item.id">
        {{ item.title }}
        <button @click="deleteItem(item.id)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script>
import event from "./event";

export default {
  // props: ['list']
  props: {
    // prop 类型和默认值
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    deleteItem(id) {
      this.$emit("delete", id);
    },
    addTitleHandler(title) {
      // eslint-disable-next-line
      console.log("%c on add title ", "color: pink", title); // 测试兄弟组件传递参数
    },
  },
  created() {
    // eslint-disable-next-line
    console.log("子: list created");
  },
  mounted() {
    // eslint-disable-next-line
    console.log("子: list mounted");

    // 绑定自定义事件
    event.$on("onAddTitle", this.addTitleHandler);
  },
  beforeUpdate() {
    // eslint-disable-next-line
    console.log("子: list before update");
  },
  updated() {
    // eslint-disable-next-line
    console.log("子: list updated");
  },
  beforeDestroy() {
    // 及时销毁，否则可能造成内存泄露
    // eslint-disable-next-line
    console.log("子: list beforeDestroy");
    event.$off("onAddTitle", this.addTitleHandler);
  },
  destroyed() {
    // eslint-disable-next-line
    console.log("子: list destroyed");
  },
};
</script>
