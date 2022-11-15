<template>
  <div class="container mt-2">
    <b-alert show variant="primary">
      <h4 class="alert-heading">Listagem de atendimentos</h4> 
      Numero de atendientos criados: <b>{{ tasks.length }}</b>
      <hr>
      <b-form-group
      id="search-atendimento"
      description="Informe aqui apenas o assunto."
      label="Busca na lista de atendimentos."
      label-for="search"
    >
      <b-form-input id="search" v-model="search" trim></b-form-input>
    </b-form-group>
    </b-alert>
    <!-- LISTAGEM COMEÇA AQUI -->
    <div v-for="(task, index) in filteredList" :key="index">
      <b-card
        :title="task.cliente"
        :sub-title="task.tranferencia"
        class="mb-2"
        bg-variant="light"
        sub-title-text-variant="danger"
      >
      <hr>
        <b-card-text>
          <p>
            <b-alert show variant="secondary">
              <b>CNPJ: </b>{{ task.CNPJ }}<br>
              <b>Contato: </b>{{ task.contato }} <br />
              <b>Build: </b>{{ task.build }}
            </b-alert>
          </p>
            <vue-markdown>
              {{ task.description }}
            </vue-markdown>
        </b-card-text>
        <hr />
        <b-card-text class="small text-muted"
          >Assunto: {{ task.assunto }} | Atendimento Numero:
          {{ index + 1 }}</b-card-text
        >
        <b-button variant="success" size="sm" class="mr-2" @click="edit(index)">
          <b-icon icon="pencil-fill" aria-hidden="true"></b-icon>
        </b-button>
        <b-button
          variant="warning"
          size="sm"
          class="mr-2"
          @click="remove(task, index)"
          ><b-icon icon="trash2-fill" aria-hidden="true"></b-icon>
        </b-button>
      </b-card>
      <!-- --------------------- -->
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
import VueMarkdown from 'vue-markdown'

export default {
  name: "List",
  mixins: [ToastMixin],

  data() {
    return {
      filter: null,
      taskSelected: [],
      fields: ["cliente", "CNPJ", "assunto", "mais_detalhes"],
      tasks: [],
      search: null,
      //dismissSecs: 5,
      //dismissCountDown: 0,
      showDismissibleAlert: false,
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
  components: {
    'vue-markdown': VueMarkdown,
  },
  computed: {
    filteredList() {
      if (this.search) {
        return this.tasks.filter(item => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every(v => item.assunto.toLowerCase().includes(v));
        });
      } else {
        return this.tasks;
      }
    }
  }
}
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