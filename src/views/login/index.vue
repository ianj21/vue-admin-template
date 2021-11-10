<template>
  <div class="login h-full flex justify-center items-center">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleFormRef"
      label-width=""
      class="login-container"
    >
      <h3 class="text-center">系统登录</h3>
      <el-form-item prop="userName">
        <el-input
          type="text"
          :placeholder="'请输入用户名'"
          prefix-icon="el-icon-user"
          v-model="ruleForm.userName"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          :placeholder="'请输入密码'"
          prefix-icon="el-icon-lock"
          v-model="ruleForm.password"
          show-password
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="w-full"
          type="primary"
          :loading="loading"
          @click="submitForm"
        >
          登陆
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store/index";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "Login",
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      ruleForm: {
        userName: "admin",
        password: "123456",
      },
      loading: false,
    });

    const rules = {
      userName: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" },
      ],
    };

    const submitForm = async () => {
      // 开启 loading
      state.loading = true;
      // 登陆
      const res = await store.dispatch("user/login", state.ruleForm);
      if (res) {
        // 获取用户信息
        await store.dispatch("user/getUserInfo");
        signInSuccess();
      } else {
        // 关闭 loading
        state.loading = false;
      }
    };

    // 登录成功后的跳转
    const signInSuccess = () => {
      router.push("/");
      // 登录成功提示
      setTimeout(() => {
        // 关闭 loading
        state.loading = false;
        ElMessage.success("登陆成功");
      }, 300);
    };

    return {
      ...toRefs(state),
      rules,
      submitForm,
    };
  },
});
</script>
<style lang="scss" scoped>
.login {
  background: url("../../assets/bg_login.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    width: 350px;
    padding: 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
}
</style>
