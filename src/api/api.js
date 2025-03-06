import axios from "axios"
const base_url = process.env.REACT_APP_BASE_URL;
// const access_token = localStorage.getItem('access-token-user');
export const ORDER_CHECKOUT = async (data) => {
    return await new Promise((resolve, reject) => {
        axios.post(`${base_url}/orders/checkout-order`, data).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}

export const GET_PRODUCT_DETAILS = async () => {
    const access_token = localStorage.getItem('access-token-user');
    if (!access_token) {
        return await new Promise((resolve, reject) => {
            axios.get(`${base_url}/product/`).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        })
    } else {
        return await new Promise((resolve, reject) => {
            axios.get(`${base_url}/product/`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        })
    }

}
export const ADD_TO_CART = async (data) => {
    const access_token = localStorage.getItem('access-token-user');
    return await new Promise((resolve, reject) => {
        axios.post(`${base_url}/product/cart/`, data,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        ).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const ADD_TO_WISHLIST = async (data) => {
    const access_token = localStorage.getItem('access-token-user');
    return await new Promise((resolve, reject) => {
        axios.post(`${base_url}/product/wishlist/`, data,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        ).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const GET_CART = async (data) => {
    const access_token = localStorage.getItem('access-token-user');

    return await new Promise((resolve, reject) => {
        axios.get(`${base_url}/product/cart/`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        ).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const GET_WISHLIST = async (data) => {
    const access_token = localStorage.getItem('access-token-user');

    return await new Promise((resolve, reject) => {
        axios.get(`${base_url}/product/wishlist/`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        ).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const DELETE_WISHLIST = async (id) => {
    const access_token = localStorage.getItem('access-token-user');

    return await new Promise((resolve, reject) => {
        axios.delete(`${base_url}/product/wishlist/?wishlist_id=${id}`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        ).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const DELETE_CART = async (id) => {
    const access_token = localStorage.getItem('access-token-user');

    return await new Promise((resolve, reject) => {
        axios.delete(`${base_url}/product/cart/${id}/`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        ).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const ORDER_PLACED = async (data) => {
    const access_token = localStorage.getItem('access-token-user');

    return await new Promise((resolve, reject) => {
        axios.post(`${base_url}/order/`, data,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        ).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const GET_ALL_ORDER = async () => {
    const access_token = localStorage.getItem('access-token-user');

    return await new Promise((resolve, reject) => {
        axios.get(`${base_url}/order/?is_paid=False`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        ).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const ORDER_PAYMENT_TOKEN = async (id, data) => {
    const access_token = localStorage.getItem('access-token-user');

    return await new Promise((resolve, reject) => {
        axios.post(`${base_url}/order/checkout-order/${id}/`, data,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        ).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const VERIFY_PAYMENT_TOKEN = async (data) => {
    const access_token = localStorage.getItem('access-token-user');

    return await new Promise((resolve, reject) => {
        axios.post(`${base_url}/order/verify-payment/`, data,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        ).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const GET_ALL_BANNERS = async () => {
    const access_token = localStorage.getItem('access-token-user');

    return await new Promise((resolve, reject) => {
        axios.get(`${base_url}/product/banners/`).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            reject(err);
        })
    })
}


export const GET_ALL_PAID = async () => {
    const access_token = localStorage.getItem('access-token-user');
    return await new Promise((resolve, reject) => {
        axios.get(`${base_url}/order/?is_paid=True`, {
            headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${access_token}` },

        }).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}
export const ADD_REVIEW = async (data) => {
    const access_token = localStorage.getItem('access-token-user');
    return await new Promise((resolve, reject) => {
        axios.post(`${base_url}/order/reviews/`,data, {
            headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${access_token}` },

        }).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}
export const APPLY_COUPON = async (id,data) => {
    const access_token = localStorage.getItem('access-token-user');
    return await new Promise((resolve, reject) => {
        axios.post(`${base_url}/order/apply-coupon/${id}/`,data, {
            headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${access_token}` },

        }).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}
export const GET_SINGLE_PRODUCT_DETAILS = async (id) => {
    const access_token = localStorage.getItem('access-token-user');
    if (!access_token) {
        return await new Promise((resolve, reject) => {
            axios.get(`${base_url}/product/${id}/`).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        })
    } else {
        return await new Promise((resolve, reject) => {
            axios.get(`${base_url}/product/${id}/`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        })
    }

}










export const REGISTER = async (data) => {
    return await new Promise((resolve, reject) => {
        axios.post(`${base_url}/register/`, data).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const LOGIN = async (data) => {
    return await new Promise((resolve, reject) => {
        axios.post(`${base_url}/login/`, data).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}
export const GET_USER_DATA = async () => {
    const userId = localStorage.getItem('userid')
    return await new Promise((resolve, reject) => {
        axios.get(`${base_url}/user/${userId}`).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}