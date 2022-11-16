<template>
  <div class="menu">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/students">
                <button class="btn">Students</button>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/courses">
                <button class="btn">Courses</button>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
