<template>
  <div>
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
      hide-default-footer
      :items-per-page="-1"
      @update:expanded="onExpand"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Журнал бактерицидных ламп</v-toolbar-title>
          <v-spacer></v-spacer>
          <action-btn @click="addItem">Добавить замер</action-btn>
          <modal-dialog :dialog="addDialog" title="Добавить замер">
            <template v-slot:content>
              <v-form
                ref="addDialogForm"
                v-model="addDialogIsValid"
                lazy-validation
              >
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <select-input
                      v-model="editedItem.department"
                      :items="selectableData.departments"
                      item-text="name"
                      item-value="@id"
                      label="Отделение"
                      :required="true"
                      :rules="addDialogRules"
                    ></select-input>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <select-input
                      v-model="editedItem.room"
                      :items="selectableData.roomIndastrials"
                      item-text="name"
                      item-value="@id"
                      label="Помещение"
                      :required="true"
                      :rules="addDialogRules"
                    ></select-input>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <select-input
                      v-model="editedItem.lamp"
                      :items="selectableData.lamps"
                      item-text="name"
                      item-value="@id"
                      label="Лампа"
                      :required="true"
                      :rules="addDialogRules"
                    ></select-input>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <date-input
                      v-model="editedItem.fixedDate"
                      label="Дата фиксации"
                      :required="true"
                      :rules="addDialogRules"
                    ></date-input>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <time-input
                      v-model="editedItem.timeStart"
                      :date="editedItem.fixedDate"
                      label="Время начала"
                      :required="true"
                      :rules="addDialogRules"
                    ></time-input>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <time-input
                      v-model="editedItem.timeEnd"
                      :date="editedItem.fixedDate"
                      label="Время окончания"
                      :required="true"
                      :rules="addDialogRules"
                    ></time-input>
                  </v-col>
                </v-row>
              </v-form>
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
    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      @input="handlePageChange"
    ></v-pagination>
  </div>
</template>

<script>
import {
  getResource,
  getBactericidalLog,
  getLamps,
  getRooms,
  getRoomIndastrials,
  getDepartments,
  postBactericidalLog,
} from "@/api/bactericidalLog";
import { ISODateTo } from "@/util/date";

export default {
  name: "bactericidal-log",

  data() {
    return {
      logs: [],
      /*
       * Два поля перестали быть доступны
       */
      headers: [
        // {
        //   text: "Дата создания",
        //   align: "start",
        //   sortable: false,
        //   value: "createdAt",
        // },
        { text: "Изменение", value: "delta" },
        { text: "Дата фиксации", value: "fixedDate" },
        { text: "Время начала", value: "timeStart" },
        { text: "Время окончания", value: "timeEnd" },
        { text: "Всего", value: "total" },
        // { text: "Дата обновления", value: "updatedAt" },
        { text: "Actions", value: "actions", sortable: false },
      ],
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

      addDialogIsValid: true,
      addDialogRules: [(v) => !!v || "Поле обязательно"],

      selectableData: {
        lamps: [],
        rooms: [],
        departments: [],
        roomIndastrials: [],
        employees: [],
      },

      currentPage: 1,
      totalPages: 1,
    };
  },

  computed: {
    items() {
      return this.logs.map((log, index) => {
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

    /*
     * Нет полей, по которым можно фильтровать массивы
     */
    // filteredSelectableData() {
    //   const lamps = this.selectableData.lamps;
    //   const rooms = this.selectableData.rooms;
    //   const departments = this.selectableData.departments;

    //   const selectedDepartment = this.editedItem.department;
    //   const selectedRoom = this.editedItem.room;
    //   const selectedLamp = this.editedItem.lamp;

    //   function filterDepartments() {
    //     return departments;
    //   }

    //   function filterRooms() {
    //     return rooms;
    //   }

    //   function filterLamps() {
    //     return lamps;
    //   }

    //   return {
    //     lamps: filterLamps(),
    //     rooms: filterRooms(),
    //     departments: filterDepartments(),
    //   };
    // },
  },

  methods: {
    async getData(page = 1) {
      const response = await getBactericidalLog(page);
      const lastPageURL = response.data["hydra:view"]["hydra:last"];
      this.totalPages = +lastPageURL.slice(
        lastPageURL.search(/=/) + 1,
        lastPageURL.length
      );
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
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
      this.$refs.addDialogForm.reset();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.editedIndex > -1 ? this.saveChanges() : this.postNewItem();
      // this.close();
    },

    saveChanges() {
      Object.assign(this.items[this.editedIndex], this.editedItem);
    },

    async postNewItem() {
      this.$refs.addDialogForm.validate();
      await this.$nextTick();
      if (this.addDialogIsValid) {
        const { room, fixedDate, lamp, timeStart, timeEnd, department } =
          this.editedItem;
        const data = {
          room,
          fixedDate,
          lamp,
          timeStart,
          timeEnd,
          total: 0,
          responsible: "/api/employees/75a2948c-918e-440e-9bad-ce3025e675b5",
          department,
        };
        await postBactericidalLog(data);
        this.close();
      }
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

    async handlePageChange(value) {
      this.currentPage = value;
      await this.getData(value);
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

    this.selectableData.lamps = await getLamps().then(
      (r) => r.data["hydra:member"]
    );

    this.selectableData.departments = await getDepartments().then(
      (r) => r.data["hydra:member"]
    );

    this.selectableData.roomIndastrials = await getRoomIndastrials().then(
      (r) => r.data["hydra:member"]
    );

    // const d = await getDepartments("6a6df0fe-fd1d-43f5-a1e9-65a219f0c0f6");
    // const l = await getLamps("b9833d90-f78b-4a01-8e07-c4caede9ebcf");
    // const r = await getRoomIndastrials("7f722c7b-b585-4d42-8151-0a138fd5b79e");
    // console.log(d, l, r);

    /*
     * Пока не включены в список rooms(?)
     */
    this.selectableData.rooms = await getRooms().then(
      (r) => r.data["hydra:member"]
    );

    /*
     * Нет метода для получения. Стоит заглушка.
     */
    // this.selectableData.employees = await getEmployees().then((r) => r.data["hydra:member"]);
  },
};
</script>
