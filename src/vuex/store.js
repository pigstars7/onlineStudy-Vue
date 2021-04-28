import VUE from 'vue'
import VUEX from 'vuex'

VUE.use(VUEX)

const state = {
  isPractice: false, //练习模式标志
  flag: false, //菜单栏左右滑动标志
  userInfo: null,
  menu: [{
      index: '1',
      title: '课程管理',
      icon: 'icon-kechengbiao',
      content:[{item1:'课程查询',path:'/selectCourse'},{item2:'添加课程',path:'addCourse'}],
    },
    {
      index: '2',
      title: '实验管理',
      icon: 'icon-tiku',
      content:[{item1:'实验查询',path:'/selectRange'},{item2:'添加实验',path:'/addRange'}],
    },
    {
      index: '3',
      title: '资料管理',
      icon: 'icon-performance',
      content:[{item1:'资料查询',path:'/selectFileManage'},{item2: '添加资料',path: '/addFileManage'}],
    },
    {
      index: '4',
      title: '学生管理',
      icon: 'icon-role',
      content:[{item1:'学生管理',path:'/studentManage'},{item2: '添加学生',path: '/addStudent'}],
    },
  ],
}
const mutations = {
  practice(state,status) {
    state.isPractice = status
  },
  toggle(state) {
    state.flag = !state.flag
  },
  changeUserInfo(state,info) {
    state.userInfo = info
  }
}
const getters = {
 
}
const actions = {
  getUserInfo(context,info) {
    context.commit('changeUserInfo',info)
  },
  getPractice(context,status) {
    context.commit('practice',status)
  }
}
export default new VUEX.Store({
  state,
  mutations,
  getters,
  actions,
  // store
})
