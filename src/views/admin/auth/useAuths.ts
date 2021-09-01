import { onMounted, reactive, watch } from 'vue'
import authApi from '@/api/auth'
import { GetAuthsParams, Auth } from '@/api/auth'
import { PaginationData } from '@/types'

const useAuths = () => {
  const auths = reactive<PaginationData<Auth>>({ list: [], total: 0 })
  const query = reactive<GetAuthsParams>({ page: 1, pageSize: 15 })
  const getAuths = async (params: GetAuthsParams = query) => {
    authApi.getAuths(params).then((result) => {
      const { list, total } = result.data
      auths.list = list
      auths.total = total
    })
  }

  onMounted(getAuths)
  watch([() => query.page, () => query.pageSize], ([curPage, curPageSize]) => {
    getAuths({ ...query, page: curPage, pageSize: curPageSize })
  })

  return { auths, query, getAuths }
}

export default useAuths
