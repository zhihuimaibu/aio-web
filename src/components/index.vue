<template>
    <div class="container">
        <router-link to="/blog">
            <el-button class="bg-[#FFFFFF] rounded-lg">
                博客
            </el-button>
        </router-link>
        <router-link to="/system/user">
            <el-button class="bg-[#FFFFFF] rounded-lg">
                个人中心
            </el-button>
        </router-link>
        <router-link to="/system/login">
            <el-button class="bg-[#FFFFFF] rounded-lg">
                登录
            </el-button>
        </router-link>
        <router-link to="/month/balance">
            <el-button class="bg-[#FFFFFF] rounded-lg">
                记账
            </el-button>
        </router-link>
        <a href="/prod-api/system/user/logout">
            <el-button class="bg-[#FFFFFF] rounded-lg">
                退出
            </el-button>
        </a>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

const links = ref([]);
for (let i = 0; i< 6; i++) {
    links.value.push({link: 'www.baidu.com', title: '百度'});
}
</script>
  
<style scoped>
.el-button {
padding: 3.5rem;
margin: 0.5rem;
}
.el-button:hover {
box-shadow: 0 3px 8px 0 rgba(0,0,0,.2);
}
</style>
