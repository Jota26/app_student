<template>
  <div class="p-3">
    <router-link class="btn btn-light" to="/">
      <button class="btn">Return</button>
    </router-link>
  </div>
  <EditCourse />
</template>
<script>
// @ is an alias to /src
/* eslint-disable vue/no-unused-components */
import EditCourse from "@/components/EditCourses.vue";
export default {
  name: "EditCoursesView",
  components: {
    EditCourse,
  },
};
</script>
