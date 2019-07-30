import request from '@/utils/request'

// 获取变更类型列表
export function getModifyTypeList(query) {
  return request({
    url: '/modify/typeList',
    method: 'get',
    params: query
  })
}
