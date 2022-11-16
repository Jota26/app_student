<template>
  <div class="row col-12 m-0 p-3">
    <div class="row col-2">
      <router-link class="btn btn-light" to="/createCourses">
        <button class="btn">New Course</button>
      </router-link>
    </div>
    <div class="row col-2 offset-1">
      <router-link class="btn btn-light" to="/topCourse">
        <button class="btn">Top Courses</button>
      </router-link>
    </div>
  </div>
  <list />
</template>

<script>
// @ is an alias to /src
/* eslint-disable vue/no-unused-components */
import list from "@/components/ListCourses.vue";
export default {
  name: "CoursesView",
  components: {
    list,
  },
};
</script>
