import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if(!newProduct?.name || !newProduct?.price || !newProduct?.image) {
      return {success: false, message: 'Please provide all the required fields'}
    }

    const newProductJSON = JSON.stringify(newProduct)

    const response = await fetch("/api/products", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: newProductJSON
    })

    const data = await response.json()

    set((state) => ({products: [...state.products, data.data]}))
    return {success: true, message: 'Product created'}
  }
}))