import React, { useEffect } from "react";
import Dashboard from "../../components/ui/Dashboard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Home = () => {
  const navigation = useNavigate();
  // const auth = useSelector((state) => state.auth);
  // useEffect(() => {
  //   navigation("/customers");
  //   // navigation("/customer_details?id=666037a55b664811817b64e7");
  // }, []);

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.role === "Admin") {
      navigation("/customers");
    } else {
      navigation(`/customer_details?id=${auth?.customer_id}`);
    }
  }, [auth.role, navigation]);

  return <Dashboard />;
};

export default Home;
