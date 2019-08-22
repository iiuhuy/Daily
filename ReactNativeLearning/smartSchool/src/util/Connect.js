import HttpUtils from "./HttpUtils";
import NetAddr from "./NetAddr";

export default class Connect {
  /**
   * 个人信息接口
   */
  static getCustomerInfo(success) {
    HttpUtils.get(NetAddr.customerInfo, null, response => {
      success && success(response);
    });
  }

  /**
   * 订单列表
   */
  static postMyOrderList(params, success) {
    HttpUtils.post(NetAddr.myOrderList, params, response => {
      success && success(response);
    });
  }

  /**
   * 登录
   */
  static login(params, success) {
    HttpUtils.post(NetAddr.uesrLogin, params, response => {
      success && success(response);
    });
  }

  /**
   * 上传图片
   */
  static uploadImageFile(images, params, success) {
    HttpUtils.uploadFile(NetAddr.upLoadImage, images, params, response => {
      success && success(response);
    });
  }

  /**
   * 校长端首页数据统计
   */
  static queryHomePageByConditions(params, success) {
    HttpUtils.post(NetAddr.queryHomePageByConditions, params, response => {
      success && success(response);
    });
  }

  /**
   * 条件查询各年级各班的统计情况
   */
  static queryEveryGradeDataAnalysisByConditions(params, success) {
    HttpUtils.post(
      NetAddr.queryEveryGradeDataAnalysisByConditions,
      params,
      response => {
        success && success(response);
      }
    );
  }

  /**
   * 各班级各个科目的数据
   */
  static queryEverySubjectDataAnalysisByClazz(params, success) {
    HttpUtils.post(
      NetAddr.queryEverySubjectDataAnalysisByClazz,
      params,
      response => {
        success && success(response);
      }
    );
  }

  /**
   * 各班级的统计列表
   */
  static queryEverySubjectDataAnalysisList(params, success) {
    HttpUtils.post(
      NetAddr.queryEverySubjectDataAnalysisList,
      params,
      response => {
        success && success(response);
      }
    );
  }

  /**
   * 查询时间, 时间不用前端写, 因为创建的日期后台会返回
   */
  static queryConditionDate(params, success) {
    HttpUtils.post(NetAddr.queryConditionDate, params, response => {
      success && success(response);
    });
  }

  /**
   * 查询科目
   */
  static getSubjectByClassId(params, success) {
    HttpUtils.post(NetAddr.getSubjectByClassId, params, response => {
      success && success(response);
    });
  }
}
