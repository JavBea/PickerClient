import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios'; // 使用 axios 进行 HTTP 请求

export const usePickerStore = defineStore('picker', () => {
  // 定义 picker_list 数据
   const pickerList = ref<{ id: number; name: string; availability: 'available' | 'unavailable'; created_time: string | null }[]>([]);

  // 获取全部 picker_list
  const fetchAllPickers = async () => {
    try {
      const response = await axios.get('/api/picker_list'); // 假设 API 路径是这个
      pickerList.value = response.data; // 假设返回的数据是一个数组
    } catch (error) {
      console.error('获取 picker_list 失败:', error);
    }
  };

  // 重命名某个 picker
  const renamePicker = async (id: number, newName: string) => {
    try {
      const response = await axios.put(`/api/picker_list/${id}`, { name: newName });
      if (response.status === 200) {
        // 更新本地数据
        const picker = pickerList.value.find(p => p.id === id);
        if (picker) {
          picker.name = newName;
        }
      }
    } catch (error) {
      console.error('重命名 picker 失败:', error);
    }
  };

  // 删除某个 picker
  const deletePicker = async (id:number) => {
    try {
      const response = await axios.delete(`/api/picker_list/${id}`);
      if (response.status === 200) {
        // 从本地列表中删除
        pickerList.value = pickerList.value.filter(picker => picker.id !== id);
      }
    } catch (error) {
      console.error('删除 picker 失败:', error);
    }
  };

  // 需要在组件中使用时返回
  return {
    pickerList,
    fetchAllPickers,
    renamePicker,
    deletePicker,
  };
});
