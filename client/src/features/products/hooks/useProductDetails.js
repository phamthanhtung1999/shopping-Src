import { useEffect, useState } from "react";
import productApi from "../../../api/productApi";

export default function useProductApi(productId) {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({})

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const res = await productApi.get(productId)
      } catch (error) {
        console.log("fail to fetch product", error);
      }
      setLoading(false)
    }

    )()
  }, [productId])
}