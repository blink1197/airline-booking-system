import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

export const useAddonsStore = defineStore(
  'addons', () => {
    const addOns = reactive({
      'travel insurance': { addOnName: 'travel insurance', selected: true, price: 0 },
      'extra baggage': { addOnName: 'extra baggage', selected: false, price: 0 },
      'seat selector': { addOnName: 'seat selector', selected: false, price: 0 }
    })

    const addonsList = computed(() => Object.values(addOns))

    function updateAddOn(name, updates) {
      if (addOns[name]) {
        addOns[name] = { ...addOns[name], ...updates }
      }
    }

    function toggleAddOn(name) {
      if (addOns[name]) {
        addOns[name].selected = !addOns[name].selected
      }
    }

    function resetAddOns() {
      Object.keys(addOns).forEach(key => {
        addOns[key].selected = false
        addOns[key].price = 0
      })
    }

    return {
      addOns,
      addonsList,
      updateAddOn,
      toggleAddOn,
      resetAddOns
    }
  },
  {
    persist: false
  }
)
