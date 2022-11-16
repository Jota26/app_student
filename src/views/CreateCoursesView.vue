<template>
  <div class="p-3">
    <router-link class="btn btn-light" to="/courses">
      <button class="btn">Return</button>
    </router-link>
  </div>
  <formCourses />
</template>
<script>
// @ is an alias to /src
/* eslint-disable vue/no-unused-components */
import formCourses from "@/components/FormCourses.vue";
export default {
  name: "CreateCoursesView",
  components: {
    formCourses,
  },
};
</script>
