<template>
  <teleport to="#app">
    <div v-if="data.isDialogVisible" class="dialog--overlay">
      <dialog open>
        <header v-if="data.showCloseButton || headerTitle">
          <span class="headerText">{{headerTitle}}</span>
          <span class="dialogButtons">
           <button v-if="data.showCloseButton" @click="hide('close')">X</button>
          </span>
        </header>
        <section class="dialogBody">
          <slot />
        </section>
      </dialog>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

interface Data {
  showCloseButton: boolean;
  isDialogVisible: boolean;
}

export default defineComponent({
  props: ['headerTitle'],
  setup() {
    const data = reactive<Data>({
      showCloseButton: true,
      isDialogVisible: false,
    });
    let resolvePointer: any;

    async function show() {
      data.isDialogVisible = true;
      return new Promise((resolve) => {
        resolvePointer = resolve;
      });
    }

    function hide(action = 'close') {
      data.isDialogVisible = false;
      resolvePointer({ action });
    }

    return {
      data,
      hide,
      show,
    };
  },

});
</script>

<style scoped>
.dialog--overlay {
  position: fixed; /* Positioning and size */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(128,128,128,0.5); /* color */
  z-index: 999999;
}
dialog {
  border-radius: 5px;
  box-shadow: -5px 5px 10px #666;
  padding: 0;
  margin: auto;
  max-height: calc(80vh);
  top: 50%;
  transform: translateY(-50%);
}

header {
  user-select: none;
  font-weight: bold;
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
  color: white;
  padding: 2px;
}
.headerText{
  display: inline-flex;
  width: 80%;
}
.dialogButtons {
  display: inline-flex;
  float: right;
}
.dialogBody {
  padding: 10px;
}
</style>
