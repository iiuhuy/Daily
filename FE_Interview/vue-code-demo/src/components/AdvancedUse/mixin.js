export default {
  data() {
    return {
      city: "深圳",
    };
  },
  methods: {
    showName() {
      // eslint-disable-next-line
      console.log(this.name);
    },
  },
  mounted() {
    // eslint-disable-next-line
    console.log("mixin mounted", this.name);
  },
};
