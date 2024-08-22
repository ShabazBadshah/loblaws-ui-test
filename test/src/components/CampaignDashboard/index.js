import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCampaignMetrics } from "../../controllers/campaignController";
import Layout from "../../Layout";

const MetricCard = ({ metricDisplayTitle, metricValue }) => (
  <Paper elevation={3} sx={{ p: 2 }}>
    <Typography variant="h6">{metricDisplayTitle}</Typography>
    {!metricValue ? (
      <CircularProgress />
    ) : (
      <Typography variant="body1">{metricValue}</Typography>
    )}
  </Paper>
);

const FETCH_DELAY_MS = 1000;
let num = 0;

const CampaignDashboard = ({ name }) => {
  const { cid } = useParams();

  const metricsDisplayValueMap = {
    "Total Impressions": "totalImpressions",
    "Total Clicks": "totalClicks",
    CTR: "ctr",
    "Total Users": "totalUsers",
    "Current Number": "currentNumber",
    "Most Recent Impressions": "mostRecentImpressions",
    "Most Recent Clicks": "mostRecentClicks",
    "Most Recent CTR": "mostRecentCTR",
    "Most Recent Users": "mostRecentUsers",
  };

  const [metrics, setMetrics] = useState({
    totalImpressions: 0,
    totalClicks: 0,
    ctr: 0,
    totalUsers: 0,
    currentNumber: 0,
    mostRecentImpressions: 0,
    mostRecentClicks: 0,
    mostRecentCTR: 0,
    mostRecentUsers: 0,
  });

  const updateMetrics = (fetchedMetrics) => {
    setMetrics((prevState) => ({
      ...prevState,
      totalImpressions: prevState.totalImpressions + fetchedMetrics.impressions,
      totalClicks: prevState.totalClicks + fetchedMetrics.clicks,
      ctr: (
        ((prevState.totalClicks + fetchedMetrics.clicks) /
          (prevState.totalImpressions + fetchedMetrics.impressions)) *
        100
      ).toFixed(2),
      totalUsers: prevState.totalUsers + fetchedMetrics.users,
      currentNumber: num,
      mostRecentImpressions: fetchedMetrics.impressions,
      mostRecentClicks: fetchedMetrics.clicks,
      mostRecentCTR: (
        (fetchedMetrics.clicks / fetchedMetrics.impressions) *
        100
      ).toFixed(2),
      mostRecentUsers: fetchedMetrics.users,
    }));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const fetchMetrics = async () => {
        try {
          const fetchedMetrics = await getCampaignMetrics(cid, num);
          updateMetrics(fetchedMetrics);
        } catch (err) {
          console.error(err);
        }
      };
      fetchMetrics();
      num++;
    }, FETCH_DELAY_MS);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item container xs={12}>
          <Typography variant="h5">
            Viewing metrics for campaign ID: {cid} and number: {num}
          </Typography>
        </Grid>

        {Object.keys(metricsDisplayValueMap).map((metricTitle) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={metricTitle}>
              <MetricCard
                metricDisplayTitle={metricTitle}
                metricValue={metrics[metricsDisplayValueMap[metricTitle]]}
              />
            </Grid>
          );
        })}
      </Grid>
    </Layout>
  );
};

export default CampaignDashboard;
