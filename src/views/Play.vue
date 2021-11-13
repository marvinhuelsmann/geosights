<template>
  <div v-if="isLoggedIn">
    <!-- InGame -->
    <div v-if="gameState.hasChooseGameSize">
      <div class="xl:pr-3 pl-2 xl:text-right pt-1">
        <a href="/"
           class="bg-gray-500 inline-flex items-center justify-center px-2 py-1 border border-transparent text-base font-medium rounded-md text-white hover:bg-gray-400">
          Abbrechen
        </a>
      </div>
        <h1 class="text-xl pl-3 font-bold">Punkte: <strong>{{ gameState.points }}</strong></h1>
        <h1 class="text-xl pl-3 font-bold">Sehenswürdigkeiten: <strong>{{
            gameState.alreadySeeSights
          }}</strong></h1>
      <div class="max-w-7xl mt-2 mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base xl:mt-1 mt-14 text-red-600 font-semibold tracking-wide uppercase">GeoSights</h2>
          <p
             class="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Wie heißt diese Sehenswürdigkeit?
          </p>
          <div class="flex items-center justify-center mt-4 mb-2">
            <div class="relative rounded-md shadow-sm">
              <input v-on:keydown.enter="submitForm" v-model="name" type="text" name="inputName" id="inputName"
                     class="focus:ring-indigo-500 text-center focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"/>
            </div>
          </div>
          <div>
            <div class="pr-3 mt-4 mb-2">
              <img :src="sight.image" alt="Sight">
            </div>
            <p class="mb-5 text-md">{{ sight.place }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- PreGame -->
    <div v-else class="max-w-7xl mt-2 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="text-base text-red-600 xl:mt-64 mt-52 font-semibold tracking-wide uppercase">GeoSights</h2>
        <p class="xl:text-5xl text-3xl mt-5 leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Wie viele Sehenswürdigkeiten willst du erraten?
        </p>
        <div>
          <div v-for="id in gameState.gameSizes" :key="id" class="mt-5 pr-3 pl-3 inline-flex rounded-md">
            <a style="cursor: pointer" class="bg-green-500 xl:text-3xl text-xl inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white hover:bg-green-400"
               @click="setGameSize(id)">
              {{ id }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Play from '../components/play.js'

export default Play

</script>
