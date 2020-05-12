<template>
<transition name="component-fade" mce="in-out" appear>
    <div id="charSearch" >
        <input v-model="input" type="text" placeholder="Enter Character here..."/>
        <button v-on:click="getCharacter">Search</button>
        <!-- <div id="character"> -->
          <ul>
            <div >
            <transition-group name="component-fade" mce="in-out" appear>
              <router-link
                v-for="character in results" :key="character.id" id="character"
                tag="div"
                :to="{ name: 'CharInfo', params: {charId: character.id, char: character}}"
                style="background-image: url('https://image.freepik.com/free-vector/blue-halftone-comic-background_23-2147915001.jpg; width: 200px; height:200px')"
              >
                  {{ character.name }}<img class="tiles" :src="character.thumbnail.path + '.' + character.thumbnail.extension " width="200" height="200"/>
                </router-link>
            </transition-group>
            </div>
          </ul>
        <!-- </div> -->
        <div v-if="showModal" class="modal-route">
          <div class="modal-content">
            <router-view></router-view>
        </div>
      </div>
    </div>
</transition>
</template>

<script>
import * as CryptoJS from 'crypto-js'
export default {
  watch: {
    $route: {
      immediate: true,
      handler: function (newVal, oldVal) {
        this.showModal = newVal.meta && newVal.meta.showModal
        if (this.showModal) {
          document.body.classList.add('modal-open')
        } else {
          document.body.classList.remove('modal-open')
        }
      }
    }
  },
  data: function () {
    return {
      input: '',
      publicKey: '1a1f59220896052a0856d1d7c60c752c',
      privateKey: 'a97ede64f792adc25199c54daf5ff18ab17b28d6',
      results: [],
      showModal: false
    }
  },
  methods: {
    tester: function () {
      alert('hello heloo')
      console.log('TESTER FUNCTION')
    },
    getCharacter: function () {
      // makes an api call to a string and returns the result json
      // alert('api fuction called')
      let ts = new Date()
      ts = ts.getUTCMilliseconds()
      let hash = CryptoJS.MD5(ts + this.privateKey + this.publicKey).toString()
      console.log(hash)
      fetch('https://gateway.marvel.com/v1/public/characters?nameStartsWith=' + this.input + '&ts=' + ts + '&apikey=' + this.publicKey + '&hash=' + hash)
      // fetch('https://gateway.marvel.com/v1/public/characters?nameStartsWith=' + this.input + '&apikey=' + this.publicKey)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          this.results = data.data.results
        })
      // call get comics
    },
    getComics: function () {
      // gets comics related to the given character
    }
  }
}

</script>

<style scoped>
#charSearch{
  margin-top: 3%;
}
#character{
  display: inline-block;
  background-color: black;
  height: 200px;
  width: 200px;
  color: white;
  margin: 20px;
  text-align: center;
}
.tiles{
  background-image: center;
  background-position: center;
  background-position: cover;
}
.tiles:hover{
  animation: pulse;
  animation-duration: 3s;
}
.modal-route {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background:transparent;
  overflow-y: auto;
}
.modal-content {
  width: 50%;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%);
  background: transparent;
}
</style>
