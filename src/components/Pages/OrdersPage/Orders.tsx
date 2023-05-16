import { useAPIQuery } from "@/hooks";
import { Product } from "@/models";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Orders = () => {
  const router = useRouter();
  const { id } = router.query;
  const [productId, setProductId] = useState("");
  const productQuery = useAPIQuery<{ product: Product }>({
    url: "products/" + productId,
  });

  useEffect(() => {
    setProductId(id as string);
  }, [productId, id]);

  return (
    <div>
      <h3 className="text-3xl font-semibold">
        Orders for product {productQuery.data?.product?.name}
      </h3>
      <table>
        <thead>
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Total Price
            </th>
            <th scope="col" className="px-6 py-3">
              Ordered at
            </th>
          </tr>
        </thead>
        <tbody>
          {productQuery.data &&
            productQuery.data.product?.orders.map((order, index) => {
              return (
                <tr key={order.id}>
                  <td scope="col" className="px-6 py-3">
                    {index + 1}
                  </td>
                  <td scope="col" className="px-6 py-3">
                    {order.quantity}
                  </td>
                  <td scope="col" className="px-6 py-3">
                    {order.total_price}
                  </td>
                  <td scope="col" className="px-6 py-3">
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
