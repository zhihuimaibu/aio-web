<template>
    <router-link v-for="item in subject" :to="`/blog/info?gid=${item.id}`">
        <el-button class="bg-[#FFFFFF] rounded-lg">
            {{ item.title }}
        </el-button>
    </router-link>
    <el-button class="bg-[#FFFFFF] rounded-lg" @click="editBlogShow" v-if="common.getUser().level > 0">
        新增
    </el-button>

    <el-dialog v-model="addForm.show" title="新增" style="width: 20%;">
        <el-form :model="form">
            <el-form-item label="标题">
                <el-input v-model="addForm.title"/>
            </el-form-item>
            <el-form-item label="等级">
                <el-input v-model="addForm.level" oninput="value=value.replace(/[^0-9]/g, '')"/>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addForm.show = false">取消</el-button>
                <el-button type="primary" @click="saveBlog">
                    确认
            </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script setup>
import { ref } from 'vue';
import common from '/src/common/common.js';

const subject = ref([]);
const addForm = ref({});

showSubject();

function showSubject() {
    common.request("/blog/subject").then(resp => {
        subject.value = resp.data;
    });
}

function editBlogShow() {
    addForm.value = {};
    addForm.value.show = true;
}

function saveBlog() {
    common.request("/blog/save/info", addForm.value).then(resp => {
        addForm.value.show = false;
        showSubject();
    });
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