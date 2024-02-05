<template>
    <el-input v-model="form.username" placeholder="请输入用户名" />
    <el-input v-model="form.password" placeholder="请输入密码" type="password" />
    <el-button @click="login">登录</el-button>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import common from '/src/common/common.js'
import router from '/src/common/router.js';

const form = ref({})
const route = useRoute();

async function login() {
  let password = form.value.password;
  let resp = await common.request('/system/user/loginKey', form.value);
  form.value.password = common.encrypt(resp.data, form.value.password);
  resp = await common.request('/system/user/login', form.value);

  if (resp.code === 200) {
    common.setUser(resp.data);
    router.push(route.query.redirect? route.query.redirect : '/');
    return;
  }

  form.value.password = password;
}
</script>