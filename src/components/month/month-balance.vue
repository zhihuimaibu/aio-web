<template>
  <div class="box-table">
    <div class="buttons">
      <el-button @click="handleAddRow">新增行</el-button>
      <el-button @click="handleAddColumn">新增列</el-button>
    </div>
    <div class="table">
      <el-table border :data="tableData" style="height: 100%;">
        <el-table-column v-for="c in tableColumns" :key="c.id" :prop="c.columnName" :label="c.columnName">
          <template #header="scope">
            <el-input 
              v-model="c.columnName" 
              @update:modelValue="handleInput"/>
          </template>
          <template #default="scope">
            <el-input v-model="scope.row[c.columnName]"/>
      </template>
      </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

  let id = 0

  const tableData = ref([{}])
  const tableColumns = ref([{
    id
  }])

  const handleInput = function() {
    tableColumns.value.forEach(c => {
      tableData.value = tableData.value.map((d) => {
        d[c.columnName] = d[c.columnName] ? d[c.columnName] : ''
        return d
      })
    })
  }

  const handleAddRow = function() {
    tableData.value.push({
      
    })
  }

  const handleAddColumn = function() {
    tableColumns.value.push({
      columnName: '',
      id: ++id
    })
  }
</script>
<style scoped>
  .box-table {
    width: 50%;
    height: 100%;
    margin: 0 auto;
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
  }
  .table {
    padding-top: 1rem;
    flex: 1;
    overflow: hidden;
  }
</style>