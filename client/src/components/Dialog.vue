<template>
    <button @click="dialogVisible = true" class="button">+</button>
    <div class="dialog">
      <el-dialog 
        v-model="dialogVisible"
        title="addfund" 
        width="500" 
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :modal-append-to-body="false"
      >
        <div class="form">
          <el-form ref="form" :model="formData" :rules="form_rules" label-width="120px" style="margin: 10px; width:  auto;">
            <el-form-item label="type">
              <el-select v-model="formData.type" placeholder="Select type:">
                <el-option v-for="(formtype, index) in format_type_list" :key="index" :label="formtype" :value="formtype"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="describe" label="describe type:">
              <el-input v-model="formData.describe"></el-input>
            </el-form-item>
            <el-form-item prop="expend" label="expend type:">
              <el-input v-model="formData.expend"></el-input>
            </el-form-item>
            <el-form-item prop="income" label="income type:">
              <el-input v-model="formData.income"></el-input>
            </el-form-item>
            <el-form-item prop="cash" label="cash type:">
              <el-input v-model="formData.cash"></el-input>
            </el-form-item>
            <el-form-item prop="remark" label="remark type:">
              <el-input v-model="formData.remark"></el-input>
            </el-form-item>
  
            <el-form-item class="text_right">
              <el-button @click="dialogVisible = false">Cancel</el-button>
              <el-button @click="onSubmit('form')" type="primary">Submit</el-button>
            </el-form-item>
          </el-form>
        </div>
        <span>This is a message</span>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import { nextTick } from 'vue';
  
  export default {
    name: 'DialogComponent',
    data() {
      return {
        formData: {
          type: '',
          describe: '',
          income: '',
          expend: '',
          cash: '',
          remark: '',
          id: ''
        },
        format_type_list: ['tixian0', 'tixian1', 'tixian2', 'tixian3'],
        form_rules: {
          describe: [{ required: true, message: 'describe cannot be empty', trigger: 'blur' }],
          income: [{ required: true, message: 'income cannot be empty', trigger: 'blur' }],
          cash: [{ required: true, message: 'cash cannot be empty', trigger: 'blur' }],
          remark: [{ required: true, message: 'remark cannot be empty', trigger: 'blur' }],
          expend: [{ required: true, message: 'expend cannot be empty', trigger: 'blur' }]
        },
        dialogVisible: false
      };
    },
    methods: {
      onSubmit(form) {
        nextTick(() => {
          const formRef = this.$refs[form];
          if (formRef) {
            formRef.validate(valid => {
              if (valid) {
                this.$axios.post('/api/profiles/add', this.formData)
                .then(() => {
                    this.$message({
                        message: 'data added succesfully!',
                        type: "success"
                    })
                }).catch(err => console.log(err))

                this.dialogVisible = false;

                this.$emit('update');
              }
            });
          } else {
            console.error(`Form with ref '${form}' not found.`);
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
   .button {
        width: 40px;
        height: 20px !important;
    }
  .dialog {
  }
  </style>
  