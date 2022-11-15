<template>
  <div class="container mt-3 align-items-center">
    <b-alert show variant="primary">
      <h4 class="alert-heading">Novo Atendimento</h4> 
      <hr>
    <b-form novalidate>
      <!-- CAMPO NOME DO CLIENTE -->
      <b-input-group class="mb-2 mr-sm-2 mb-sm-1">
        <b-input-group-prepend is-text>
          <b-icon icon="person-fill"></b-icon>
        </b-input-group-prepend>
        <b-form-input
          id="cliente"
          v-model="form.cliente"
          type="text"
          placeholder="Nome"
          required
          autocomplete="off"
        ></b-form-input>
      </b-input-group>
      <!-- FIM NOME DO CLIENTE-->
      <!-- TRANSFERENCIA -->
      
      <b-input-group class="mb-2 mr-sm-2 mb-sm-1">
        <b-input-group-prepend is-text>
          <b-icon icon="badge-cc-fill"></b-icon>
        </b-input-group-prepend>
        <b-form-select
          :options="options"
          id="tranferencia"
          v-model="form.tranferencia"
          type="text"
          required
        >
          <template #first>
            <b-form-select-option :value="null" disabled
              >-- Enc --</b-form-select-option
            >
          </template>
        </b-form-select>
      </b-input-group>
      <!-- FIM TRANSFERENCIA -->
      <!-- NUMERO CONTATO -->
     
      <b-input-group class="mb-2 mr-sm-2 mb-sm-1">
        <b-input-group-prepend is-text>
          <b-icon icon="voicemail"></b-icon>
        </b-input-group-prepend>
        <b-form-input
          id="contato"
          v-model="form.contato"
          type="tel"
          placeholder="Ex: 85988888888"
          required
          autocomplete="off"
        ></b-form-input>
      </b-input-group>
      <!-- FIM NUMERO CONTATO -->
      <!-- CAMPO CNPJ DO CLIENTE -->
      
      <b-input-group class="mb-2 mr-sm-2 mb-sm-1">
        <b-input-group-prepend is-text>
          <b-icon icon="person-lines-fill"></b-icon>
        </b-input-group-prepend>
        <the-mask
          id="CNPJ"
          label="CNPJ/CPF"
          class="form-control"
          v-model="form.CNPJ"
          type="tel"
          placeholder="Ex: 00.000.000/0001-00"
          required
          autocomplete="off"
          :mask="['###.###.###-##', '##.###.###/####-##']"
        />
      </b-input-group>
      <!-- FIM CNPJ DO CLIENTE -->
      <!-- CAMPO BUILD -->
      
      <b-input-group class="mb-2 mr-sm-2 mb-sm-1">
        <b-input-group-prepend is-text>
          <b-icon icon="sort-numeric-down"></b-icon>
        </b-input-group-prepend>
        <b-form-input
          id="build"
          v-model="form.build"
          type="number"
          placeholder="Build"
          required
        ></b-form-input>
      </b-input-group>
      <!-- FIM BUILD -->
      <!-- CAMPO ASSUNTO -->
      
      <b-input-group class="mb-2 mr-sm-2 mb-sm-1">
        <b-input-group-prepend is-text>
          <b-icon icon="pen-fill"></b-icon>
        </b-input-group-prepend>
        <b-form-input
          id="assunto"
          v-model="form.assunto"
          type="text"
          placeholder="Motivo"
          required
        ></b-form-input>
      </b-input-group>
      <!-- FIM ASSUNTO -->
      <!-- CAMPO DESCRIÇÃO -->
    
      <b-input-group class="mb-2 mr-sm-2 mb-sm-1">
        <b-input-group-prepend is-text>
          <b-icon icon="cursor-text"></b-icon>
        </b-input-group-prepend>
        <b-form-textarea
          id="description"
          v-model="form.description"
          type="text"
          placeholder="Descreva aqui."
          autocomplete="off"
          rows="7"
        ></b-form-textarea>
      </b-input-group>
      <!-- FIM DESCRIÇÃO -->
      <!-- BOTÕES -->
      <hr>
      <b-button-group size="sm" class="mt-2">
        <b-button type="button" variant="info" @click="saveTask">
          <b-icon icon="archive-fill" aria-hidden="true"></b-icon> Salvar
        </b-button>
        <b-button type="reset" variant="secondary">
          <b-icon icon="backspace-fill" aria-hidden="true"></b-icon> Limpar
        </b-button>
      </b-button-group>
      <!-- FIM BOTÕES -->
    </b-form>
  </b-alert>
  </div>
</template>

<script>
import ToastMixin from "@/mixins/toastMixin.js";
// Local Component
import { TheMask } from "vue-the-mask";

// Local Directive
import { mask } from "vue-the-mask";

export default {
  name: "Form",
  components: { TheMask },
  directives: { mask },

  mixins: [ToastMixin],

  data() {
    return {
      form: {
        cliente: "",
        tranferencia: null,
        contato: "",
        description: "",
        CNPJ: "",
        build: "",
        assunto: "",
      },
      methodSave: "new",
      options: [
        { value: "Contratos", text: "Contratos" },
        { value: "Canais", text: "Canais" },
        { value: "Tesouraria", text: "Tesouraria" },
        { value: "Relacionamentos", text: "Relacionamentos" },
        { value: "Ura Principal", text: "Ura Principal" },
        { value: "Comercial", text: "Comercial" },
        { value: "Assistência Técnica", text: "Assistência Técnica" },
        { value: "Implantação/Treinamentos", text: "Implantação/Treinamentos" },
        { value: "Financeiro", text: "Financeiro" },
        { value: "Ouvidoria", text: "Ouvidoria" },
        { value: "Recepção", text: "Recepção" },
        { value: "Geração de Chave", text: "Chave" },
        { value: "SysPDV", text: "SysPDV" },
        { value: "Varejo Fácil", text: "Varejo Fácil" },
        { value: "Milênio", text: "Milênio" },
        { value: "Migração", text: "Migração" },
      ],
    };
  },

  created() {
    if (
      this.$route.params.index === 0 ||
      this.$route.params.index !== undefined
    ) {
      this.methodSave = "update";
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      this.form = tasks[this.$route.params.index];
    }
  },

  methods: {
    saveTask() {
      if (this.methodSave === "update") {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks[this.$route.params.index] = this.form;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        this.showToast("success", "Salvo!", "Um atendimento foi atulizado.");
        this.$router.push({ name: "list" });
        return;
      }

      let tasks = localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks"))
        : [];
      tasks.push(this.form);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      this.showToast("primary", "Salvo!", "Novo atendimento criado.");
      this.$router.push({ name: "list" });
    },
  },
};
</script>
