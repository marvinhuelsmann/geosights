<template>
  <div v-if="isLoggedIn">
    <div class="max-w-7xl mt-12 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="text-base text-red-600 font-semibold xl:mt-64 md:mt-44 tracking-wide uppercase">GeoSights</h2>
        <p class="xl:text-5xl text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Dein Ergebniss
        </p>
        <div class="flex items-center justify-center xl:mt-8 md:mt-4 mt-8">
          <div class="relative">
            <h1 class="xl:text-6xl text-4xl xl:mt-2 md:mt-0 mt-7 font-bold">
              <strong>Super, {{ statistic.name }}!</strong>
            </h1>
            <h1 class="xl:text-4xl text-3xl xl:mt-3 mt-2 font-bold">
              Du hast <strong>{{ statistic.points }}</strong> Punkte erreicht und hast
              {{ statistic.sights }} Sehenswürdigkeiten gesehen!
            </h1>
            <div class="flex justify-center space-x-3">
              <a href="/play"
                 class="mt-4 bg-green-500 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white hover:bg-green-400">
                Nochmal
              </a>
              <a href="/"
                 class="mt-4 bg-blue-500 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white hover:bg-blue-400">
                Speichern
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Finish from '../components/finish.js'

export default Finish

</script>