<template>
  <div>
    <div class="py-3 bg-white">
      <div class="ml-2 inline-flex rounded-md shadow">
        <a @click="signInWithGoogle" href="#"
           class="bg-black inline-flex items-center justify-center px-3 py-1 border border-transparent text-base font-medium rounded-md text-white hover:bg-gray-400">
          {{ userDisplayName }}
        </a>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-red-600 font-semibold tracking-wide uppercase">GeoSights</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Eine bessere Art Sehenswürdigkeiten zu entdecken
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Mit GeoSights kannst du verschiedene Sehenswürdigkeiten auf der ganzen Welt erraten. Damit Punkte sammeln
            und dich dann mit diesen mit anderen vergleichen!
          </p>
          <div class="mt-5 inline-flex rounded-md shadow">
            <a href="/play"
               class="bg-green-500 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white hover:bg-green-400">
              Los Spielen
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-7 pr-1 pl-2">
      <div class="flex pb-3 justify-center flex-wrap ...">
        <div class="pr-3 mb-6" v-for="{ id, image, name, place } in sights" :key="id">
          <div class="max-w-2xl">
            <img :src='image' alt="Image">
          </div>
          <p class="text-3xl justify-center text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {{ name }}
          </p>
          <p class="leading-8 justify-center text-center text-xl text-gray-500">
            {{ place }}
          </p>
        </div>
      </div>
    </div>
    <div class="mt-4 mb-2">
      <p class="mt-4 max-w-2xl text-center justify-center text-xl text-gray-700 lg:mx-auto">
        © {{ new Date().getFullYear() }} - GeoSights von <strong>Marvin Hülsmann</strong>
        <br/>
        Vue.js // TailwindCSS hostet auf <strong>Firebase</strong> + FireStore
      </p>
    </div>
  </div>
</template>

<script>
import Home from '../components/home.js'
export default Home
</script>
