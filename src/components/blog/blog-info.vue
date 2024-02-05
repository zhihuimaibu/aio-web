<template>

<div class="container">
        <div class="aside">
            <div class="edit">
                <div class="select">{{ info.title }}</div>
                <div class="icons">
                    <router-link :to="`/blog/edit?gid=${query.gid}&id=${info.id}`">
                        <el-button :icon="Edit" class="icon"></el-button>
                    </router-link>
                </div>
            </div>
            <el-tree :data="tree" 
                @node-click="(data) => showInfo(data.id)" />
        </div>
        <div class="main">
            <MdPreview v-model="info.markdown" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import { Edit } from '@element-plus/icons-vue'


import common from '/src/common/common.js';

const query = useRoute().query;
const tree = ref([]);
const info = ref({});

showTree(query.gid);
showInfo(query.id ? query.id : query.gid);

async function showTree(gid) {
    let resp = await common.request('/blog/tree', {gid});
    tree.value = resp.data;
}

async function showInfo(id) {
    let resp = await common.request('/blog/info', {id});
    info.value = resp.data;
}
</script>

<style scoped>
.common-layout {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.container {
    display: flex;
    flex: 1;
}
.buttons {
    margin: 2rem 0;
    text-align: right;
}
.aside {
    min-width: 250px;
    overflow: auto;
}
.main {
    flex: 1;
}
.md-editor {
    height: 100%;
}
.icon {
    border: none;
    padding: 4px 7px;
    margin-left: 2px;
}
.edit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 1rem;
}
</style>
  