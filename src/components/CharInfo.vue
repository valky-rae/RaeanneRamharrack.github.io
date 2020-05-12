/* eslint-disable */
<template>
<transition name="component-fade" mce="in-out" appear>
<div class="char">
  <div class="char-profile">
    <div class="char-poster">
        <span id="poster-back">
            <img :src="character.thumbnail.path + '.' + character.thumbnail.extension "/>
        </span>
        <span id="poster-front">
          <img :src="character.thumbnail.path + '.' + character.thumbnail.extension " width="200" height="200"/>
        </span>
    </div>
    <div class="char-info">
      <div id="heading">
          <h1>{{  character.name  }}</h1>
          <router-link to="/charSearch" style="  position: absolute; right: 0;">X</router-link>
      </div>
      <div id="info">
        <span>{{  character.description  }}</span>
        <a :href="character.urls[1].url">More Info</a>
      </div>
    </div>
  </div>
  <div v-if="character.comics.available > 0" class="comics-container">
    <div class="comic-head">
      <h2>Comics</h2>
    </div>
    <div class="char-comics"
      v-for="comics in allComics"
      :key="comics.id"
      style="background-image: url('https://image.freepik.com/free-vector/blue-halftone-comic-background_23-2147915001.jpg; width: 200px; height:200px')"
    >
      {{ comics.title }}<img class="tiles" :src="comics.thumbnail.path + '.' + comics.thumbnail.extension " width="200"/>
    </div>
    <div class="comic-foot">
      <a :href="character.urls[2].url">More Comics</a>
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
      character: '',
      publicKey: '1a1f59220896052a0856d1d7c60c752c',
      privateKey: 'a97ede64f792adc25199c54daf5ff18ab17b28d6',
      index: 0,
      results: [],
      allComics: [],
      comic: ''
    }
  },
  created () {
    // try {
    //   this.character = this.$parent.character
    // } catch (error) {
    //   console.log(error)
    // }
    if (this.$route.params.charId) {
      this.charId = this.$route.params.charId
    }
    if (this.$route.params.char) {
      this.character = this.$route.params.char
    }
    if (this.character.comics.available > 0) {
      for (this.el in this.character.comics.items) {
        this.getComic(this.character.comics.items[this.el].resourceURI)
        console.log(this.character.comics.items[this.el].resourceURI)
      }
    }
  },
  methods: {
    getComic: function (path) {
      // makes an api call to a string and returns the result json
      // alert('api fuction called')
      let ts = new Date()
      ts = ts.getUTCMilliseconds()
      let hash = CryptoJS.MD5(ts + this.privateKey + this.publicKey).toString()
      console.log(hash)
      fetch(path + '?&ts=' + ts + '&apikey=' + this.publicKey + '&hash=' + hash)
      // fetch('https://gateway.marvel.com/v1/public/comics?titleStartsWith=' + this.input + '&apikey=' + this.publicKey)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          // console.log(data)
          this.results = data.data.results
          console.log(this.results)
          this.comic = this.results[0]
          this.allComics.push(this.results[0])
          console.log(this.allComics[0])
          console.log(this.comic)
          // console.log(data.data.results[0])
        })
    }
  }
}

</script>

<style scoped>
/* .char {
} */
.char-profile {
    border-radius: 10px;
    border: 5px solid black;
    background-color:blue;
    display: flex;
    flex-direction: row;
    overflow: hidden;
}
.char-poster {
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
.char-info {
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
#char-name {
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
.char-comics {
  display: inline-block;
  background-color: black;
  height: 200px;
  width: 200px;
  color: white;
  margin: 20px;
  text-align: center;
  background-color: blue;
}
</style>
