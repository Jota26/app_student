<template>
  <form @submit.prevent="storeStudent">
    <div class="row col-12 m-0 p-3">
      <div class="row col-12 m-0 p-3 border">
        <div class="col-12 row mb-3"><h4>New student</h4></div>
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
          <label for="last_name" class="form-label">Last Name (*)</label>
          <input
            type="text"
            v-model="form.last_name"
            required
            class="form-control"
            id="last_name"
          />
        </div>
        <div class="row col-6 mb-3 p-3">
          <label for="InputEmail" class="form-label">Email address (*)</label>
          <input
            v-model="form.email_address"
            type="email"
            required
            class="form-control"
            id="InputEmail"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="row col-6 mb-3 p-3">
          <label for="age" class="form-label">Age (*)</label>
          <input
            type="number"
            v-model="form.age"
            required
            class="form-control"
            id="age"
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
      last_name: "",
      age: "",
      email_address: "",
    },
    list_messages: [],
    title_messages: "",
  }),
  methods: {
    storeStudent() {
      var open = this.OpenModal;
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios.post("/api/students/store_student", this.form).then((res) => {
          this.title_messages = res.data.message;
          this.list_messages = res.data.data;
          if (res.data.result) {
            this.$router.push("/");
          } else {
            open();
          }
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
