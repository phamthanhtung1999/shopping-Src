export const transformList = (orders) => {
    const list = orders.map((order) => {
        const model = {
            id: order._id,
            receiver_name: order.receiverName,
            receiver_phone: order.receiverPhone,
            receiver_address: order.receiverAddress,
            status: order.status,
            detail: order.details.reduce((total, detail) => {
                let result = `${detail.product.name} ( ${new Intl.NumberFormat().format(detail.unitPrice)} x ${detail.quantity} )`;

                if (total != "") {
                    total += ", "
                }

                return total + result;
            }, ""),
            total_amt: order.details.reduce((total, current) => (
                total + current.unitPrice * current.quantity * (1 - current.discount)
            ), 0),
            created_at: order.createdAt
        }
    
        return model;
    })

    return list;
}

export const transform = (order, host = '') => {
    const model = {
        id: order._id,
        receiver_name: order.receiverName,
        receiver_phone: order.receiverPhone,
        receiver_address: order.receiverAddress,
        status: order.status,
        details: order.details.map((detail) => ({
            quantity: detail.quantity,
            unit_price: detail.unitPrice,
            discount: detail.discount,
            product_id: detail.product._id,
            product_name: detail.product.name,
            image_path: host + "/" + detail.product.imagePath
        })),
        total_amt: order.details.reduce((total, current) => (
            total + current.unitPrice * current.quantity * (1 - current.discount)
        ), 0),
        created_at: order.createdAt
    }

    return model;
}