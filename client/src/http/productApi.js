import {$authHost, $host} from "./index";

export const createType = async (type) =>{
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () =>{
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) =>{
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () =>{
    const {data} = await $host.get('api/brand', )
    return data
}

export const createProduct = async (product) =>{
    const {data} = await $authHost.post('api/product', product)
    return data
}

export const fetchProducts = async (type_id, brand_id, page, limit = 5, searchName) =>{
    const {data} = await $host.get('api/product', {params:
    {
        type_id ,brand_id, page, limit, searchName
    }
    })
    return data
}
export const fetchOneProduct = async (id) =>{
    const {data} = await $host.get('api/product/' + id)
    return data
}

export const addToBasket = async (product_id) => {
    const {data} = await $authHost.post('api/basket', product_id)
    return data
}

export const deleteFromBasket = async (id) => {
    const {data} = await $authHost.post('api/basket/delete/'  + id, id)
    return data
}

export const getBasket = async () => {
    const {data} = await $authHost.get('api/basket')
    return data
}