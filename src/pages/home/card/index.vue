<template>
  <div class="card">
    <el-card class="box-card" shadow="hover">
      <div class="content">
        <div class="left">
          <div class="name">背景人民医院</div>
          <div class="tip">
            <div class="level">
              <svg t="1689584402989" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="2344" width="16" height="16">
                <path
                  d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                  p-id="2345" fill="#7f7f7f"></path>
              </svg>
              三级甲等
            </div>
            <div class="time">
              <svg t="1689584503355" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="4263" width="16" height="16">
                <path
                  d="M512 64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64z m0 832c-212 0-384-172-384-384s172-384 384-384 384 172 384 384-172 384-384 384z m32-393.6l191.2 110.4-32 55.2L488.8 544H480V256h64v246.4z"
                  p-id="4264" fill="#7f7f7f"></path>
              </svg>
              每天22点开放
            </div>
          </div>
        </div>
        <div class="right">
          <img src="../../../assets/images/logo.png" alt="">
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  .box-card {
    .content {
      display: flex;
      justify-content: space-between;
      .left {
        width: 60%;
        margin: 10px;
        .name {
          font-size: 22px;
        }
        .tip {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          font-size: 19px;
          color: #7f7f7f;
        }
      }
      .right {
        img {
          width: 90px;
        }
      }
    }
  }
}
</style>