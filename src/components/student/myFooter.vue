<!--页脚部分-->
<template>
  <footer id="footer">
    <ul>
      <a href="https://beian.miit.gov.cn/#/Integrated/index">陕ICP备2021003983号-1 | 西安邮电大学-网络空间安全学院 出品</a>
    </ul>
  </footer>
</template>

<script>
export default {
  name: "myFooter"
}
</script>

<style scoped>
#footer a {
  color: #919698;
  font-size: 14px;
}
#footer {
  background-color: #eee;
}
#footer ul {
  margin-top: 40px;
  border-top: 1px solid #d5d5d5;
  display: flex;
  justify-content: center;
  height: 80px;
  line-height: 80px;
}
#footer ul li {
  color: #919698;
  font-size: 14px;
  margin-right: 20px;
}
</style>
