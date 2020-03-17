<template>
  <div class="base-edit-box" :class="{ 'is-edit': edit }">
    <template v-if="($slots.edit || $scopedSlots.edit) && edit">
      <slot
        name="edit"
        :value="val"
        :state="edit"
        :input="value => (this.val = value)"
        :cancel="() => change(false)"
      ></slot>
      <span class="base-edit-box__btn">
        <el-button
          v-if="!hideBtn"
          type="text"
          :icon="saveIcon"
          @click="$emit('save', val, () => change(false))"
        />
        <el-button
          v-if="!hideBtn"
          type="text"
          :icon="closeIcon"
          @click="change(false)"
        />
      </span>
    </template>
    <template v-else>
      <slot :value="val" :state="edit" :edit="() => change(true)" />
      <el-button
        v-if="!hideBtn"
        type="text"
        :icon="editIcon"
        class="base-edit-box__btn"
        @click="change(true)"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'BaseEditBox',

  props: {
    value: null,
    visible: Boolean,
    disabled: Boolean,
    hideBtn: Boolean,
    editIcon: {
      type: String,
      default: 'el-icon-edit'
    },
    saveIcon: {
      type: String,
      default: 'el-icon-check'
    },
    closeIcon: {
      type: String,
      default: 'el-icon-close'
    }
  },

  watch: {
    visible: {
      handler (value) {
        if (this.disabled) return
        this.edit = !!value
      },
      immediate: true
    },
    value: {
      handler (value) {
        this.val = value
      },
      immediate: true
    }
  },

  data () {
    return {
      edit: false,
      val: ''
    }
  },

  methods: {
    change (value) {
      if (this.disabled) return
      this.edit = value
      this.$emit('update:visible', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-edit-box {
  position: relative;
  display: inline-block;
  padding-right: 20px;
  &.is-edit {
    padding-right: 50px;
  }
}

.base-edit-box__btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
