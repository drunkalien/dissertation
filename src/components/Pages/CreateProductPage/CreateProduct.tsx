import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/Input";
import { useAPIMutation, useCurrentUser } from "@/hooks";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

type FormValues = {
  name: string;
  description: string;
  price: number;
  quantity: number;
};

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  quantity: yup.number().required(),
});

const CreateProduct = () => {
  const productMutation = useAPIMutation({ url: "products/create" });
  const { data, isLoading, error } = useCurrentUser();
  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!isLoading) {
      console.log(data);
    }
  }, [isLoading, data]);

  async function submit(values: FormValues) {
    const mutation = await productMutation.mutateAsync(values);
  }

  return (
    <div className="grid place-content-center gap-5 w-[100vw] h-[100vh]">
      <h3 className="font-semibold text-3xl">Create Product</h3>
      <form onSubmit={form.handleSubmit(submit)}>
        <Input label="Product Name" {...form.register("name")} />
        <Input label="Description" {...form.register("description")} />
        <Input label="Price" {...form.register("price")} />
        <Input label="Quantity" {...form.register("quantity")} />
        <button className="p-2 bg-blue-400 rounded text-white" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
