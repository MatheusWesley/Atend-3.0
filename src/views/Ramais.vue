<template>
  <b-container fluid>
    <!-- Filtragem de Dados -->
    <b-row>
      <!-- Pesquisar digitando a informação -->
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Pesquisar"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Digite o ramal desejado aqui."
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >limpar</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <!-- Filtrar a pesquisa por um determinado campo -->
      <b-col lg="6" class="my-1">
        <b-form-group
          v-model="sortDirection"
          label="Filtrar por:"
          description="Caso deseje filtrar por um determinado campo, use-me."
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-checkbox-group
            v-model="filterOn"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          >
            <b-form-checkbox value="ramal">Ramal</b-form-checkbox>
            <b-form-checkbox value="numero">Numero</b-form-checkbox>
            <b-form-checkbox value="desc">Informações</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>
      <!-- Pesquisar por Pagina -->
      <b-col sm="6" md="7" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Tabela -->
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      show-empty
      small
      stacked
      @filtered="onFiltered"
    >
      <!-- FORMATAR NOME -->
      <template #cell(ramal)="row">
        {{ row.value.first }}
      </template>
      <!-- Ação de mais informações -->
      <template #cell(actions)="row">
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? "-" : "+" }}
        </b-button>
      </template>
      <!-- MAIS DETALHES -->
      <template #row-details="row">
        <b-card>
          <ul>
            <p>
              {{ row.item.desc }}
            </p>
          </ul>
        </b-card>
      </template>
    </b-table>
  </b-container>
</template>

<script>
export default {
  name: "Ramais",
  data() {
    return {
      // DECLARANDO ITENS
      items: [
        {
          numero: 31199,
          ramal: { first: "Contratos" },
          desc: "Setor responsavél pelos contratos.",
        },
        {
          numero: 31198,
          ramal: { first: "Canais" },
          desc: "Setor de canais",
        },
        {
          numero: 31197,
          ramal: { first: "Tesouraria" },
          desc: "Sem Informações.",
        },
        {
          numero: 31196,
          ramal: { first: "Relacionamentos" },
          desc: "Sem Informações.",
        },
        {
          numero: 31200,
          ramal: { first: "Ura Principal" },
          desc: "Sem Informações.",
        },
        {
          numero: 31201,
          ramal: { first: "Comercial" },
          desc: "Sem Informações.",
        },
        {
          numero: 31203,
          ramal: { first: "Assistência Técnica" },
          desc: "Sem Informações.",
        },
        {
          numero: 31204,
          ramal: { first: "Escritório" },
          desc: "Implantação.",
        },
        {
          numero: 31205,
          ramal: { first: "Financeiro" },
          desc: "Sem Informações.",
        },
        {
          numero: 31206,
          ramal: { first: "Ouvidoria" },
          desc: "Sem Informações.",
        },
        {
          numero: 31207,
          ramal: { first: "Recepção" },
          desc: "Sem Informações.",
        },
        {
          numero: 31211,
          ramal: { first: "Geração de Chave" },
          desc: "Sem Informações.",
        },
        {
          numero: 31212,
          ramal: { first: "SysPDV" },
          desc: "Sem Informações.",
        },
        {
          numero: 31213,
          ramal: { first: "Varejo Fácil" },
          desc: "Sem Informações.",
        },
        {
          numero: 31214,
          ramal: { first: "Milênio" },
          desc: "Sem Informações.",
        },
        {
          numero: 31215,
          ramal: { first: "Migração" },
          desc: "Sem Informações.",
        },
        {
          numero: 8521809070,
          ramal: {first: " EasyAssist 2" },
          desc: "Sistema que faz integração com o SysPDV 08005911177 "

        }
      ],
      // CAMPOS TABELA
      fields: [
        {
          key: "ramal",
          label: "Ramal",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "numero",
          label: "Número",
          sortable: true,
        },
        { key: "actions", label: "Mais Informações" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 7,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>