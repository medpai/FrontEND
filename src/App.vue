<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from './components/Sidebar.vue';
import { getUsers } from './api';  // Importer la fonction API

// Références réactives pour stocker les utilisateurs
const users = ref([]);
const route = useRoute();

// Appel à l'API pour récupérer les utilisateurs
onMounted(async () => {
  try {
    users.value = await getUsers();  // Récupérer les utilisateurs depuis l'API
  } catch (error) {
    console.error('Erreur lors du chargement des utilisateurs:', error);
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar conditionnellement affichée -->
    <Sidebar v-if="route.meta.showSidebar" />

    <!-- Zone principale, avec un padding à gauche si le Sidebar est affiché -->
    <div :class="[route.meta.showSidebar ? 'pl-64' : '']">
      <!-- Affichage de la vue du routeur -->
      <router-view />

      <!-- Affichage des utilisateurs récupérés depuis l'API -->
      <div class="mt-4 p-4">
        <h2 class="text-lg font-semibold">Liste des utilisateurs</h2>
        <ul v-if="users.length > 0">
          <li v-for="user in users" :key="user.id" class="py-2">
            {{ user.name }} ({{ user.email }})
          </li>
        </ul>
        <p v-else>Aucun utilisateur trouvé.</p>
      </div>
    </div>
  </div>
</template>
