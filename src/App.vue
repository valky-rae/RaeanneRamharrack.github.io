<template>
  <div id="app">
    <div id="navbar">
      <router-link class="rounded" to="/home"> Home </router-link>
      <router-link class="rounded" to="/comicSearch"> Comic Search </router-link>
      <router-link class="rounded" to="/charSearch"> Character Search </router-link>
      <router-link class="rounded" to="/about"> About </router-link>
    </div>
    <main>
      <router-view/>
    </main>
    <footer>
      <span>
        Copyright &copy; All Rights Reserved
        <!-- <img id="Vlogo" src="./assets/marvel-logo.jpg" width="100" height="67"> -->
      </span>
    </footer>
  </div>
</template>

<script>

export default {
}
</script>

<style>
body{
  /* background-image: url("../src/assets/backround.jpg"); */
  /* background-color: black; */
  /* background-repeat: no-repeat; */
  background-size: cover;
  overflow-y: scroll;
}
body.modal-open {
  overflow: hidden;
}
#app {
  text-align: center;
  color:white;
  margin-top: 2%;
  margin-bottom: 2%;
  font-family: 'Acme', cursive;
}
a {
    font-family: 'Bangers', cursive;
    color:white;
    text-decoration:  none;
    padding-left: 20px;
    padding-right: 16px;
  }
.rounded {
  font-size: 30px;
  color: white;
  border-radius: 30px;
  border: 3px solid white;
  width: 150px;
  height: 30px;
  padding-top: 5px;
  padding-bottom: 10px;
}
#navbar{
  margin-right: 60px;
  text-align: right;
  text-shadow: 3px 3px black;
}
#navbar :first-child {
  margin-right: 20px;
}
#navbar a:hover {
  background-color: white;
  color: red;
}

footer {
  font-family: 'Bangers', cursive;
  text-align: center;
  color: white;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
footer:hover {
  animation: rubberBand;
  animation-duration: 2s;
}
.component-fade-enter-active {
  animation: fadeInUp;
  animation-duration: 2s;
  animation-iteration-count: 1;
}
</style>
