import orderApi from "api/orderApi";
import { useEffect, useState } from "react";


export default function useOrdDetailsApi(orderId) {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({})

  // useEffect(() => {
  //   (
  //     async () => {
  //       try {
  //         setLoading(true)
  //         const res = await orderApi.getOne(orderId)
  //         setOrder(res.data)
  //       } catch (error) {
  //         console.log("fail to fetch order", error);
  //       }
  //       setLoading(false)
  //     }
  //   )()

  // }, [orderId])
  useEffect(() => {
    setLoading(true)
    orderApi.getOne(orderId).then((res) => {
      setOrder(res.data)
    }).catch(err => console.log(err))
    setLoading(false)

  }, [orderId])

  return { order, loading }
}