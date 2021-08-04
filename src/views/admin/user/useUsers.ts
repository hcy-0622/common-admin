import { onMounted, reactive, watch } from 'vue'
import { PaginationData } from '@/types/common'
import { GetUsersParams, User } from '@/types/user'
import userApi from '@/api/user'

const useUsers = () => {
  const users = reactive<PaginationData<User>>({ list: [], total: 0 })
  const query = reactive<GetUsersParams>({ page: 1, pageSize: 15 })
  const getUsers = async (params: GetUsersParams = query) => {
    userApi.getUsers(params).then((result) => {
      const { list, total } = result.data
      users.list = list
      users.total = total
    })
  }

  onMounted(getUsers)
  watch([() => query.page, () => query.pageSize], ([curPage, curPageSize]) => {
    getUsers({ ...query, page: curPage, pageSize: curPageSize })
  })

  return { users, query, getUsers }
}

export default useUsers
