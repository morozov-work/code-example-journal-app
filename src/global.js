import Vue from "vue";

const components = {
  ActionBtn: () => import("@/components/controls/ActionBtn/ActionBtn.vue"),
  IconBtn: () => import("@/components/controls/IconBtn/IconBtn.vue"),
  DateInput: () => import("@/components/controls/DateInput/DateInput.vue"),
  TimeInput: () => import("@/components/controls/TimeInput/TimeInput.vue"),
  SelectInput: () =>
    import("@/components/controls/SelectInput/SelectInput.vue"),
  PopUp: () => import("@/components/controls/PopUp/PopUp.vue"),
  ModalDialog: () => import("@/components/ModalDialog/ModalDialog.vue"),

  BarcodeScanner: () => import("@/views/BarcodeScanner/BarcodeScanner.vue"),
};

export function registerGlobalComponents() {
  Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component);
  });
}
