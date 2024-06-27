<template>
  <div class="fundlist">

    <div class="fill-container">
      <div>
        <el-form :inline="true" ref="add_data">
          <el-form-item class="btnRight">
            <el-button
              type="primary"
              size="small"
              @click="handleAdd()"
              ><el-icon><Plus /></el-icon>Add</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="table-container">
        <el-table
          v-if="tableData.length > 0"
          :data="tableData"
          style="width: 100%"
          maxHeight="450"
          border
        >
          <el-table-column label="Order" width="100" type="index">
          </el-table-column>
          <el-table-column label="Create Time" width="250" prop="date">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-icon><timer /></el-icon>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Cash" width="100" prop="cash">
            <template v-slot:default="scope">
              <span style="color: #4db3ff">{{ scope.row.cash }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Describe" width="100" prop="describe">
          </el-table-column>
          <el-table-column label="Expend" width="100" prop="expend">
            <template v-slot:default="scope">
              <span style="color: #f56767">{{ scope.row.expend }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Income" width="100" prop="income">
            <template v-slot:default="scope">
              <span style="color: #00d053">{{ scope.row.income }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Remark" width="150" prop="remark">
          </el-table-column>
          <el-table-column label="Type" width="100" prop="type">
          </el-table-column>

          <el-table-column label="Operations" prop="operation" align="center">
            <template #default="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
                type="warning"
              >
              <el-icon><EditPen /></el-icon> Edit
              </el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >
              <el-icon><DeleteFilled /></el-icon> Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
  <Dialog :dialog="dialog" @update="getProfile"></Dialog>
</template>

<script>
import { ElIcon, ElButton } from "element-plus";
import { Timer,Plus, EditPen, DeleteFilled } from "@element-plus/icons-vue";
import Dialog from '../components/Dialog.vue';


export default {
  name: "fundlist-component",
  components: {
    Dialog,
    ElIcon,
    Timer,
    Plus,
    EditPen,
    ElButton,
    DeleteFilled,
  },
  data() {
    return {
      tableData: [],
      dialog: {
 
      }
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      //get profile data
      this.$axios
        .get("/api/profiles")
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => console.log(err));
    },
    handleEdit(index, row) {
      console.log(123, index, row);
    },
    handleDelete(index, row) {
      console.log(456, index, row);
    },
    handleAdd() {
 
    },
  },
};
</script>
<style scoped>
.fundlist {
  position: relative;
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
}
.fill-container {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
    float: right;
}
</style>
