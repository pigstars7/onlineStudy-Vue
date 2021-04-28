import VUE from 'vue'
import VUEX from 'vuex'

VUE.use(VUEX)

const state = {
  isPractice: false, //练习模式标志
  flag: false, //菜单栏左右滑动标志
  userInfo: null,
  menu: [{
      index: '1',
      title: '班级管理',
      icon: 'el-icon-school',
      content:[{item1:'班级查询',path:'/clazzManage'},{item2:'添加班级',path:'addClazz'}],
    },
    {
      index: '2',
      title: '老师管理',
      icon: 'icon-Userselect',
      content:[{item1:'老师查询',path:'/teacherManage'},{item2:'添加老师',path:'/addTeacher'}],
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
