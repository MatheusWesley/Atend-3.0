<template>
  <div id="app">
    <b-navbar type="dark" variant="dark" fixed="top" sticky>
      <b-navbar-brand @click="showModalAbout">
        <b-icon icon="bookmark" font-scale="1.2" />
        Atend 3.0
      </b-navbar-brand>
        <b-navbar-nav>
          <b-button-group>
            <b-dropdown right text="Listagem">
              <b-dropdown-item to="/">Atendimentos</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item to="/Things">Soluções</b-dropdown-item>
            </b-dropdown>
            <b-dropdown right text="Novo">
              <b-dropdown-item to="/form">Novo Atendimento</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item to="/FormScript">Nova Solução</b-dropdown-item>
            </b-dropdown>
          </b-button-group>
          </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="showModalRamais" title="Ramais" right>
            <b-icon icon="telephone"></b-icon>
          </b-nav-item>
        </b-navbar-nav>
    </b-navbar>
    <router-view />

    <!-- MODAL -->
    <b-modal ref="my-modal" size="lg" hide-footer title="Lista de Ramais">
     <Ramais />
    </b-modal>
    <b-modal ref="about-me" size="xl" hide-footer title="Sobre o Atend 3.0">
     <p>Sobre o Sistema</p>
    </b-modal>
  </div>
</template>

<script>
import Ramais from "./views/Ramais.vue";
// import Things from "./views/Things.vue";
export default {
  name: "App",
  components: {
    Ramais,
   // Things
  },
  methods: {
    showModalRamais() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    showModalAbout() {
      this.$refs["about-me"].show();
    }
  },
};
</script>