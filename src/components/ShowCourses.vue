<template>
  <div class="row col-12 m-0 p-3 d-flex justify-content-center">
    <div class="row col-12 m-0 border p-3">
      <div class="row col-12 m-0">
        <h4 class="p-0">Student</h4>
        <div class="row col-6 mb-3 p-3">
          <label for="name" class="form-label">Name (*)</label>
          <input
            type="text"
            disabled
            v-model="name"
            required
            class="form-control"
            id="name"
          />
        </div>
        <div class="row col-6 mb-3 p-3">
          <label for="last_name" class="form-label">Last Name (*)</label>
          <input
            type="text"
            disabled
            v-model="last_name"
            required
            class="form-control"
            id="last_name"
          />
        </div>
      </div>
      <form @submit.prevent="assignCourse">
        <div class="row col-12 m-0">
          <div class="row col-6">
            <select class="form-select" required v-model="form.course_assign">
              <template
                v-for="(courses, index) in all_courses"
                v-bind:key="index"
              >
                <option v-bind:value="courses.id">
                  {{ courses.name }}
                </option>
              </template>
            </select>
          </div>
          <div class="row col-6 p-1 justify-content-around">
            <button type="submit" class="btn btn-primary col-10">
              Assign course to student
            </button>
          </div>
        </div>
      </form>
      <div
        class="text-center col-12 m-0 mt-5 border p-3"
        v-if="courses_student.length != 0"
      >
        <h4 class="p-0 mb-3">Courses Assigned</h4>
        <div class="row col-12 p-0 m-0 mb-1 d-flex justify-content-start">
          <div
            class="row col-6 p-0 m-0 mb-3"
            v-for="(value, index) in courses_student"
            v-bind:key="index"
          >
            <p class="col-11 m-0 alert alert-dark p-1 text-center">
              {{ value }}
            </p>
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
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

export default {
  data: () => ({
    name: "",
    last_name: "",
    all_courses: [],
    list_messages: [],
    title_messages: "",
    courses_student: [],
    form: {
      course_assign: "",
      id_student: "",
    },
  }),
  mounted() {
    if (this.$route.params.id_student) {
      this.form.id_student = this.$route.params.id_student;
      this.getStudent();
      this.getCoursesStudent();
      this.getAllsCourses();
    }
  },
  methods: {
    getStudent() {
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .get("/api/students/show_student/" + this.$route.params.id_student)
          .then((res) => {
            this.name = res.data.name;
            this.last_name = res.data.last_name;
          });
      });
    },
    getCoursesStudent() {
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .get(
            "api/students_courses/get_courses_student/" +
              this.$route.params.id_student
          )
          .then((res) => {
            this.courses_student = [];
            if (res.data.result) {
              let list_courses = res.data.data;
              list_courses.forEach((element) => {
                var course = element.name_course;
                this.courses_student.push(course);
              });
            }
          });
      });
    },
    getAllsCourses() {
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios.get("/api/courses/list_course").then((res) => {
          if (res.data.result) {
            this.all_courses = [];
            let list_courses = res.data.data;
            list_courses.forEach((element) => {
              var course = element;
              this.all_courses.push(course);
            });

            if (
              this.courses_student.length != 0 &&
              this.all_courses.length != 0
            ) {
              this.courses_student.forEach((course_assign) => {
                this.all_courses.forEach((course, index) => {
                  if (course.name == course_assign) {
                    this.all_courses.splice(index, 1);
                  }
                });
              });
            }
          }
        });
      });
    },
    assignCourse() {
      var open = this.OpenModal;
      var getCoursesStudent = this.getCoursesStudent;
      var getAllsCourses = this.getAllsCourses;
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .post("/api/students_courses/assign_student", this.form)
          .then((res) => {
            this.title_messages = res.data.message;
            this.list_messages = res.data.data;
            if (res.data.result) {
              getCoursesStudent();
              getAllsCourses();
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
