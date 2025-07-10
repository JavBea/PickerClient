// stores/pickerItemStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
// import type { PickerItem } from '@/types' // Adjust the import path as needed

interface PickerItem {
  id: number
  name: string
  list_id: number
  probability: number | null
}

export const usePickerItemStore = defineStore('pickerItem', () => {
  // State
  const items = ref<PickerItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  async function fetchItemsByListId(listId: number) {
    try {
      loading.value = true
      error.value = null
      
      // Replace with your actual API call
      const response = await fetch(`/api/picker-items?list_id=${listId}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch items')
      }
      
      const data = await response.json()
      items.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error occurred'
      console.error('Error fetching picker items:', err)
    } finally {
      loading.value = false
    }
  }

  // Getters
  const getItemsByListId = (listId: number) => {
    return items.value.filter(item => item.list_id === listId)
  }

  return {
    // State
    items,
    loading,
    error,
    
    // Actions
    fetchItemsByListId,
    
    // Getters
    getItemsByListId
  }
})