import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login', //登录界面
      component: () => import('@/components/common/login')
    },
    {
      path: '/index', //教师主页
      component: () => import('@/components/admin/index'),
      children: [
        {
          path: '/', //首页默认路由
          component: () => import('@/components/common/hello')
        },
        {
          path: '/selectCourse', //查询所有课程
          component: () => import('@/components/teacher/selectCourse')
        },
        {
          path: '/addCourse', //添加课程
          component: () => import('@/components/teacher/addCourse')
        },
        {
          path: '/addFileManage', //添加资料
          component: ()=> import('@/components/teacher/addFileManage')
        },
        {
          path: '/selectFileManage', //查询资料
          component: ()=> import('@/components/teacher/selectFileManage')
        },
        {
          path: '/selectRange', //查询所有题库
          component: () => import('@/components/teacher/selectRange')
        },
        {
          path: '/addRange', //增加题库主界面
          component: () => import('@/components/teacher/addRange')
        },
        {
          path: '/studentManage', //学生管理界面
          component: () => import('@/components/teacher/studentManage')
        },
        {
          path: '/addStudent', //添加学生
          component: () => import('@/components/teacher/addStudent')
        },
        {path: '/tpwdChaneg', meta:{requireAuth:true,},
        component: () => import('@/components/teacher/manager')
      },
      ]
    },
    {
      path: '/student',
      component: () => import('@/components/student/index'),
      meta:{requireAuth:true,},
      children: [
        {path:"/",component: ()=> import('@/components/student/myIndex')},
        {path:'/allRange', meta:{requireAuth:true,},component: () => import('@/components/student/allRange')},
        {path: '/manager', meta:{requireAuth:true,},component: () => import('@/components/student/manager')},
        {path: '/CourseMsg', meta:{requireAuth:true,},component: () => import('@/components/student/courseMsg')},
        {path: '/fileShare', meta:{requireAuth:true,},component: () => import("@/components/student/fileShare")}
      ]
    },
    {
      path:'/admin',
      component: () => import('@/components/admin/index_admin'),
      meta:{requireAuth:true,},
      children: [
        {
          path: '/', //首页默认路由
          component: () => import('@/components/common/hello_admin')
        },
        {
          path: '/teacherManage',
          component: () => import('@/components/admin/tacherManage')
        },
        {
          path: '/addTeacher',
          component: () => import ('@/components/admin/addTeacher')
        },
        {
          path: '/addClazz',
          component: () => import ('@/components/admin/addClazz')
        },
        {
          path: '/clazzManage',
          component: () => import ('@/components/admin/clazzManage')
        }
      ]
    }

  ]
})
