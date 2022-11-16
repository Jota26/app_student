<template>
  <menuOptions msg="This is menu options" />
  <router-view />
</template>

<script>
// @ is an alias to /src
import menuOptions from "@/components/MenuOptions.vue";
/* eslint-disable vue/no-unused-components */
export default {
  name: "App",
  components: {
    menuOptions,
  },
};
</script>
