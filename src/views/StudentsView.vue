<template>
  <div class="p-3">
    <router-link class="btn btn-light" to="/createStudents">
      <button class="btn">New Student</button>
    </router-link>
  </div>
  <list />
</template>

<script>
// @ is an alias to /src
/* eslint-disable vue/no-unused-components */
import list from "@/components/ListStudents.vue";
export default {
  name: "StudentsView",
  components: {
    list,
  },
};
</script>
