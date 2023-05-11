<script setup lang='ts'>
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { login } from '@/api/user'

const emit = defineEmits(['close'])
const loading = ref(false)
const userStore = useUserStore()
const { t } = useI18n()

const user = reactive({
  username: '',
  password: '',
})

const loginFormRef = ref<FormInstance>()

const rules = computed(() => {
  return reactive<FormRules>({
    username: [{ required: true, message: t('errorTips.enterUsername'), trigger: 'blur' }],
    password: [{ required: true, message: t('errorTips.enterPassword'), trigger: 'blur' }],
  })
})

const handleLogin = () => {
  loginFormRef.value?.validate(async (valid) => {
    if (valid) {
      loading.value = true
      const { data } = await login(user)
      if (data.endata.su) {
        ElMessage.success(data.endata.msg)
        userStore.setToken(data.endata.token)
        userStore.getInfo()
        emit('close')
      } else {
        ElMessage.error(data.endata.msg)
      }
    }
  })
}
</script>

<template>
  <div>
    <ElForm
      ref="loginFormRef"
      :model="user"
      :rules="rules"
    >
      <ElFormItem prop="username">
        <ElInput v-model="user.username" :placeholder="$t('loginFrom.username')" />
      </ElFormItem>
      <ElFormItem prop="password">
        <ElInput
          v-model="user.password"
          type="password"
          :placeholder="$t('loginFrom.password')"
          show-password
        />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="handleLogin">
          {{ $t('navList.login') }}
        </ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang='less'>
</style>
