<template>
  <form @submit.prevent="updateCourse">
    <div class="row col-12 m-0 p-3">
      <div class="row col-12 m-0 p-3 border">
        <div class="col-12 row mb-3"><h4>Update course</h4></div>
        <div class="row col-6 mb-3 p-3">
          <label for="name" class="form-label">Name (*)</label>
          <input
            type="text"
            v-model="form.name"
            required
            class="form-control"
            id="name"
          />
        </div>
        <div class="row col-6 mb-3 p-3">
          <label for="last_name" class="form-label">Hourtime(*)</label>
          <select class="form-select" v-model="form.hourtime">
            <option
              v-for="option in options"
              v-bind:key="option"
              v-bind:value="option.value"
            >
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="row col-6 mb-3 p-3">
          <label for="InputEmail" class="form-label">Date start (*)</label>
          <input
            type="date"
            required
            v-model="form.date_start_course"
            name=""
            id=""
          />
        </div>
        <div class="row col-6 mb-3 p-3">
          <label for="age" class="form-label">Date end (*)</label>
          <input
            type="date"
            required
            v-model="form.date_end_course"
            name=""
            id=""
          />
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </div>
  </form>

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
              {{ value[0] }}
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
    form: {
      name: "",
      hourtime: "Morning",
      date_start_course: "",
      date_end_course: "",
    },
    options: [
      { text: "Morning", value: "Morning" },
      { text: "Afternoon", value: "Afternoon" },
      { text: "Night", value: "Night" },
    ],
    list_messages: [],
    title_messages: "",
  }),
  mounted() {
    if (this.$route.params.id_course) {
      this.getCourse();
    }
  },
  methods: {
    updateCourse() {
      var open = this.OpenModal;
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .put(
            "/api/courses/update_course/" + this.$route.params.id_course,
            this.form
          )
          .then((res) => {
            this.title_messages = res.data.message;
            this.list_messages = res.data.data;
            if (res.data.result) {
              this.$router.push("/courses");
            } else {
              open();
            }
          });
      });
    },
    getCourse() {
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .get("/api/courses/show_course/" + this.$route.params.id_course)
          .then((res) => {
            this.form.name = res.data.name;
            this.form.hourtime = res.data.hourtime;
            this.form.date_start_course = res.data.date_start_course;
            this.form.date_end_course = res.data.date_end_course;
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
