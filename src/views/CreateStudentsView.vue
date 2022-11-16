<template>
  <div class="p-3">
    <router-link class="btn btn-light" to="/">
      <button class="btn">Return</button>
    </router-link>
  </div>
  <formStudents />
</template>
<script>
// @ is an alias to /src
/* eslint-disable vue/no-unused-components */
import formStudents from "@/components/FormStudents.vue";
export default {
  name: "CreateStudentsView",
  components: {
    formStudents,
  },
};
</script>
