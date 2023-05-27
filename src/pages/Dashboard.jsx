import { Grid, Stack } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardCard from "../components/layout/DashboardCard";
import LoadingContainer from "../components/layout/LoadingContainer";
import { getDashboard } from "../redux/actions/dashboardActions";
import { loadingSelector } from "../redux/reducers/loadingReducer";
import { dashboardTypes } from "../redux/types";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state.common);
  React.useEffect(() => {
    dispatch(getDashboard({}));
  }, []);

  const isDashLoading = useSelector((state) =>
    loadingSelector(state, [dashboardTypes.GET_DASHBOARD_DATA])
  );

  console.log("dashboard", dashboard);
  return (
    <Stack>
      <Grid container spacing={3}>
        <LoadingContainer isLoading={isDashLoading} height={400}>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Total Installs"
              total={dashboard?.users}
              icon={"ant-design:android-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Total Products"
              total={dashboard?.products}
              color="info"
              icon={"eva:shopping-cart-outline"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Total Expired Products"
              total={dashboard?.expiredProducts}
              color="error"
              icon={"eva:shopping-cart-outline"}
            />
          </Grid>
        </LoadingContainer>

        {/* <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Item Orders"
            total={1723315}
            color="warning"
            icon={"ant-design:windows-filled"}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Bug Reports"
            total={234}
            color="error"
            icon={"ant-design:bug-filled"}
          />
        </Grid> */}
      </Grid>
    </Stack>
  );
  // return (
  //   <Card>
  //     <CardHeader title="Setting" />

  //     <Divider />
  //     <CardContent>
  //       {isLoading ? (
  //         <CircularProgress />
  //       ) : (

  //       )}
  //     </CardContent>
  //     <Divider />
  //     <CardActions>
  //       <LoadingButton
  //         variant="contained"
  //         loading={isLoading}
  //         size="small"
  //         onClick={() => formRef.current.click()}
  //       >
  //         Update
  //       </LoadingButton>
  //     </CardActions>
  //   </Card>
  // );
};

export default Dashboard;
