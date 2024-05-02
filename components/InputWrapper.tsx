interface CardWrapperProps {
  children: React.ReactNode;
}

const InputWrapper = ({ children }: CardWrapperProps) => {
  return (
    <div className="flex flex-col md:flex-row w-full gap-4">{children}</div>
  );
};

export default InputWrapper;
