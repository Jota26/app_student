<template>
  <div class="p-3">
    <router-link class="btn btn-light" to="/">
      <button class="btn">Return</button>
    </router-link>
  </div>
  <ShowCourses />
</template>
<script>
// @ is an alias to /src
/* eslint-disable vue/no-unused-components */
import ShowCourses from "@/components/ShowCourses.vue";
export default {
  name: "ShowCoursesView",
  components: {
    ShowCourses,
  },
};
</script>
