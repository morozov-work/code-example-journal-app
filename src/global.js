import Vue from "vue";

const components = {
  ModalDialog: () => import("@/components/ModalDialog/ModalDialog.vue"),
  PopUp: () => import("@/components/controls/PopUp/PopUp.vue"),
};

export function registerGlobalComponents() {
  Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component);
  });
}
