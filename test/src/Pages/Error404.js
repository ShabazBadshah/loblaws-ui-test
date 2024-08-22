import Typography from "@mui/material/Typography";
import React from "react";
import Layout from "../Layout";

function Error404() {
  return (
    <Layout>
      <div>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 500,
          }}
        >
          Error 404. Page could not be found
        </Typography>
      </div>
    </Layout>
  );
}

export default Error404;
