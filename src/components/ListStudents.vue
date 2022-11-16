<template>
  <div class="row col-12 m-0 p-3">
    <div class="row col-12 m-0 p-0 border">
      <div class="col-12 row m-0 p-0 bg-light p-2">
        <div class="row col-1 m-0">#</div>
        <div class="row col-2 m-0">Name</div>
        <div class="row col-3 m-0">Last name</div>
        <div class="row col-1 m-0">Age</div>
        <div class="row col-3 m-0">Email Address</div>
        <div class="row col-2 m-0">Actions</div>
      </div>
      <div
        class="row col-12 m-0 p-2 border-top"
        v-for="(list_student, index) in list_students"
        :key="list_student.id"
        v-bind:id="list_student.id"
      >
        <div class="row col-1 m-0">
          {{ index + 1 }}
        </div>
        <div class="row col-2 m-0">{{ list_student.name }}</div>
        <div class="row col-3 m-0">{{ list_student.last_name }}</div>
        <div class="row col-1 m-0">{{ list_student.age }}</div>
        <div class="row col-3 m-0">
          {{ list_student.email_address }}
        </div>
        <div class="row col-2 m-0 d-flex justify-content-around">
          <div class="row col-3 p-0 btn" @click="editStudent(list_student.id)">
            <i class="bi bi-pencil"></i>
          </div>
          <div
            class="row col-3 p-0 btn"
            @click="getCourseStudent(list_student.id)"
          >
            <i class="bi bi-eye"></i>
          </div>
          <div class="row col-3 p-0 btn" @click="showCourse(list_student.id)">
            <i class="bi bi-card-checklist"></i>
          </div>
          <div
            class="row col-3 p-0 btn"
            @click="deleteStudent(list_student.id, index)"
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
  name: "ListStudents",
  data: function () {
    return {
      list_students: [],
      list_messages: [],
      title_messages: "",
    };
  },
  mounted: function mounted() {
    this.getStudents();
  },
  methods: {
    getStudents() {
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios.get("/api/students/list_student").then((res) => {
          this.list_students = res.data.data;
        });
      });
    },
    editStudent(id_student) {
      this.$router.push({
        name: "editStudents",
        params: {
          id_student: id_student,
        },
      });
    },
    showCourse(id_student) {
      this.$router.push({
        name: "showCourses",
        params: {
          id_student: id_student,
        },
      });
    },
    getCourseStudent(id_student) {
      var open = this.OpenModal;
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .get("api/students_courses/get_courses_student/" + id_student)
          .then((res) => {
            this.title_messages = res.data.message;
            this.list_messages = [];
            if (res.data.result) {
              let list_courses = res.data.data;
              list_courses.forEach((element) => {
                var course = element.name_course;
                this.list_messages.push(course);
              });
            } else {
              this.list_messages = [res.data.data];
            }
            open();
          });
      });
    },
    deleteStudent(id_student, index) {
      var open = this.OpenModal;
      this.list_students.slice(index);
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .delete("/api/students/delete_student/" + id_student)
          .then((res) => {
            this.title_messages = res.data.message;
            this.list_messages = res.data.data;
            if (res.data.result) {
              this.list_students.splice(index, 1);
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
