<script setup lang='ts'>
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import validator from 'validator'
import { mailBind, register } from '@/api/user'

const { t } = useI18n()
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
  if (value === '') {
    callback(new Error(t('errorTips.enterUsername')))
  } else if (value.length < 6 || value.length > 20) {
    callback(new Error(t('errorTips.length')))
  } else if (!reg.test(value)) {
    callback(new Error(t('errorTips.letterOrNumber')))
  } else {
    callback()
  }
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error(t('errorTips.enterPasswordAgain')))
  } else if (value !== user.password) {
    callback(new Error(t('errorTips.notMatch')))
  } else {
    callback()
  }
}

const validateAccount = (rule: any, value: any, callback: any) => {
  const reg = /^1[345789]\d{9}$/
  accountType = 0
  if (value === '') {
    callback(new Error(t('errorTips.enterEmailPhone')))
  } else if (validator.isEmail(value)) {
    accountType = 1
    callback()
  } else if (reg.test(value)) {
    accountType = 2
    callback()
  } else {
    callback(new Error(t('errorTips.enterCorrectEmailPhone')))
  }
}

const regRules = reactive<FormRules>({
  username: [{ validator: validateName, trigger: 'blur' }],
  password: [{ required: true, message: t('errorTips.enterPassword'), trigger: 'blur' }],
  checkPwd: [{ validator: validatePass, trigger: 'blur' }],
})

const verRules = reactive<FormRules>({
  account: [{ validator: validateAccount, trigger: 'blur' }],
  ver: [{ required: true, message: t('errorTips.enterCode'), trigger: 'blur' }],
})

const handleRegister = () => {
  regFormRef.value?.validate(async (valid) => {
    if (valid) {
      // loading.value = true
      const { data } = await register(user)
      if (data.endata.su === 1) {
        ElMessage.success(data.endata.msg)
        ifNext.value = true
      } else {
        ElMessage.warning(data.endata.msg)
      }
    }
  })
}

const sendVer = async () => {
  if (accountType === 0) {
    ElMessage.warning(t('errorTips.enterEmailPhone'))
    return
  }
  if (accountType === 1) {
    const param = { email: ver.account, username: user.username }
    const { data } = await mailBind(param)
  } else if (accountType === 2) {
    const { data } = await register(user)
    if (data.endata.su === 0) {
      ElMessage.warning(t('errorTips.registeredPhone'))
    }
  }
}

const handleBind = () => {
  regFormRef.value?.validate(async (valid) => {
    if (valid) {
      if (accountType === 1) {
        //
      } else if (accountType === 2) {
        //
      }
    }
  })
}
</script>

<template>
  <div>
    <ElForm
      v-show="!ifNext"
      ref="regFormRef"
      :model="user"
      :rules="regRules"
    >
      <ElFormItem prop="username">
        <ElInput v-model="user.username" :placeholder="$t('loginFrom.username')" />
      </ElFormItem>
      <ElFormItem prop="password">
        <ElInput v-model="user.password" :placeholder="$t('loginFrom.password')" type="password" />
      </ElFormItem>
      <ElFormItem prop="checkPwd">
        <ElInput v-model="user.checkPwd" :placeholder="$t('loginFrom.checkPwd')" type="password" />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="handleRegister">
          {{ $t('loginFrom.next') }}
        </ElButton>
      </ElFormItem>
    </ElForm>

    <ElForm
      v-show="ifNext"
      ref="verFormRef"
      :model="ver"
      :rules="verRules"
    >
      <ElFormItem prop="account">
        <ElInput v-model="ver.account" :placeholder="$t('loginFrom.emailPhone')" />
      </ElFormItem>
      <ElFormItem prop="ver">
        <div class="ver-box">
          <ElInput v-model="ver.code" :placeholder="$t('loginFrom.code')" />
          <ElButton type="primary" :disabled="ifSend" @click="sendVer">
            {{ $t('loginFrom.sendCode') }} (60)
          </ElButton>
        </div>
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="handleBind">
          {{ $t('loginFrom.bind') }}
        </ElButton>
      </ElFormItem>
    </ElForm>
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
