import { useParams } from "react-router-dom";
import OutstandingDetails from "./OutstandingDetails";
import InterimsDetails from "./InterimsDetails";
import DashboardDetails from "./DashboardDetails";
import MeterDetails from "./MeterDetails";
import PropertyDetails from "./PropertyDetails";
function Details() {
  const { type } = useParams();

  if (type === "Outstanding") {
    return <OutstandingDetails />;
  }

  if (type === "Interims") {
    return <InterimsDetails />;
  }
if (type === "Meters") {
    return <MeterDetails />;
  }
  if (type === "Property") {
    return <PropertyDetails />;
  }
  return <h2>Invalid Type</h2>;
}

export default Details;