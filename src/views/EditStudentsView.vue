<template>
  <div class="p-3">
    <router-link class="btn btn-light" to="/">
      <button class="btn">Return</button>
    </router-link>
  </div>
  <EditStudent />
</template>
<script>
// @ is an alias to /src
/* eslint-disable vue/no-unused-components */
import EditStudent from "@/components/EditStudents.vue";
export default {
  name: "EditStudentsView",
  components: {
    EditStudent,
  },
};
</script>
