<template>
  <div class="container mt-2">
    <b-card
      bg-variant="dark"
      header="Nº Total de Atendimentos"
      text-variant="white"
      class="mb-1"
      align="center"
    >
      <h3 class="mb-0">
        <b-badge variant="info">{{ tasks.length }}</b-badge>
      </h3>
    </b-card>
    <b-card
      class="mb-1 mt-1"
      border-variant="dark"
      bg-variant="dark"
      text-variant="white"
    >
      <b-form-group class="mb-0">
        <b-input-group size="sm">
          <b-form-input
            id="filter-input"
            v-model="filter"
            type="search"
            placeholder="Pesquise seus atendimento aqui."
            autocomplete="off"
          ></b-form-input>
        </b-input-group>
      </b-form-group>
    </b-card>

    <!-- LISTAGEM COMEÇA AQUI -->
    <div>
      <!-- --------------------- -->
      <b-table
        :items="tasks"
        :fields="fields"
        :filter="filter"
        stacked
        small
        responsive="sm"
        dark
        hover
      >
        <template #cell(mais_detalhes)="row">
          <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? "Menos" : "Mais" }}
          </b-button>
        </template>

        <template #row-details="row">
          <b-card
            class="mb-2"
            border-variant="secondary"
            bg-variant="secondary"
            text-variant="white"
          >
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right">
                <b-badge to="/ramais" variant="success" class="mr-1">
                  {{ row.index + 1 }}
                </b-badge>
                <b-badge to="/ramais" variant="warning">
                  {{ row.item.tranferencia }}</b-badge
                >
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"
                ><b>Build: </b>{{ row.item.build }}</b-col
              >
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"
                ><b>Contato: </b>{{ row.item.contato }}</b-col
              >
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Descrição:</b></b-col>
              <b-col>{{ row.item.description }} </b-col>
            </b-row>

            <b-button
              variant="success"
              size="sm"
              class="mr-2"
              @click="edit((index = row.index))"
              > <b-icon icon="pencil-fill" aria-hidden="true"></b-icon>
              </b-button
            >
            <b-button
              variant="warning"
              size="sm"
              class="mr-2"
              @click="remove((task = row.item), (index = row.index))"
            ><b-icon icon="trash2-fill" aria-hidden="true"></b-icon>
            </b-button
            >
          </b-card>
        </template>
      </b-table>
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
        Deseja realmente excluir o registo
        <b>{{ taskSelected.cliente }}</b
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
      filter: null,
      taskSelected: [],
      fields: ["cliente", "CNPJ", "assunto", "mais_detalhes"],
      // Mudar cpfcnpj para CNPJ e subject para cliente
      tasks: [],
    };
  },

  created() {
    this.tasks = localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : [];
  },

  methods: {
    edit(index) {
      console.log(index);
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
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 9px;
  height: 9px;
}
::-webkit-scrollbar-thumb {
  background: #b3afb3;
  border-radius: 30px;
}
::-webkit-scrollbar-thumb:hover {
  background: #757075;
}
::-webkit-scrollbar-track {
  background: #dbdbdb;
  border-radius: 0px;
  box-shadow: inset 0px 0px 0px 0px #f0f0f0;
}
</style>