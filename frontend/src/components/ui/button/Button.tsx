import Spinner from "@/components/ui/spinner";

export interface IButton {
  color?: "default" | "primary" | "danger" | "dark";
  children: any,
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  size?: "default" | "sm" | "xl",
  disabled?: boolean,
  className?: string,
  dark?: boolean,
  loading?: boolean,
}

const Button: React.FC<IButton> = (
  {
    loading = false,
    className,
    color = "default",
    size = "default",
    children,
    ...rest
  }) => {

  const bgColorVariants = {
    default: "bg-blue-300  hover:bg-blue-200 border-1 ",
    primary: "bg-yellow-300 hover:bg-yellow-200",
    danger: "bg-red-100 hover:bg-red-500 text-white ",
    warning: "bg-orange-100 hover:bg-orange-500 text-white",
    dark: "bg-gray-300  hover:bg-gray-100 border-0"
  };

  const sizeVariants = {
    default: "px-4 py-2 h-[34px]",
    sm: "px-1 py-1",
    xl: "px-4 py-3"
  };


  return (
    <button
      {...rest}
      className={`${className} ${bgColorVariants[color]} ${sizeVariants[size]} rounded font-semibold shadow-sm ring-0`}
    >
      {children}
      {loading && <Spinner isSpining={loading} />}
    </button>
  );
};

export default Button;
