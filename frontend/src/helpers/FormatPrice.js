

const FormatPrice = ({price}) => {
  return (
    Intl.NumberFormat("en-IN",{
      style:"currency",
      currency:"INR",
      maximumFractionDigits:2,
    }).format(price/100)//because this will give price in paisa ,therefore / by 100
  );
};

export default FormatPrice