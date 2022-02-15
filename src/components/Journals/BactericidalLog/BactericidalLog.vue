<template>
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
        <modal-dialog :dialog="addDialog" title="Добавить замер">
          <template v-slot:content>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <date-input
                  v-model="editedItem.fixedDate"
                  label="Дата фиксации"
                ></date-input>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <time-input
                  v-model="editedItem.timeStart"
                  label="Время начала"
                ></time-input>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <time-input
                  v-model="editedItem.timeEnd"
                  label="Время окончания"
                ></time-input>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.room"
                  label="Комната"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.lamp"
                  label="Лампа"
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
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
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

<script>
import {
  getResource,
  getBactericidalLog,
  // getLamps,
  // getRooms,
  // getDepartments,
  // getEmployees,
} from "@/api/bactericidalLog";
import { ISODateTo, getISODate } from "@/util/date";

export default {
  name: "bactericidal-log",

  data() {
    return {
      logs: [],
      lamps: [],
      rooms: [],
      departments: [],
      employees: [],
      headers: [
        {
          text: "Дата создания",
          align: "start",
          sortable: false,
          value: "createdAt",
        },
        { text: "Изменение", value: "delta" },
        { text: "Дата фиксации", value: "fixedDate" },
        { text: "Время начала", value: "timeStart" },
        { text: "Время окончания", value: "timeEnd" },
        { text: "Всего", value: "total" },
        { text: "Дата обновления", value: "updatedAt" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [],
      expanded: [],
      addDialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        "@id": "",
        "@type": "",
        createdAt: "",
        createdBy: "",
        delta: "",
        department: "",
        fixedDate: "",
        id: "",
        lamp: "",
        responsible: "",
        room: "",
        timeEnd: "",
        timeStart: "",
        total: "",
        updatedAt: "",
        updatedBy: "",
        key: "",
      },
      defaultItem: {
        "@id": "",
        "@type": "",
        createdAt: "",
        createdBy: "",
        delta: "",
        department: "",
        fixedDate: "",
        id: "",
        lamp: "",
        responsible: "",
        room: "",
        timeEnd: "",
        timeStart: "",
        total: "",
        updatedAt: "",
        updatedBy: "",
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
      const response = await getBactericidalLog();
      this.logs = response.data["hydra:member"];
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
      this.editedIndex > -1 ? this.saveChanges() : this.saveCreatedItem();
      this.close();
    },

    saveChanges() {
      Object.assign(this.items[this.editedIndex], this.editedItem);
    },

    saveCreatedItem() {
      this.editedItem.key = this.items.length;
      this.items.push(this.editedItem);
      const a = this.postNewItem(this.editedItem);
      console.log(a);
    },

    postNewItem(item) {
      return {
        room: item.room,
        fixedDate: getISODate(item.fixedDate),
        lamp: item.lamp,
        timeStart: getISODate(item.timeStart),
        timeEnd: getISODate(item.timeEnd),
        total: 0,
        responsible: "string",
        department: "string",
      };
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
    // this.lamps = await getLamps();
    // this.rooms = await getRooms();
    // this.departments = await getDepartments();
    // this.employees = await getEmployees();
    this.items = this.logs.map((log, index) => {
      return {
        key: index,
        createdAt: ISODateTo(log.createdAt, "datetime"),
        delta: log.delta,
        fixedDate: ISODateTo(log.fixedDate, "date"),
        timeStart: ISODateTo(log.timeStart, "time"),
        timeEnd: ISODateTo(log.timeEnd, "time"),
        total: log.total,
        updatedAt: ISODateTo(log.updatedAt, "datetime"),
        lamp: log.lamp,
        room: log.room,
      };
    });
  },
};
</script>
