<script setup lang="ts">
import { FsRequest, EApiMap } from '@/api'

const openDevTools = () => {
  FsRequest.post(EApiMap.OpenDevTools)
}
</script>

<template>
  <div class="home-page">
    <ElButton type="primary" class="style-text" @click="openDevTools">测试</ElButton>
  </div>
</template>

<style lang="less" scoped>
.home-page {
  margin: 8px;
}
</style>