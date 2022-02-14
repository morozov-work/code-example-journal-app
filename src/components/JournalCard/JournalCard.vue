<template>
  <v-card
    class="
      d-flex
      flex-column
      justify-space-between
      pa-5
      rounded rounded-sm-sm rounded-xs-sm
    "
    @click="$emit('open', { component, route })"
  >
    <v-card-title class="journal-card__title d-flex flex-nowrap pa-0">
      <alert style="position: absolute; top: 20px; right: 20px" />
      <div class="d-flex align-center mr-2">
        <slot name="icon"></slot>
      </div>
      <p class="text-h6" style="word-break: normal; margin: 0">{{ title }}</p>
    </v-card-title>
    <v-card-text class="journal-card__content pa-0">
      <v-data-table
        :headers="headers"
        :items="meterings"
        hide-default-header
        hide-default-footer
        class="journal-card__content-table elevation-0"
      >
        <template v-slot:item="{ item, index }">
          <tr class="d-flex">
            <td
              class="journal-card__table-cell--pr d-flex align-center"
              :class="{ 'journal-card__table-cell--top': !index }"
            >
              {{ item.date }}
            </td>
            <td
              class="journal-card__table-cell d-flex align-center"
              :class="{ 'journal-card__table-cell--top': !index }"
            >
              {{ item.time }}
            </td>
            <v-spacer
              class="journal-card__table-spacer"
              :class="{ 'journal-card__table-cell--top': !index }"
            />

            <td
              class="journal-card__table-cell--pr d-flex align-center"
              :class="{ 'journal-card__table-cell--top': !index }"
            >
              {{ item.temperature1 }}
            </td>
            <td
              class="journal-card__table-cell--pr d-flex align-center"
              :class="{ 'journal-card__table-cell--top': !index }"
            >
              {{ item.temperature2 }}
            </td>
            <td
              class="journal-card__table-cell d-flex align-center"
              :class="{ 'journal-card__table-cell--top': !index }"
            >
              {{ item.percent }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions class="d-flex justify-space-between pa-0">
      <icon-btn @click="addMeasuring">
        <template v-slot:content>
          <add class="mr-2" />
          <span>Добавить замер</span>
        </template>
      </icon-btn>
      <div>
        <icon-btn class="mr-3" pop-up-content="Настройки" @click="showSettings">
          <template v-slot:content>
            <settings />
          </template>
        </icon-btn>
        <icon-btn
          class="mr-3"
          pop-up-content="Распечатать журнал за текущий месяц"
          @click="print"
        >
          <template v-slot:content>
            <print />
          </template>
        </icon-btn>
        <icon-btn
          pop-up-content="Загрузить журнал за текущий месяц"
          @click="download"
        >
          <template v-slot:content>
            <download />
          </template>
        </icon-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import IconBtn from "@/components/controls/IconBtn/IconBtn.vue";

import Add from "@/assets/icons/card/add.svg";
import Alert from "@/assets/icons/card/alert.svg";
import Download from "@/assets/icons/card/download.svg";
import Print from "@/assets/icons/card/print.svg";
import Settings from "@/assets/icons/card/settings.svg";

import "./JournalCard.scss";

export default {
  components: {
    IconBtn,
    Add,
    Alert,
    Download,
    Print,
    Settings,
  },

  name: "journal-card",
  props: {
    title: {
      type: String,
      required: true,
    },
    component: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      headers: [
        {
          text: "date",
          value: "date",
        },
        {
          text: "time",
          value: "time",
        },
        {
          text: "temperature1",
          value: "temperature1",
        },
        {
          text: "temperature2",
          value: "temperature2",
        },
        {
          text: "percent",
          value: "percent",
        },
      ],

      meterings: [
        {
          date: "16.06.2021",
          time: "10:37",
          temperature1: "5°С",
          temperature2: "3°С",
          percent: "66%",
        },
        {
          date: "16.06.2021",
          time: "10:37",
          temperature1: "5°С",
          temperature2: "3°С",
          percent: "66%",
        },
        {
          date: "16.06.2021",
          time: "10:37",
          temperature1: "5°С",
          temperature2: "3°С",
          percent: "66%",
        },
      ],
    };
  },

  methods: {
    addMeasuring() {
      console.log("call add measuring");
    },
    showSettings() {
      console.log("call show settings");
    },
    print() {
      console.log("call print");
    },
    download() {
      console.log("call download");
    },
  },
};
</script>
