/* eslint-disable */
<template>
<transition name="component-fade" mce="in-out" appear>
<div class="comic-info">
  <div class="comic-profile">
    <div class="comic-poster">
        <span id="poster-back">
            <img :src="comic.thumbnail.path + '.' + comic.thumbnail.extension "/>
        </span>
        <span id="poster-front">
          <img :src="comic.thumbnail.path + '.' + comic.thumbnail.extension " width="200"/>
        </span>
    </div>
    <div class="comic-info">
      <div id="heading">
          <h1>{{  comic.title  }}</h1>
          <router-link to="/comicSearch" style="  position: absolute; right: 0;">X</router-link>
      </div>
      <div id="info">
        <span>{{  comic.description  }}</span>
      </div>
    </div>
  </div>
  <div class="creator-container" v-if="comic.creators.available > 0">
    <h2>Staff</h2>
    <div id="creators" >
      <p v-for="creator in comic.creators.items" :key="creator.name">{{  creator.name }} - {{  creator.role  }}</p>
    </div>
  </div>
  <div v-if="comic.characters.available > 0" class="comic-container">
    <h2>Characters</h2>
    <div class="character-profile" v-for="character in allCharacters" :key="character.id">
       {{ character.name }}<img class="tiles" :src="character.thumbnail.path + '.' + character.thumbnail.extension " width="200" height="200"/>
    </div>
  </div>
</div>
</transition>
</template>

<script>
import * as CryptoJS from 'crypto-js'
export default {
  data () {
    return {
      results: [],
      character: '',
      publicKey: '1a1f59220896052a0856d1d7c60c752c',
      privateKey: 'a97ede64f792adc25199c54daf5ff18ab17b28d6',
      allCharacters: [],
      comic: ''
    }
  },
  created () {
    if (this.$route.params.comicId) {
      this.comicId = this.$route.params.comicId
      console.log(typeof this.comicId)
    } else {
      this.comicId = 0
    }
    if (this.$route.params.comic) {
      this.comic = this.$route.params.comic
      console.log(typeof this.comic)
    } else {
      this.comic = {}
    }
    if (this.comic.characters.available > 0) {
      for (this.el in this.comic.characters.items) {
        this.getCharacter(this.comic.characters.items[this.el].resourceURI)
        console.log(this.comic.characters.items[this.el].resourceURI)
      }
    }
  },
  methods: {
    getCharacter: function (path) {
      // makes an api call to a string and returns the result json
      // alert('api fuction called')
      let ts = new Date()
      ts = ts.getUTCMilliseconds()
      let hash = CryptoJS.MD5(ts + this.privateKey + this.publicKey).toString()
      console.log(hash)
      fetch(path + '?&ts=' + ts + '&apikey=' + this.publicKey + '&hash=' + hash)
      // fetch('https://gateway.marvel.com/v1/public/characters?nameStartsWith=' + this.input + '&apikey=' + this.publicKey)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          console.log(data)
          this.results = data.data.results
          this.allCharacters.push(this.results[0])
        })
    }
  }
}

</script>

<style scoped>
.comic-info {
  background-color: transparent;
  display: flex;
}
.comic-profile {
    border-radius: 10px;
    border: 5px solid black;
    background-color:blue;
    display: flex;
    flex-direction: row;
    overflow: hidden;
}
.comic-poster {
    max-width: 300px;
    margin-right: 12px;
    display: flex;
    transform: translateZ(0);
    position: relative;
}
#poster-back {
    overflow: hidden;
    transform: rotate(5deg);
    top: -20%;
    width: 100%;
    position: absolute;
    bottom: -20%;
    left: -20%;
    height: 150%;
    background-color: gainsboro;
    transform: rotate(5deg);
}
#poster-back img {
    filter: blur(6px);
    object-fit: cover;
    width: 100%;
    height: 100%;
    transform: scale(1.4);
}
#poster-front {
    width: 200px;
    left: 56px;
    margin: auto;
    position: relative;
    display: block;
    align-self: center;
    background-color: lightgray;
    border-radius: 2px;
    z-index: 1;
}
#poster-front img {
    display: block;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.6) 0 6px 12px -6px;
}
.comic-info {
    /* border-radius: 10px;
    border: 5px solid black;
    background-color:blue;
    display: flex; */
    flex-direction: column;
    padding: 50px;
    text-align: left;
}
#head {
    display: flex;
    flex-direction: row;
}
#comic-name {
    display: inline-block;
    flex-grow: 10;
    align-self: flex-start;
    margin-left: auto;
    margin-right: auto;
}
#close {
    margin-left: auto;
    flex-grow: 0.1;
    text-align: right;
    display: inline-block;
}
#heading {
  display: flex;
  justify-content: center;
  position: relative;
}
#heading h1 {
    text-align: center;
}
#heading router-link {
  position: absolute;
  right: 0;
}
#info {
    overflow-y: hidden;
}
.creator-container {
  background-color: blue;
  display: flex;
  flex-direction: column;
}
.creator-container h2 {
  text-align: center;
}
#creators {
  margin-left: auto;
  margin-right: auto;
  display:inline-block;
}
.comic-container {
  text-align: center;
  background-color: black;
}
.character-profile {
  display: inline-block;
  background-color: black;
  height: 200px;
  width: 200px;
  color: white;
  margin: 20px;
  background-color: blue;
}
</style>
