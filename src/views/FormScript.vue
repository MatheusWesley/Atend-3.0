<template>
  <div class="container mt-2">
    <b-alert show variant="danger">
      <h4 class="alert-heading">Nova Resolução</h4> 
      <hr>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="Titulo da resolução" label-for="input-1"
        description="Digite aqui um titulo para o problema resolvido.">
        <b-form-input id="input-1" v-model="form.title" type="text" placeholder="Titulo" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Autor" label-for="input-2">
        <b-form-input id="input-2" v-model="form.name" placeholder="Digite aqui seu nome" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Categotia" label-for="input-3">
        <b-form-select id="input-3" v-model="form.category" :options="categories"></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-4" label="Descrição"
        description="Ultilize a linguagem markdown para estilizar a forma que será exibida.">
        <b-form-textarea v-model="form.description" debounce="500" rows="8"
          placeholder="Descreva aqui o proceso que você ultilizou para resolver o problema." required />
      </b-form-group>
      <b-button type="submit" variant="primary" class="mr-1">Criar</b-button>
      <b-button type="reset" variant="danger">Limpar</b-button>
    </b-form>
  </b-alert>
  </div>
</template>
  
<script>
import ToastMixin from "@/mixins/toastMixin.js";
export default {
  name: "FormScript",
  mixins: [ToastMixin],
  data() {
    return {
      form: {
        title: '',
        name: '',
        category: null,
        description: '',
      },
      methodSave: 'new',
      problemSolved: [],
      categories: [{
        text: 'Qual categoria se encaixa melhor?', value: null
      },
        'Linux', 'Windows', 'Servidor', 'Caixa', 'Outros'],
      show: true
    }
  },
  // Exibe os objetos
  created() {
    if (
      this.$route.params.index === 0 ||
      this.$route.params.index !== undefined
    ) {
      this.methodSave = "update";
      let problemSolved = JSON.parse(localStorage.getItem("problemSolved"));
      this.form = problemSolved[this.$route.params.index];
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      console.log(event.target);
      // Criando o objeto
      if (this.methodSave === "update") {
        let problemSolved = JSON.parse(localStorage.getItem("problemSolved"));
        problemSolved[this.$route.params.index] = this.form;
        localStorage.setItem("problemSolved", JSON.stringify(problemSolved));
        this.showToast("success", "Salvo!", "Um atendimento foi atulizado.");
        this.$router.push({ name: "things" });
        return;
      }
      let problemSolved = localStorage.getItem("problemSolved")
        ? JSON.parse(localStorage.getItem("problemSolved"))
        : [];
      problemSolved.push(this.form);
      localStorage.setItem("problemSolved", JSON.stringify(problemSolved));
      this.showToast("primary", "Salvo!", "Novo atendimento criado.");
      this.$router.push({ name: "things" });


    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.category = null
      this.form.description = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },
}

</script>
  