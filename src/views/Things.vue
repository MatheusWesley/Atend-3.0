<template>
  <div class="container mt-2">
    <b-alert show variant="danger">
      Olá, você tem <b>{{ problemSolved.length }}</b> soluções criadas!
    </b-alert>
    <div v-for="(problem, index) in problemSolved" :key="index">
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
  problemSolved: [],
  mixins: [ToastMixin],
  components: {
    'vue-markdown': VueMarkdown,
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
}

}

</script>
