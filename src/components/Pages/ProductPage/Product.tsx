import Input from "@/components/Input";
import { useAPIMutation, useAPIQuery } from "@/hooks";
import { Product as TProduct } from "@/models";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = {
  quantity: number;
};

const schema = yup.object().shape({
  quantity: yup.number().required(),
});

const Product = () => {
  const router = useRouter();
  const { id } = router.query;
  const [productId, setProductId] = useState("");
  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      setProductId(id as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const productQuery = useAPIQuery<{ product: TProduct }>({
    url: "products/" + productId,
  });
  const orderMutation = useAPIMutation({ url: "orders/create" });

  console.log(productQuery.data);

  async function handleOrder({ quantity }: FormValues) {
    await orderMutation.mutateAsync({
      product_id: parseInt(productId),
      quantity: quantity,
      price: productQuery.data?.product.price,
    });

    productQuery.refetch();
  }

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={() => router.push("/product/" + productId + "/orders")}
      >
        See product orders
      </button>
      {productQuery.isLoading && <div>Loading...</div>}
      {!productQuery.isLoading && productQuery.data && (
        <div className="flex flex-col ">
          <div className="text-5xl pb-10">
            {productQuery.data.product?.name}
          </div>
          <div>
            <strong>Description:</strong>{" "}
            {productQuery.data.product?.description}
          </div>
          <div>
            <strong>Price:</strong> {productQuery.data.product?.price}
          </div>
          <div>
            <strong>Available:</strong> {productQuery.data.product?.quantity}
          </div>
          <form onSubmit={form.handleSubmit(handleOrder)}>
            <Input
              label="Quantity"
              placeholder="Enter quantity"
              {...form.register("quantity")}
            />

            {form.formState.errors.quantity && (
              <div className="text-red-500 pb-2">Enter quantity</div>
            )}
            <button
              className="p-2 bg-blue-400 rounded text-white"
              type="submit"
            >
              Order
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Product;
