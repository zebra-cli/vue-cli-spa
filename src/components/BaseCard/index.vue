<template>
  <div class="base-card">
    <div class="base-card__header">
      <slot name="title"></slot>
      <spacer></spacer>
      <slot name="tool">
        <span
          v-if="showClose"
          class="base-card__close-btn el-icon-close"
          @click="$emit('close')"
        />
      </slot>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BaseCard',

  props: {
    showClose: Boolean
  }
}
</script>

<style lang="scss" scoped>
  .base-card__header {
    display: flex;
  }
  .base-card__close-btn {
    cursor: pointer;
    &:hover {
      color: $--color-primary;
    }
  }
</style>
