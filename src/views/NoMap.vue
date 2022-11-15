<template>
  <div class="container mt-2">
    <b-card
      bg-variant="secondary"
      header="Nº Atendimentos"
      text-variant="white"
      class="mb-1"
      align="center"
    >
      <h3 class="mb-0">
        <b-badge variant="info">{{ tasks.length }}</b-badge>
      </h3>
    </b-card>

    <!-- LISTAGEM COMEÇA AQUI -->
    <div v-for="(task, index) in tasks" :key="index">
      <b-card :title="task.cliente" class="mb-2" bg-variant="light">
        <b-badge variant="success" class="mb-1">N: {{ index + 1 }}</b-badge>
        <b-badge to="/ramais" variant="warning" class="mb-1 ml-1"
          >ENC: {{ task.tranferencia }}</b-badge
        >
        <b-card-text class="mb-1"><b>CNPJ/CPF: </b>{{ task.CNPJ }}</b-card-text>
        <b-card-text class="mb-1"
          ><b>Contato: </b>{{ task.contato }}</b-card-text
        >
        <b-card-text class="mb-1"><b>Build: </b>{{ task.build }}</b-card-text>
        <b-card-text class="mb-1"
          ><b>Assunto: </b> <i>{{ task.assunto }}</i></b-card-text
        >
        <b-card-text class="mb-1" style="white-space: pre-line"
          ><b>Descrição: </b>{{ task.description }}</b-card-text
        >
        <b-button-toolbar class="mt-3 mr-0">
          <b-button-group class="mr-1">
            <b-button title="Editar" @click="edit(index)">
              <b-icon
                icon="file-earmark"
                aria-hidden="true"
                variant="white"
              ></b-icon>
            </b-button>
            <b-button title="Excluir" @click="remove(task, index)">
              <b-icon
                icon="trash2"
                aria-hidden="true"
                variant="warning"
              ></b-icon>
            </b-button>
          </b-button-group>
        </b-button-toolbar>
      </b-card>
    </div>
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
        Deseja realmente excluir o registo <b>{{ taskSelected.cliente }}</b
        >?
      </div>
      <div class="mt-3 d-flex justify-content-end">
        <b-button variant="outline-secondary" class="mr-2" @click="hideModal">
          Cancelar
        </b-button>
        <b-button
          variant="outline-danger"
          class="mr-2"
          @click="confirmRemoveTask"
        >
          Excluir
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import ToastMixin from "@/mixins/toastMixin.js";
export default {
  name: "List",
  mixins: [ToastMixin],

  data() {
    return {
      tasks: [],
      taskSelected: [],
      atts: 1,
    };
  },

  created() {
    this.tasks = localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : [];
  },

  methods: {
    edit(index) {
      this.$router.push({ name: "form", params: { index } });
    },

    remove(task, index) {
      this.taskSelected = task;
      this.taskSelected.index = index;
      this.$refs.modalRemove.show();
    },

    hideModal() {
      this.$refs.modalRemove.hide();
    },

    confirmRemoveTask() {
      this.tasks.splice(this.taskSelected.index, 1);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      this.hideModal();
      this.showToast("danger", "Excluido!", "Um atendimento foi excluido.");
    },
  },
};
</script>
