<script setup lang='ts'>
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { login } from '@/api/user'
import { useUserStore } from '@/store/user'

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
      }
      else {
        ElMessage.error(data.endata.msg)
      }
    }
  })
}
</script>

<template>
  <div>
    <el-form
      ref="loginFormRef"
      :model="user"
      :rules="rules"
    >
      <el-form-item prop="username">
        <el-input v-model="user.username" :placeholder="$t('loginFrom.username')" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="user.password"
          type="password"
          :placeholder="$t('loginFrom.password')"
          show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">
          {{ $t('navList.login') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang='less'>
</style>
