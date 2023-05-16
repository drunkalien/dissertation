import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/Input";
import { useAPIMutation } from "@/hooks";
import { useForm } from "react-hook-form";

type FormValues = {
  username: string;
  password: string;
};

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const SignIn = () => {
  const loginMutation = useAPIMutation({ url: "users/login" });
  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  async function handleSignIn(data: FormValues) {
    const mutation = await loginMutation.mutateAsync(data);
    localStorage.setItem("token", mutation.data.token);
  }

  return (
    <div className="grid place-content-center gap-5 h-[90vh]">
      <h3 className="font-semibold text-3xl">Sign In</h3>
      <form onSubmit={form.handleSubmit(handleSignIn)}>
        <Input label="Username" {...form.register("username")} />
        <Input
          label="Password"
          type="password"
          {...form.register("password")}
        />
        <button className="p-2 bg-blue-400 rounded" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
