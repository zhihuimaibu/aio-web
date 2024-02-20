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
            <el-icon @click="handleDeleteRow(scope.row, scope.$index)"><Delete /></el-icon>
          </template>
        </el-table-column>
        <el-table-column 
          v-for="(c, index) in tableColumns" 
          :key="index"
          :class-name="c.selected ? 'selected-cell' : ''">
          <template #header="scope">
            <div class="header" 
              @mouseenter="handleEnterHeader(index)"
              @mouseleave="handleLeaveHeader">
              <el-icon @click="handleDeleteColumn(c, index)"><Delete /></el-icon>
              <el-input
                v-model="c.columnName"
                @input="handleInput(c, index)"
                @focus="handleInput(c, index)"/>
            </div>
          </template>
          <template #default="scope">
            <el-input
              v-model="scope.row[c.columnName +'_'+ index]"
              :disabled="c.disabled"
              :placeholder="c.disabled ? '请先输入表头' : ''"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { Delete } from '@element-plus/icons-vue'

  let curColumn = ref('')
  let curIndex = ref('')
  let oldIndex
  const tableData = ref([
    { 
      "1_0":"1",
      "2_1":"1",
      "1_2":"2"
    }
  ])
  const tableColumns = ref([{
    selected: false,
    disabled: false,
    columnName: '1',
  },
  {
    selected: false,
    disabled: false,
    columnName: '2',
  },
  {
    selected: false,
    disabled: false,
    columnName: '1',
  }])

  const handleDeleteRow = function(row, index) {
    tableData.value.splice(1, 1)
    console.log(row, index);
  }
  
  const handleDeleteColumn = function(c, index) {
    tableData.value.map(td => {
      delete td[c.columnName]
      return td
    })
    // tableColumns.value = tableColumns.value.filter(tc => tc.columnName !== c.columnName)
    tableColumns.value.splice(index, 1)
    tableColumns.value.length === 0 && tableColumns.value.push({})
  }

  const handleLeaveHeader = function() {
    tableColumns.value.map(tc => {
      tc.selected = false
      return tc
    })
  }

  const handleEnterHeader = function(index) {
    tableColumns.value.map((tc, tcIndex) => {
      if (tcIndex === index) {
        tc.selected = !tc.selected
      }else {
        tc.selected = false
      }
      return tc
    })
  }

  watch(curColumn, (newValue, oldValue) => {
    if (oldIndex === curIndex.value) {
      tableData.value.forEach(td => {
        td[newValue] = td[oldValue]
        delete td[oldValue]
      })
    }
    oldIndex = curIndex.value
  })

  const handleInput = function(c, index) {
    if (c.columnName) {
      c.disabled = false
    }else {
      c.disabled = true
    }
    curColumn.value = c.columnName +"_"+ index
    curIndex.value = index
  }

  const handleAddRow = function() {
    tableData.value.push({})
  }

  const handleAddColumn = function() {
    tableColumns.value.push({
      disabled: true,
    })
  }

  const handleSave = function() {

  }
</script>
<style scoped>
  .box-table {
    width: 50%;
    height: 100%;
    min-width: 650px;
    max-width: 1200px;
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