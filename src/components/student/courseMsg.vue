<template>
  <div id="msg">
    <div class="title">
      <span class="link-left"></span>
      <span>课程详情</span>
      <!-- <span>/  {{examData.source}}</span> -->
    </div>
    <el-divider class="divider"></el-divider>
    <div class="wrapper">
      <ul class="top">
        <li class="example">{{ courseData.name }}</li>
        <li class="right">
          <el-button  @click="toRange(courseData.address)">开始实验</el-button>
        </li>
      </ul>
      <ul class="info">
        <p>{{ courseData.details }}</p>
      </ul>
      <ul class="info">
        <li class="videotittle">教学视频</li>

        <div class="demo">
          <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
          >
          </video-player>
        </div>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false, //对话框属性
      activeName: "0", //默认打开序号
      topicCount: [], //每种类型题目的总数
      score: [], //每种类型分数的总数
      courseData: {
        //课程信息
        // source: null,
        // totalScore: null,
      },
      topic: {
        //实验信息
      },
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 类型
            src: "", // url地址
          },
        ],
        poster: "https://i.loli.net/2021/03/18/DEHSAmXnW6jvpzb.jpg", // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
        },
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    //初始化页面数据
    init() {
      let courseId = this.$route.query.courseId; //获取路由传递过来的实验编号
      this.$axios(`/api/courses/CourseMsg/${courseId}`).then((res) => {
        //通过examCode请求实验详细信息

        // res.data.data.course = res.data.data.course.substr(0, 10);
        // console.log(res.data.data.course.video);
        this.courseData = { ...res.data.data.course };
        this.playerOptions["sources"][0]["src"] = res.data.data.course.video;
        console.log(this.playerOptions.sources.src);
      });
    },
    toRange(address) {
      window.location.href = address
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom {
  .right {
    .el-button {
      color: #409eff;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }
  }
}
.right {
  margin-left: auto;
}
.inner .contenti .question {
  margin-left: 40px;
  color: #9a9a9a;
  font-size: 14px;
}
.content .inner .titlei {
  margin-left: 20px;
  font-size: 16px;
  color: #88949b;
  font-weight: bold;
}
.content .title .time {
  font-size: 16px;
  margin-left: 420px;
  color: #999;
}
.content .stitle {
  background-color: #0195ff;
}
.content .title span {
  margin-right: 10px;
}
#msg .content .title {
  font-size: 20px;
  margin: 0px;
  display: flex;
  align-items: center;
}
.content {
  margin-top: 20px;
  background-color: #fff;
}
.content .header {
  padding: 10px 30px;
}
.wrapper .info {
  margin: 20px 0px 0px 20px;
  border-top: 1px solid #eee;
  padding: 20px 0px 10px 0px;
}
.wrapper .info a {
  color: #88949b;
  font-size: 14px;
}
.wrapper .info a:hover {
  color: #0195ff;
}
.wrapper .bottom .btn {
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid #88949b;
  border-radius: 4px;
}
.wrapper .bottom {
  display: flex;
  margin-left: 20px;
  color: #999;
  font-size: 14px;
  align-items: center;
}
.wrapper .bottom li {
  margin-right: 14px;
}
#msg {
  background-color: #eee;
  width: 980px;
  margin: 0 auto;
}
#msg .title {
  margin: 20px;
}
#msg .wrapper {
  background-color: #fff;
  padding: 10px;
}
.wrapper .top {
  display: flex;
  margin: 20px;
  align-items: center;
}
.wrapper .top .right {
  margin-left: auto;
}
.wrapper .top .example {
  color: #333;
  font-size: 22px;
  font-weight: 700;
}
.wrapper .top li i {
  margin-left: 20px;
  color: #88949b;
}
.wrapper .right .count {
  margin-right: 60px;
  color: #fff;
  padding: 4px 10px;
  background-color: #88949b;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 1px solid #88949b;
}
.wrapper .right .score {
  position: absolute;
  left: 53px;
  top: -5px;
  padding: 1px 12px;
  font-size: 20px;
  color: #88949b;
  border: 1px dashed #88949b;
  border-left: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  font-weight: bold;
}
.wrapper .right div {
  position: relative;
}
.link-left {
  border-left: solid rgb(64, 158, 255) 10px;
  margin-left: -20px;
  margin-right: 10px;
}
.divider {
  margin-top: -10px;
}
.videotittle {
  color: #333;
  font-size: 20px;
  font-weight: 700;
}
</style>
