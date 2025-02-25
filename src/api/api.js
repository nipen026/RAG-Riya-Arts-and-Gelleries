import axios from "axios"
const base_url = process.env.REACT_APP_BASE_URL;
const access_token = localStorage.getItem('access-token');
export const ORDER_CHECKOUT = async(data) =>{
    return await new Promise((resolve,reject)=>{
        axios.post(`${base_url}/orders/checkout-order`,data).then((res)=>{
            resolve(res);
        }).catch((err)=>{
            reject(err);
        })
    })
}

export const GET_PRODUCT_DETAILS = async() =>{
    return await new Promise((resolve,reject)=>{
        axios.get(`${base_url}/product/`).then((res)=>{
            resolve(res);
        }).catch((err)=>{
            reject(err);
        })
    })
}
export const ADD_TO_CART = async(data) =>{
    return await new Promise((resolve,reject)=>{
        axios.post(`${base_url}product/cart/`,data,
            {headers:{
                Authorization:`Bearer ${access_token}`
            }}
        ).then((res)=>{
            resolve(res);
        }).catch((err)=>{
            reject(err);
        })
    })
}
export const GET_CART = async(data) =>{
    return await new Promise((resolve,reject)=>{
        axios.get(`${base_url}product/cart/`,
            {headers:{
                Authorization:`Bearer ${access_token}`
            }}
        ).then((res)=>{
            resolve(res.data);
        }).catch((err)=>{
            reject(err);
        })
    })
}
export const DELETE_CART = async(id) =>{
    return await new Promise((resolve,reject)=>{
        axios.delete(`${base_url}product/cart/${id}/`,
            {headers:{
                Authorization:`Bearer ${access_token}`
            }}
        ).then((res)=>{
            resolve(res.data);
        }).catch((err)=>{
            reject(err);
        })
    })
}
export const ORDER_PLACED = async(data) =>{
    return await new Promise((resolve,reject)=>{
        axios.post(`${base_url}order/`,data,
            {headers:{
                Authorization:`Bearer ${access_token}`
            }}
        ).then((res)=>{
            resolve(res.data);
        }).catch((err)=>{
            reject(err);
        })
    })
}
export const GET_ALL_ORDER = async() =>{
    return await new Promise((resolve,reject)=>{
        axios.get(`${base_url}order/?is_paid=False`,
            {headers:{
                Authorization:`Bearer ${access_token}`
            }}
        ).then((res)=>{
            resolve(res.data);
        }).catch((err)=>{
            reject(err);
        })
    })
}
export const ORDER_PAYMENT_TOKEN = async(id,data) =>{
    return await new Promise((resolve,reject)=>{
        axios.post(`${base_url}order/checkout-order/${id}/`,data,
            {headers:{
                Authorization:`Bearer ${access_token}`
            }}
        ).then((res)=>{
            resolve(res.data);
        }).catch((err)=>{
            reject(err);
        })
    })
}
export const VERIFY_PAYMENT_TOKEN = async(data) =>{
    return await new Promise((resolve,reject)=>{
        axios.post(`${base_url}order/verify-payment/`,data,
            {headers:{
                Authorization:`Bearer ${access_token}`
            }}
        ).then((res)=>{
            resolve(res.data);
        }).catch((err)=>{
            reject(err);
        })
    })
}

















export const REGISTER = async(data) =>{
    return await new Promise((resolve,reject)=>{
        axios.post(`${base_url}register/`,data).then((res)=>{
            resolve(res);
        }).catch((err)=>{
            reject(err);
        })
    })
}