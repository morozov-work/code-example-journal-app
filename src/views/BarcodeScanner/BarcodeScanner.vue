<template>
  <v-app>
    <div class="scanner">
      <div class="scanner__pointer"></div>
      <div class="scanner__controls">
        <!-- <v-btn @click="startScan">start scanner</v-btn> -->
        <action-btn :depressed="false" rounded :plain="false" @click="stopScan">
          Отмена
        </action-btn>
      </div>
    </div>
  </v-app>
</template>

<script>
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import "./BarcodeScanner.scss";

export default {
  components: {},

  name: "barcode-scanner",

  data() {
    return {};
  },

  computed: {},

  methods: {
    async startScan() {
      await this.checkPermission();
      BarcodeScanner.hideBackground();
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        alert(result.content);
      } else {
        alert("no content");
      }
    },

    stopScan() {
      BarcodeScanner.showBackground();
      BarcodeScanner.stopScan();
    },

    async checkPermission() {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // the user granted permission
        return true;
      }
      return false;
    },
  },
};
</script>

<style>
html {
  background-color: transparent;
}
</style>
