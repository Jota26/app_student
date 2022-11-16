<template>
  <div class="row col-12 m-0 p-3">
    <div class="row col-12 m-0 p-0 border">
      <div class="col-12 row m-0 p-0 bg-light p-2">
        <div class="row col-1 m-0">#</div>
        <div class="row col-3 m-0">Name</div>
        <div class="row col-2 m-0">Hourtime</div>
        <div class="row col-2 m-0">Of</div>
        <div class="row col-2 m-0">to</div>
        <div class="row col-2 m-0">Numbers Students</div>
      </div>
      <div
        class="row col-12 m-0 p-2 border-top"
        v-for="(list_course, index) in list_courses"
        :key="list_course.id"
        v-bind:id="list_course.id"
      >
        <div class="row col-1 m-0">
          {{ index + 1 }}
        </div>
        <div class="row col-3 m-0">{{ list_course.name }}</div>
        <div class="row col-2 m-0">{{ list_course.hourtime }}</div>
        <div class="row col-2 m-0">{{ date_old }}</div>
        <div class="row col-2 m-0">{{ date_current }}</div>
        <div class="row col-2 m-0">{{ list_course.number_students }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
/* eslint-disable vue/no-unused-components */

import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";
export default {
  name: "ShowTopCourses",
  data: function () {
    return {
      list_courses: [],
      date_old: "",
      date_current: "",
    };
  },
  mounted: function mounted() {
    this.getCourses();
  },
  methods: {
    getCourses() {
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios.get("/api/students_courses/top_courses").then((res) => {
          if (res.data.result) {
            this.list_courses = res.data.data;
            this.date_current = res.data.date_current;
            this.date_old = res.data.date_old;
          }
        });
      });
    },
  },
};
</script>
