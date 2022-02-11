import Vue from "vue";

const components = {
  ActionBtn: () => import("@/components/controls/ActionBtn/ActionBtn.vue"),
  IconBtn: () => import("@/components/controls/IconBtn/IconBtn.vue"),
  PopUp: () => import("@/components/controls/PopUp/PopUp.vue"),
  ModalDialog: () => import("@/components/ModalDialog/ModalDialog.vue"),
};

export function registerGlobalComponents() {
  Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component);
  });
}
