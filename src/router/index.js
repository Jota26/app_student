import { createRouter, createWebHistory } from "vue-router";
import StudentsView from "../views/StudentsView.vue";
import CoursesView from "../views/CoursesView.vue";
import EditStudentsView from "../views/EditStudentsView.vue";
import ShowCoursesView from "../views/ShowCoursesView.vue";
import CreateStudentsView from "../views/CreateStudentsView.vue";
import CreateCoursesView from "../views/CreateCoursesView.vue";
import EditCoursesView from "../views/EditCoursesView.vue";
import TopCoursesView from "../views/TopCoursesView.vue";
const routes = [
  {
    path: "/",
    name: "/",
    component: StudentsView,
  },
  {
    path: "/students",
    name: "students",
    component: StudentsView,
  },
  {
    path: "/courses",
    name: "courses",
    component: CoursesView,
  },
  {
    path: "/createStudents",
    name: "createStudents",
    component: CreateStudentsView,
  },
  {
    path: "/editStudents/:id_student",
    name: "editStudents",
    component: EditStudentsView,
  },
  {
    path: "/showCourses/:id_student",
    name: "showCourses",
    component: ShowCoursesView,
  },
  {
    path: "/createCourses",
    name: "createCourses",
    component: CreateCoursesView,
  },
  {
    path: "/editCourses/:id_course",
    name: "editCourses",
    component: EditCoursesView,
  },
  {
    path: "/topCourse",
    name: "topCourse",
    component: TopCoursesView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
