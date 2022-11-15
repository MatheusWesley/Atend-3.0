<template>
  <div class="container mt-2">
    <b-alert show variant="danger">
      <h4 class="alert-heading">Listagem de soluções</h4> 
      Numero de soluções criadas: <b>{{ problemSolved.length }}</b>
      <hr>
      <b-form-group
      id="search-solution"
      description="Informe aqui apenas o titulo."
      label="Qual sua duvida?"
      label-for="search"
    >
      <b-form-input id="search" v-model="search" trim></b-form-input>
    </b-form-group>
    </b-alert>
    <div v-for="(problem, index) in filteredList" :key="index">
      <b-card
      :title="problem.title"
      :sub-title="'by: ' + problem.name"
      class="mt-3"
      >
        <hr>
        <b-card-text>
          <vue-markdown>
            {{ problem.description }}
          </vue-markdown>
        </b-card-text>
        <hr />
        <b-card-text class="small text-variant">Categoria: {{ problem.category }} </b-card-text>
        <b-button variant="success" size="sm" class="mr-2" @click="edit(index)">
          <b-icon icon="pencil-fill" aria-hidden="true"></b-icon>
        </b-button>
        <b-button variant="warning" size="sm" class="mr-2" @click="remove(problem, index)">
          <b-icon icon="trash2-fill" aria-hidden="true"></b-icon>
        </b-button>
      </b-card>
  </div>
    <!---------------------------------->
    <b-modal
      ref="modalRemove"
      hide-footer
      size="sm"
      centered
      title="Exclusão de registro"
      header-bg-variant="dark"
      header-text-variant="white"
    >
      <div class="d-block text-center">
        Deseja realmente excluir o registo?
      </div>
      <div class="mt-3 d-flex justify-content-end">
        <b-button variant="outline-secondary" class="mr-2" @click="hideModal">
          Cancelar
        </b-button>
        <b-button
          variant="outline-danger"
          class="mr-2"
          @click="confirmRemoveProblem"
        >
          Excluir
        </b-button>
      </div>
    </b-modal>
    <!---------------------------------->
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import ToastMixin from "@/mixins/toastMixin.js";

export default {
  name: "Things",
  problemSelected: [],
  mixins: [ToastMixin],
  components: {
    'vue-markdown': VueMarkdown,
  },
  data() {
    return {
      search: null,
      problemSolved: [],
    }
  },
  created() {

  this.problemSolved = localStorage.getItem("problemSolved")
      ? JSON.parse(localStorage.getItem("problemSolved"))
      : [];
},
methods: {
  edit(index) {
      console.log(index);
      this.$router.push({ name: "formscript", params: { index } });
    },

    remove(problem, index) {
      this.problemSelected = problem;
      this.problemSelected.index = index;
      this.$refs.modalRemove.show();
    },
    hideModal() {
      this.$refs.modalRemove.hide();
    },
    confirmRemoveProblem() {
      this.problemSolved.splice(this.problemSelected.index, 1);
      localStorage.setItem("problemSolved", JSON.stringify(this.problemSolved));
      this.hideModal();
      this.showToast("danger", "Excluido!", "Uma solução foi excluida.");
      window.location.reload(true)
    },
},
computed: {
    filteredList() {
      if (this.search) {
        return this.problemSolved.filter(item => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every(v => item.title.toLowerCase().includes(v));
        });
      } else {
        return this.problemSolved;
      }
    }
  }
}

</script>
