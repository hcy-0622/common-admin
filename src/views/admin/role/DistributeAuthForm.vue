<template>
  <el-dialog v-model="visible" title="分配权限">
    <el-tree
      ref="tree"
      :data="treeProps.data"
      :props="treeProps.defaultProps"
      node-key="id"
      default-expand-all
      :default-checked-keys="treeProps.defaultCheckedKeys"
      show-checkbox
    ></el-tree>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="confirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
import authApi from '@/api/auth'
import type { Role } from '@/api/role'

interface Props {
  role?: Role
}
interface TreeProps {
  data: any[]
  defaultProps: Record<string, any>
  defaultCheckedKeys: number[]
}

const props = defineProps<Props>()
const emit = defineEmits(['succeed', 'failed'])
const visible = ref(false)
const tree = ref()
const treeProps = reactive<TreeProps>({
  data: [],
  defaultProps: {
    children: 'children',
    label: 'rightsName',
  },
  defaultCheckedKeys: [],
})

onMounted(() => {
  authApi.getAuths({}).then((result) => {
    treeProps.data = result.data
  })
})

watch(
  () => props.role,
  (role) => {
    if (role) {
      const ids = role.rights.filter((r) => r.level === 2).map((r) => r.id)
      treeProps.defaultCheckedKeys = ids
      tree.value && tree.value.setCheckedKeys(ids)
    }
  }
)

const confirm = async () => {
  if (!props.role) return
  try {
    const keys = [...tree.value.getCheckedKeys(), ...tree.value.getHalfCheckedKeys()]
    const newKeys = keys.filter((k) => !treeProps.defaultCheckedKeys.includes(k))
    const prevKeys = keys.filter((k) => treeProps.defaultCheckedKeys.includes(k))
    const delKeys = treeProps.defaultCheckedKeys.filter((k) => !prevKeys.includes(k))
    if (newKeys.length > 0) {
      await authApi.createRoleAuths(props.role.id, newKeys)
      ElMessage.success('添加权限成功')
    }
    if (delKeys.length > 0) {
      await authApi.deleteRoleAuths(props.role.id, delKeys)
      ElMessage.success('移除权限成功')
    }
    close()
    emit('succeed')
  } catch (e) {
    console.error(e)
    emit('failed')
  }
}
const show = () => {
  visible.value = true
}
const close = () => {
  visible.value = false
}
defineExpose({ show, close })
</script>
