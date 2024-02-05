<template>
  <router-view />
</template>

<script setup>
import common from '/src/common/common.js'

common.request('/system/user/info').then(resp => {
  common.setUser(resp.data);
});
</script>