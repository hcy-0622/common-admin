import { onMounted, reactive, watch } from 'vue'
import { GetRoleParams, Role } from '@/types/role'
import roleApi from '@/api/role'
import { PaginationData } from '@/types/common'

const useRoles = () => {
  const roles = reactive<PaginationData<Role>>({ list: [], total: 0 })
  const query = reactive<GetRoleParams>({ page: 1, pageSize: 15 })
  const getRoles = async (params: GetRoleParams = query) => {
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
