<template>
  <div>
    <!-- 添加一个按钮，点击时打开 Drawer -->  
  <el-button type="primary" @click="drawer = true">
    open
  </el-button>

    <!-- Drawer 弹出层 -->
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <span>抽签方案</span>

      <el-ul>
        <el-li
          v-for="picker in pickerList"
          :key="picker.id"
          :class="['picker-item', { 'is-selected': selectedPickerId === picker.id }]"
          @mouseover="hover = picker.id"
          @mouseleave="hover = null"
          @click="selectPicker(picker.id)"
        >
          <!-- 修改图标 -->
          <el-icon @click.stop="renamePicker(picker.id)">
            <Edit />
          </el-icon>
          <!-- 删除图标 -->
          <el-icon @click.stop="deletePicker(picker.id)">
            <Close />
          </el-icon>

          <!-- picker 名称 -->
          {{ picker.name }}
        </el-li>
      </el-ul>
    </el-drawer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { usePickerStore } from '@/store/PickerListStore'; // 根据实际路径调整
import { Edit, Close } from '@element-plus/icons-vue'; // 图标组件

export default {
  components: {
    Edit,
    Close
  },
  setup() {
    const pickerStore = usePickerStore();
    const { pickerList, fetchAllPickers, renamePicker, deletePicker } = pickerStore;
    const drawer = ref(false);
    const selectedPickerId = ref(null); // 选中的 picker
    const hover = ref(null); // 当前 hover 的项

    // 页面加载时获取 pickerList
    onMounted(async () => {
      await fetchAllPickers();
    });

    // 选择某个 picker
    const selectPicker = (id) => {
      if (selectedPickerId.value === id) {
        selectedPickerId.value = null; // 如果点击的是已选中的项，取消选中
      } else {
        selectedPickerId.value = id; // 选择新的 picker
      }
    };

    // 修改 picker 名称
    const handleRenamePicker = (id) => {
      const newName = prompt('请输入新的名称：');
      if (newName) {
        renamePicker(id, newName);
      }
    };

    // 删除 picker
    const handleDeletePicker = (id) => {
      const confirmDelete = confirm('确定要删除该项吗？');
      if (confirmDelete) {
        deletePicker(id);
      }
    };

    return {
      drawer,
      pickerList,
      selectedPickerId,
      hover,
      selectPicker,
      handleRenamePicker,
      handleDeletePicker
    };
  }
};
</script>

<style scoped>
.picker-item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.picker-item:hover {
  background-color: #f0f0f0;
}

.picker-item.is-selected {
  background-color: #409eff;
  color: white;
}

.picker-item el-icon {
  margin-right: 10px;
  cursor: pointer;
}

.picker-item el-icon:hover {
  color: #409eff;
}
</style>
