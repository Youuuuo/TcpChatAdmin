import request from './../../utils/request'

export default {
  /**获取所有群聊 */
  getAllGroup() {
    return request.get('/group/all')
  },
  /**通过群号获取群聊信息*/
  getGroupByCode(vale) {
    return request.get('/group/getGroupByCode?username='+ vale)
  }
}
