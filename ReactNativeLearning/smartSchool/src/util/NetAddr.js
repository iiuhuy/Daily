const NetAddr = {
  // 个人信息
  customerInfo: "/Shop/CustomerInfo",

  // 我的订单列表
  myOrderList: "/Shop/MyOrderList",

  // 上传图片
  upLoadImage: "/Resource/UploadImage",

  // 登录
  uesrLogin: "/oa/system/login/v1",

  // 校长端首页数据统计
  queryHomePageByConditions: "/oa/queryHomePageByConditions/v1",

  // 查询各年级各班的统计情况
  queryEveryGradeDataAnalysisByConditions:
    "/oa/queryEveryGradeDataAnalysisByConditions/v1",

  // 各班级各个科目的数据
  queryEverySubjectDataAnalysisByClazz:
    "/oa/queryEverySubjectDataAnalysisByClazz/v1",

  // 各班级的统计列表
  queryEverySubjectDataAnalysisList: "/oa/queryEverySubjectDataAnalysisList/v1",

  // 查询时间的 年/月
  queryConditionDate: "/oa/getTimeCondition/v1",

  // 科目查新
  getSubjectByClassId: "/oa/getSubjectByClassId/v1"
};

module.exports = NetAddr;
