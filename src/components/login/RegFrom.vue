<script setup lang='ts'>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import validator from 'validator'
import { mailBind, register } from '@/api/user'

const loading = ref(false)
const ifNext = ref(false)
const ifSend = ref(false)
let accountType = 0 // 1: 邮箱  2: 手机号

const user = reactive({
  username: '',
  password: '',
  checkPwd: '',
})

const ver = reactive({
  account: '',
  code: '',
})

const regFormRef = ref<FormInstance>()
const verFormRef = ref<FormInstance>()

const validateName = (rule: any, value: any, callback: any) => {
  const reg = /^[0-9a-zA-Z]*$/
  if (value === '')
    callback(new Error('Please input the username'))
  else if (value.length < 6 || value.length > 20)
    callback(new Error('The length must between 6-20'))
  else if (!reg.test(value))
    callback(new Error('The username must be letter or number'))
  else
    callback()
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '')
    callback(new Error('Please input the password again'))
  else if (value !== user.password)
    callback(new Error('Two inputs don\'t match!'))
  else
    callback()
}

const validateAccount = (rule: any, value: any, callback: any) => {
  const reg = /^1[345789]\d{9}$/
  accountType = 0
  if (value === '') {
    callback(new Error('Please input the Email or phone number'))
  }
  else if (validator.isEmail(value)) {
    accountType = 1
    callback()
  }
  else if (reg.test(value)) {
    accountType = 2
    callback()
  }
  else {
    callback(new Error('Please input the correct Email or phone number'))
  }
}

const regRules = reactive<FormRules>({
  username: [{ validator: validateName, trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  checkPwd: [{ validator: validatePass, trigger: 'blur' }],
})

const verRules = reactive<FormRules>({
  account: [{ validator: validateAccount, trigger: 'blur' }],
  ver: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
})

const handleRegister = () => {
  regFormRef.value?.validate(async (valid) => {
    if (valid) {
      // loading.value = true
      const { data } = await register(user)
      if (data.endata.su === 1) {
        ElMessage.success(data.endata.msg)
        ifNext.value = true
      }
      else {
        ElMessage.warning(data.endata.msg)
      }
    }
  })
}

const sendVer = async () => {
  if (accountType === 0) {
    ElMessage.warning('请先输入邮箱或手机号')
    return
  }
  if (accountType === 1) {
    const param = { email: ver.account, username: user.username }
    const { data } = await mailBind(param)
  }
  else if (accountType === 2) {
    const { data } = await register(user)
    if (data.endata.su === 0)
      ElMessage.warning('手机号已被注册')
  }
}

const handleBind = () => {
  regFormRef.value?.validate(async (valid) => {
    if (valid) {
      if (accountType === 1) {
        //
      }
      else if (accountType === 2) {
        //
      }
    }
  })
}
</script>

<template>
  <div>
    <el-form
      v-show="!ifNext"
      ref="regFormRef"
      :model="user"
      :rules="regRules"
    >
      <el-form-item prop="username">
        <el-input v-model="user.username" :placeholder="$t('loginFrom.username')" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="user.password" :placeholder="$t('loginFrom.password')" type="password" />
      </el-form-item>
      <el-form-item prop="checkPwd">
        <el-input v-model="user.checkPwd" :placeholder="$t('loginFrom.checkPwd')" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleRegister">
          {{ $t('loginFrom.next') }}
        </el-button>
      </el-form-item>
    </el-form>

    <el-form
      v-show="ifNext"
      ref="verFormRef"
      :model="ver"
      :rules="verRules"
    >
      <el-form-item prop="account">
        <el-input v-model="ver.account" :placeholder="$t('loginFrom.emailPhone')" />
      </el-form-item>
      <el-form-item prop="ver">
        <div class="ver-box">
          <el-input v-model="ver.code" :placeholder="$t('loginFrom.code')" />
          <el-button type="primary" :disabled="ifSend" @click="sendVer">
            {{ $t('loginFrom.sendCode') }} (60)
          </el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleBind">
          {{ $t('loginFrom.bind') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang='less'>
.ver-box {
  width: 100%;
  display: flex;
  flex-direction: row;

  .el-button {
    width: 160px;
    margin-left: 10px;
  }
}
</style>
