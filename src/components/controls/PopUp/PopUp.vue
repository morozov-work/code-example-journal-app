<template>
  <div class="pop-up gray--text">
    {{ content }}
  </div>
</template>

<script>
import "./PopUp.scss";

export default {
  name: "pop-up",
  props: {
    content: String,
  },

  data() {
    return {};
  },
};
</script>
