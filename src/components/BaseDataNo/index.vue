<template>
  <div class="nodata">
    <div class="nodata-tip">
      <div class="nodata-tip__icon icon-adms-data-no"></div>
      <div class="nodata-tip__text">暂无数据</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseDataNo'
}
</script>
<style lang="scss" scoped>
.nodata {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    &-tip{
      position: absolute;
      left: 50%;
      top: 60%;
      transform: translate(-50%, -50%);
      color:#999;
      &__icon{
        width:100%;
        font-size:28px;
        text-align: center;
      }
      &__text{
        font-size:13px
      }
    }
}
</style>
