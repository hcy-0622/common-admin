<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="xlinkHref" />
  </svg>
</template>
<script setup lang="ts">
import { computed, toRefs } from 'vue'

interface Props {
  icon: string
}
const props = defineProps<Props>()
const { icon } = toRefs(props)
const xlinkHref = computed(() => `#icon-${icon.value}`)
</script>
<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
