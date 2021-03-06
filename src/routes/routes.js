const requireAuth = () => (from, to, next) => {
  var isAuthenticated= false;
  //this is just an example. You will have to find a better or 
  // centralised way to handle you localstorage data handling 
  if(localStorage.getItem('accessToken'))
    // 나중에는 여기서 서버에 접속해서 인증 보내야함.
    isAuthenticated = true;
   else
    isAuthenticated= false;
   if(isAuthenticated) 
   {
    next(); // allow to enter route
   } 
   else
   {
    next('/login'); // go to '/login';
   }
}


const routes = [
  //여기서부터 helpdiana
  {
    path: '/',
    beforeEnter : requireAuth(),
    redirect: 'dashboard',
  },
  {
    path: '/dashboard',
    beforeEnter : requireAuth(),
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
  //여기서부터 help-dinana 
  {
    path : '/camera-scan',
    beforeEnter : requireAuth(),
    name:'camera-scan',
    component:() => import("@/views/scanner/CameraScan.vue"),
  },
  {
    path : '/search-image',
    beforeEnter : requireAuth(),
    name : 'search-image',
    component:() => import("@/views/scanner/SearchImage.vue")
  },
  {
    path : '/process-image',
    beforeEnter : requireAuth(),
    name : 'process-image',
    component:() => import("@/views/scanner/ProcessImage.vue")
    
  },
  {
    path : "/show-result",
    beforeEnter : requireAuth(),
    name : "show-result",
    component:() => import("@/views/scanner/ShowResult.vue")
  },
  {
    path : "/mypage",
    beforeEnter : requireAuth(),
    name : "mypage",
    component:() => import("@/views/mypage/MyPage.vue")
  },
  {
    path : "/report",
    beforeEnter : requireAuth(),
    name : "report",
    component:() => import("@/views/report/NewReportContainer.vue")
  },
  
  {
    path : "/diagnose-list",
    beforeEnter : requireAuth(),
    name : "diagnose-list",
    component:() => import("@/views/diagnose-list/DiagnoseList.vue")
  },
  {
    path : "/diagnose-edit",
    beforeEnter : requireAuth(),
    name : "diagnose-edit",
    component:() => import("@/views/diagnose-list/DiagnoseEdit.vue"),

  },
  {
    path : "/profile",
    beforeEnter : requireAuth(),
    name : "profile",
    component:() => import("@/views/profile/Profile.vue"),
  },
  //여기까지가 helpdiana
  {
    path: '/typography',
    
    name: 'typography',
    component: () => import('@/views/typography/Typography.vue'),
  },
  {
    path: '/icons',
    name: 'icons',
    component: () => import('@/views/icons/Icons.vue'),
  },
  {
    path: '/cards',
    name: 'cards',
    component: () => import('@/views/cards/Card.vue'),
  },
  {
    path: '/simple-table',
    name: 'simple-table',
    component: () => import('@/views/simple-table/SimpleTable.vue'),
  },
  {
    path: '/form-layouts',
    name: 'form-layouts',
    component: () => import('@/views/form-layouts/FormLayouts.vue'),
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
  },
  {
    path: '/login',
    name: 'pages-login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/register',
    name: 'pages-register',
    component: () => import('@/views/pages/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
];


export default routes;