import { useAPIQuery } from "@/hooks";
import { Product } from "@/models";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Products = () => {
  const query = useAPIQuery({ url: "products/" });
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!query.isLoading) {
      setProducts(query.data?.products);
    }
  }, [query]);

  return (
    <div className="relative overflow-x-auto table-auto">
      {query.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col items-end px-12">
          <button
            className="bg-blue-500 p-2 rounded text-white"
            onClick={() => router.push("/create-product")}
          >
            Add product
          </button>
          <table className="w-full text-sm text-left border-solid">
            <thead className="text-xs uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                return (
                  <tr
                    key={product.id}
                    className="hover:cursor-pointer"
                    onClick={() => router.push("/product/" + product.id)}
                  >
                    <td scope="col" className="px-6 py-3">
                      {index + 1}
                    </td>
                    <td scope="col" className="px-6 py-3">
                      {product.name}
                    </td>
                    <td scope="col" className="px-6 py-3">
                      {product.description}
                    </td>
                    <td scope="col" className="px-6 py-3">
                      {product.price}
                    </td>
                    <td scope="col" className="px-6 py-3">
                      {product.quantity}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Products;
