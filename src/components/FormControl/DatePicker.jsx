import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  return <DatePicker selected={startDate} onChange={(date) => setStartDate} />;
};

export default DatePicker;
