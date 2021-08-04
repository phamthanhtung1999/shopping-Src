import { useEffect, useState } from "react";
import productApi from "../../../api/productApi";

export default function useProductDetailApi(slug) {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({})

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const res = await productApi.get(slug)
        setProduct(res.data)
      } catch (error) {
        console.log("fail to fetch product", error);
      }
      setLoading(false)
    }
    )()
  }, [slug])

  return { product, loading }
}