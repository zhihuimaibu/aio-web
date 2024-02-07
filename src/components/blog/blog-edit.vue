<template>
<div class="common-layout">
    <div class="buttons">
        <el-button type="primary" @click="saveInfo">发布</el-button>
        <!-- <el-button type="primary" @click="saveTree">保存树</el-button>
        <el-button type="primary" @click="createInfo()">新建</el-button> -->
    </div>
    <div class="container">
        <div class="aside">
            <div class="edit">
                <div class="select">{{ info.title }}</div>
                <div class="icons">
                    <el-button :icon="Plus" class="icon" @click="handlePlus"></el-button>
                    <el-button :icon="Edit" class="icon" @click="handleEdit"></el-button>
                    <el-button :icon="Delete" class="icon" @click="handleDelete"></el-button>
                    <el-button :icon="Check" class="icon" @click="saveTree"></el-button>
                </div>
            </div>
            <el-tree draggable :data="folder" 
                @node-click="(data) => showInfo(data.id)" />
        </div>
        <div class="main">
            <MdEditor v-model="info.markdown" :onUploadImg="onUploadImg" />
            <!-- <MdPreview :modelValue="detail" /> -->
        </div>
    </div>
</div>
<el-dialog v-model="editBlogShow" title="新增博客" style="width: 20%;">
    <el-form :model="form">
        <el-form-item label="标题">
            <el-input v-model="form.title"/>
        </el-form-item>
        <el-form-item label="等级">
            <el-input v-model="form.level" oninput="value=value.replace(/[^0-9]/g, '')"/>
        </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
            <el-button @click="editBlogShow = false">取消</el-button>
            <el-button type="primary" @click="handleConfirm">
                确认
        </el-button>
        </span>
    </template>
</el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { MdEditor, MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import { Delete, Plus, Check, Edit } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import common from '/src/common/common.js';

const query = useRoute().query;
const gid = query.gid;
const folder = ref([]);
const info = ref({});
const editBlogShow= ref(false)
const form = ref({})

showTree(gid);
showInfo(query.id);

function handleDelete() {
    ElMessageBox.confirm(
    '确认删除 ' + info.value.title + '?',
    '确认',
    {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
    }
    )
    .then(() => {
        removeInfo()
    })
}

const onUploadImg = async (files, callback) => {
  let resp = await common.upload(files, {});
  callback(resp.map(v => `/prod-api/system/file/download?uuid=${v.data}`));
};

function handleEdit() {
    editBlogShow.value = true
    form.value.level = info.value.level
    form.value.title = info.value.title
    form.value.id = info.value.id
}

async function handleConfirm() {
    if (form.value.id) {
        await common.request('/blog/save/info', form.value);
    }else {
        await createInfo()
    }
    editBlogShow.value = false
    showTree(gid);
}

function handlePlus() {
    editBlogShow.value = true
}

async function showTree(id) {
    let resp = await common.request('/blog/tree', {gid: id});
    folder.value = resp.data;
}

async function showInfo(id) {
    let resp = await common.request('/blog/info', {id});
    info.value = resp.data;
}

async function createInfo() {
    let data = {
        gid: gid,
        pid: info.value.id,
        title: form.value.title,
        level: form.value.level
    }

    let resp = await common.request('/blog/save/info', data);
    if (resp.code === 200)
        alert("创建成功");
}

async function saveInfo() {
    let resp = await common.request('/blog/save/info', info.value);
    if (resp.code === 200)
        alert("修改成功");
}

async function saveTree() {
    let resp = await common.request('/blog/save/tree', {id: parseInt(gid), children: folder.value});
    if (resp.code === 200)
        alert("修改成功");
    showTree(gid);
}

async function removeInfo() {
    console.log(info.id)
    let resp = await common.request('/blog/del', {id: info.value.id});
    if (resp.code === 200)
        alert("修改成功");
    showTree(gid)
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