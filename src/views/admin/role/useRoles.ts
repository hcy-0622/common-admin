import { onMounted, reactive, watch } from 'vue'
import roleApi, { GetRolesParams, Role } from '@/api/role'
import { PaginationData } from '@/types'

const useRoles = () => {
  const roles = reactive<PaginationData<Role>>({ list: [], total: 0 })
  const query = reactive<GetRolesParams>({ page: 1, pageSize: 15 })
  const getRoles = async (params: GetRolesParams = query) => {
    roleApi.getRoles(params).then((result) => {
      const { list, total } = result.data
      roles.list = list
      roles.total = total
    })
  }

  onMounted(getRoles)
  watch([() => query.page, () => query.pageSize], ([curPage, curPageSize]) => {
    getRoles({ ...query, page: curPage, pageSize: curPageSize })
  })

  return { roles, query, getRoles }
}

export default useRoles
