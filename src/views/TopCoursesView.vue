<template>
  <div class="p-3">
    <router-link class="btn btn-light" to="/courses">
      <button class="btn">Return</button>
    </router-link>
  </div>
  <ShowTopCourses />
</template>
<script>
// @ is an alias to /src
/* eslint-disable vue/no-unused-components */
import ShowTopCourses from "@/components/ShowTopCourses.vue";
export default {
  name: "TopCourses",
  components: {
    ShowTopCourses,
  },
};
</script>
