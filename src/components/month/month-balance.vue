<template>
  <div class="box-table">
    <div class="buttons">
      <el-button @click="handleAddRow">新增行</el-button>
      <el-button @click="handleAddColumn">新增列</el-button>
      <el-button @click="handleSave">保存</el-button>
    </div>
    <div class="table">
      <el-table 
        border 
        :data="tableData" 
        style="height: 100%;">
        <el-table-column width="40">
          <template #default="scope">
            <el-icon @click="handleDeleteRow(scope.row)"><Delete /></el-icon>
          </template>
        </el-table-column>
        <el-table-column 
          v-for="c in tableColumns" 
          :key="c.cid"
          :prop="c.columnName"
          :label="c.columnName"
          :class-name="c.selected ? 'selected-cell' : ''">
          <template #header="scope">
            <div class="header" 
              @mouseenter="handleDeleteColumn(c)"
              @mouseleave="handleLeaveColumn">
              <el-icon><Delete /></el-icon>
              <el-input
                v-model="c.columnName" 
                @input="handleInput(c)"
                @focus="handleInput(c)"/>
            </div>
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
  import { ref, watch } from 'vue'
  import { Delete } from '@element-plus/icons-vue'

  let cid = 0
  let rid = 0
  let curColumn = ref('')
  let curCid = ref('')
  let oldCid 
  const tableData = ref([{
    rid,
  }])
  const tableColumns = ref([{
    cid,
    selected: false
  }])

  const handleDeleteRow = function(row) {
    console.log(row);
  }
  
  const handleLeaveColumn = function() {
    tableColumns.value.map(tc => {
      tc.selected = false
      return tc
    })
  }

  const handleDeleteColumn = function(c) {
    tableColumns.value.map(tc => {
      if (tc.cid === c.cid) {
        tc.selected = !tc.selected
      }else {
        tc.selected = false
      }
      return tc
    })
    console.log(c);
  }

  watch(curColumn, (newValue, oldValue) => {
    if (oldCid === curCid.value) {
      tableData.value.forEach(td => {
        td[newValue] = td[oldValue]
        delete td[oldValue]
      })
    }

    oldCid = curCid.value
  })

  const handleInput = function(c) {
    curColumn.value = c.columnName
    curCid.value = c.cid
  }

  const handleAddRow = function() {
    tableData.value.push({
      rid: ++rid
    })
  }

  const handleAddColumn = function() {
    tableColumns.value.push({
      cid: ++cid
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
  .header {
    text-align: center;
  }
  .table >>> .selected-cell {
    background: #f5f7fa;
  }
</style>