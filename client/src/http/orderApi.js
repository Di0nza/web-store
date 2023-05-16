import {$authHost} from "./index";

export const createOrder = async (order) => {
    const {data} = await $authHost.post('api/order', order)
    return data
}
export const fetchOneOrder = async (id) => {
    const {data} = await $authHost.post('api/order/' + id, id)
    return data
}
export const fetchOrdersOnUser = async () => {
    const {data} = await $authHost.get('api/order')
    return data
}

export const fetchOrdersOnAdmin = async () => {
    const {data} = await $authHost.get('api/order/admin')
    return data
}

export const updateOrderStatusOnAdmin = async (statusAndIdOfOrder) => {
    console.log(statusAndIdOfOrder.id +' '+statusAndIdOfOrder.status)
    const {data} = await $authHost.post('api/order/admin/'+statusAndIdOfOrder.id, statusAndIdOfOrder)
    return data
}

