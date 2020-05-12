import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/About'
import Home from '@/components/Home'
import CharSearch from '@/components/CharSearch'
import CharInfo from '@/components/CharInfo'
import ComicSearch from '@/components/ComicSearch'
import ComicInfo from '@/components/ComicInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/charSearch',
      name: 'CharSearch',
      component: CharSearch,

      children: [
        {
          meta: {
            showModal: true
          },
          path: ':charId',
          name: 'CharInfo',
          component: CharInfo,
          props: true
        }
      ]

    },
    {
      path: '/comicSearch',
      name: 'ComicSearch',
      component: ComicSearch,

      children: [
        {
          meta: {
            showModal: true
          },
          path: ':comicId',
          name: 'ComicInfo',
          component: ComicInfo,
          props: true
        }
      ]
    }
  ]
})
