<template>
  <main-layout>
    <template v-slot:content>
      <v-data-table
        dense
        class="elevation-1"
        :headers="headers"
        :items="items"
        sort-by="createdAt"
        :single-expand="true"
        :expanded.sync="expanded"
        item-key="key"
        show-expand
        @update:expanded="onExpand"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Журнал бактерицидных ламп</v-toolbar-title>
            <v-spacer></v-spacer>
            <action-btn @click="addItem"> Новая запись</action-btn>
            <modal-dialog :dialog="addDialog" title="Редактирование / Создание">
              <template v-slot:content>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.createdAt"
                      label="Создано"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </template>
              <template v-slot:controls>
                <div>
                  <action-btn @click="close"> Отмена </action-btn>
                  <action-btn @click="save"> Сохранить </action-btn>
                </div>
              </template>
            </modal-dialog>
            <modal-dialog :dialog="dialogDelete" max-width="400">
              <template v-slot:content>
                <v-row class="justify-center">
                  <span class="text-h5">Удалить запись?</span>
                </v-row>
              </template>
              <template v-slot:controls>
                <div>
                  <action-btn @click="closeDelete"> Отмена </action-btn>
                  <action-btn @click="deleteItemConfirm"> OK </action-btn>
                </div>
              </template>
            </modal-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:expanded-item="{ headers }">
          <td :colspan="headers.length">
            <h3>Информация</h3>
            <br />
            Всего часов: {{ expandedItemDetails.hours }}<br />
            Включена: {{ expandedItemDetails.enabled ? "да" : "нет" }}<br />
            Название прибора: {{ expandedItemDetails.name }}<br />
            Помещение: {{ expandedItemDetails.roomName }}
          </td>
        </template>
      </v-data-table>
    </template>
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout/MainLayout.vue";
import { getResource, getBactericidalLogs } from "@/api/bactericidalLogs";

export default {
  components: {
    MainLayout,
  },

  name: "bactericidal-log",

  data() {
    return {
      logs: [],
      headers: [
        {
          text: "Создано",
          align: "start",
          sortable: false,
          value: "createdAt",
        },
        { text: "Изменение", value: "delta" },
        { text: "Дата фиксации", value: "fixedDate" },
        { text: "Время начала", value: "timeStart" },
        { text: "Время окончания", value: "timeEnd" },
        { text: "Всего", value: "total" },
        { text: "Обновлено", value: "updatedAt" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [],
      expanded: [],
      addDialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        createdAt: "",
        delta: "",
        fixedDate: "",
        timeStart: "",
        timeEnd: "",
        total: "",
        updatedAt: "",
        key: "",
      },
      defaultItem: {
        createdAt: "",
        delta: "",
        fixedDate: "",
        timeStart: "",
        timeEnd: "",
        total: "",
        updatedAt: "",
        key: "",
      },
      expandedItem: {},
      expandedItemDetails: {
        hours: "",
        enabled: "",
        name: "",
        roomName: "",
      },
    };
  },

  methods: {
    async getData() {
      const response = await getBactericidalLogs();
      this.logs = response.data["hydra:member"];
    },

    formatDate(dateStr, format) {
      const options = {
        all: {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        },
        date: {
          year: "numeric",
          month: "long",
          day: "numeric",
        },
        time: { hour: "2-digit", minute: "2-digit" },
      };
      const date = new Date(dateStr);
      return format === "all" || format === "date"
        ? date.toLocaleDateString("ru-RU", options[format])
        : date.toLocaleTimeString();
    },

    addItem() {
      this.addDialog = true;
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.items.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.addDialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      } else {
        this.editedItem.key = this.items.length;
        this.items.push(this.editedItem);
      }
      this.close();
    },

    async onExpand(item) {
      if (!item.length) return;
      const data = item[0];
      if (data.key === this.expandedItem.key) return;
      this.expandedItem = data;
      const lampResponse = await getResource(data.lamp);
      const lamp = lampResponse.data;
      const roomResponse = await getResource(data.room);
      const room = roomResponse.data;

      this.expandedItemDetails = {
        hours: lamp.hours,
        enabled: lamp.enabled,
        name: lamp.name,
        roomName: room.name,
      };
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  async created() {
    await this.getData();
    this.items = this.logs.map((log, index) => {
      return {
        key: index,
        createdAt: this.formatDate(log.createdAt, "all"),
        delta: log.delta,
        fixedDate: this.formatDate(log.fixedDate, "date"),
        timeStart: this.formatDate(log.timeStart, "time"),
        timeEnd: this.formatDate(log.timeEnd, "time"),
        total: log.total,
        updatedAt: this.formatDate(log.updatedAt, "all"),
        lamp: log.lamp,
        room: log.room,
      };
    });
  },
};
</script>
