import { forwardRef, HTMLProps, useId } from "react";

type InputProps = Omit<HTMLProps<HTMLInputElement>, "className">;

type Props = InputProps & {
  label: string;
  type?: string;
};

const Input = forwardRef(
  ({ label, type = "text", ...props }: Props, ref: any) => {
    const inputId = useId();
    return (
      <div className="flex flex-col my-1 py-2">
        <label htmlFor={inputId}>{label}</label>
        <input
          className="border border-black"
          type={type}
          id={inputId}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
