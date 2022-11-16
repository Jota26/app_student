<template>
  <div class="row col-12 m-0 p-3">
    <div class="row col-12 m-0 p-0 border">
      <div class="col-12 row m-0 p-0 bg-light p-2">
        <div class="row col-1 m-0">#</div>
        <div class="row col-3 m-0">Name</div>
        <div class="row col-2 m-0">Hourtime</div>
        <div class="row col-2 m-0">Date start</div>
        <div class="row col-2 m-0">Date end</div>
        <div class="row col-2 m-0">Actions</div>
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
        <div class="row col-2 m-0">{{ list_course.date_start_course }}</div>
        <div class="row col-2 m-0">
          {{ list_course.date_end_course }}
        </div>
        <div class="row col-2 m-0 d-flex justify-content-around">
          <div class="row col-3 p-0 btn" @click="editCourse(list_course.id)">
            <i class="bi bi-pencil"></i>
          </div>
          <div
            class="row col-3 p-0 btn"
            @click="deleteCourse(list_course.id, index)"
          >
            <i class="bi bi-trash"></i>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade show"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" id="dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ title_messages }}
          </h5>
          <button
            @click="CloseModal()"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div
            class="row col-12 m-0 p-2"
            v-for="(value, index) in list_messages"
            v-bind:key="index"
          >
            <div class="row col-12">
              {{ value }}
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="CloseModal()">
            Close
          </button>
        </div>
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
  name: "ListCourses",
  data: function () {
    return {
      list_courses: [],
      list_messages: [],
      title_messages: "",
    };
  },
  mounted: function mounted() {
    this.getCourses();
  },
  methods: {
    getCourses() {
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios.get("/api/courses/list_course").then((res) => {
          this.list_courses = res.data.data;
        });
      });
    },
    editCourse(id_course) {
      this.$router.push({
        name: "editCourses",
        params: {
          id_course: id_course,
        },
      });
    },
    deleteCourse(id_course, index) {
      var open = this.OpenModal;
      this.list_courses.slice(index);
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios.delete("/api/courses/delete_course/" + id_course).then((res) => {
          this.title_messages = res.data.message;
          this.list_messages = res.data.data;
          if (res.data.result) {
            this.list_courses.splice(index, 1);
          }
          open();
        });
      });
    },
    OpenModal() {
      var close = this.CloseModal;
      document.getElementById("exampleModal").style.display = "block";
      document.addEventListener("mouseup", function (event) {
        var obj = document.getElementById("dialog");
        if (!obj.contains(event.target)) {
          close();
        }
      });
    },
    CloseModal() {
      document.getElementById("exampleModal").style.display = "none";
    },
  },
};
</script>
