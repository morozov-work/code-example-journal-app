<template>
  <v-dialog
    v-model="dialog"
    :persistent="persistent"
    :max-width="maxWidth"
    content-class="modal-dialog"
  >
    <v-card class="modal-dialog__card">
      <v-card-title>
        <span>{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <slot name="content"></slot>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <slot name="controls"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import "./ModalDialog.scss";

export default {
  name: "modal-dialog",
  components: {},
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },

    title: {
      type: String,
      default: "",
    },

    persistent: {
      type: Boolean,
      default: true,
    },

    maxWidth: {
      type: String,
      default: "800",
    },
  },
  data() {
    return {};
  },
};
</script>
