import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";

import Input from "@/components/Input";
import { useAPIMutation, useCurrentUser } from "@/hooks";
import { Roles } from "@/models";
import { useEffect } from "react";

type FormValues = {
  username: string;
  password: string;
  role: number;
};

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  role: yup.number().required(),
});

const CreateUser = () => {
  const { data, isLoading } = useCurrentUser();
  const userMutation = useAPIMutation({ url: "users/create" });
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!isLoading && data?.user?.role !== Roles.ADMIN) {
      router.push("/signIn");
    }
  }, [isLoading, data, router]);

  async function submit(data: FormValues) {
    await userMutation.mutateAsync(data);
  }

  return (
    <div>
      <div className="grid place-content-center gap-5 w-[100vw] h-[100vh]">
        <form onSubmit={form.handleSubmit(submit)}>
          <h2 className="text-2xl font-bold">Add user</h2>
          <Input label="Username" {...form.register("username")} />
          <Input label="Password" {...form.register("password")} />
          <label htmlFor="role" className="block">
            Role
          </label>
          <select id="role" {...form.register("role", { valueAsNumber: true })}>
            <option value="1">User</option>
            <option value="0">Admin</option>
          </select>
          <div>
            <button
              className="p-2 bg-blue-400 rounded text-white"
              type="submit"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
