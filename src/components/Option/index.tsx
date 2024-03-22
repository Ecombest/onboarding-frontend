import { Option } from "@/interface/option.interface";

const Option = ({ option }: { option: Option }) => {
  return (
    <div
      style={{
        width: 200,
        height: 150,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        flexDirection: "column",
        padding: 10,
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 0px rgba(107, 110, 112, 0.254)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${option.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
        }}
      ></div>
      <div>
        <strong>{option.name}</strong>
      </div>
    </div>
  );
};

export default Option;
