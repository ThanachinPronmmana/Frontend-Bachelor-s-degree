const Frominput = ({
  label,
  type = "text",
  register,
  name,
  defaultValue = "",
  error,
  ...rest
}) => {
  return (
    <div>
      <label className="text-base mb-1 block">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        {...(register ? register(name) : {})}
        className="input w-full h-10 border p-2 rounded-xl"
        {...rest}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Frominput;
