import request from '@/utils/request'

// 获取变更类型列表
export function getModifyTypeList(query) {
  return request({
    url: '/modify/typeList',
    method: 'get',
    params: query
  })
}

// 获取变更等级列表
export function getModifyLevelList(query) {
  return request({
    url: '/modify/levelList',
    method: 'get',
    params: query
  })
}

// 获取变更来源列表
export function getModifySourceList(query) {
  return request({
    url: '/modify/sourceList',
    method: 'get',
    params: query
  })
}
