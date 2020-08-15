<template>
  <div>
    <Input @add="addHandler" />
    <List :list="list" @delete="deleteHandler" />
  </div>
</template>

<script>
import Input from "./Input";
import List from "./List";

export default {
  components: {
    Input,
    List,
  },
  data() {
    return {
      list: [
        {
          id: "id-1",
          title: "标题1",
        },
        {
          id: "id-2",
          title: "标题2",
        },
      ],
    };
  },
  methods: {
    addHandler(title) {
      this.list.push({
        id: `id-${Date.now()}`,
        title,
      });
    },
    deleteHandler(id) {
      this.list = this.list.filter((item) => item.id !== id);
    },
  },
  created() {
    // eslint-disable-next-line
    console.log("父: index created");
  },
  mounted() {
    // eslint-disable-next-line
    console.log("父: index mounted");
  },
  beforeUpdate() {
    // eslint-disable-next-line
    console.log("父: index before update");
  },
  updated() {
    // eslint-disable-next-line
    console.log("父: index updated");
  },
  beforeDestroy() {
    // eslint-disable-next-line
    console.log("父: list beforeDestroy");
  },
  destroyed() {
    // eslint-disable-next-line
    console.log("父: list destroyed");
  },
};
</script>
