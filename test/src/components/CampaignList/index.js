import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { getAllCampaigns } from "../../controllers/campaignController";

function CampaignList() {
  const [campaignList, setCampaignList] = useState([]);

  useEffect(() => {
    const fetchCampaignList = async () => {
      try {
        const fetchedCampaigns = await getAllCampaigns();
        setCampaignList(fetchedCampaigns);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCampaignList();
  }, []);

  return (
    <div>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 500,
        }}
      >
        Campaign List
      </Typography>
      <Typography variant="body1" sx={{ pb: 4 }}>
        Select a campaign below to view its statistics
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="campaign table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">ID</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">Name</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaignList.map((campaign) => (
              <TableRow
                key={campaign.id}
                sx={{
                  textDecoration: "none",
                  "&:hover": {
                    backgroundColor: "lightblue",
                    cursor: "pointer",
                  },
                }}
              >
                <TableCell>
                  <Link
                    to={`/campaigns/${campaign.id}`}
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Typography variant="h6">{campaign.id}</Typography>
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <Link to={`/campaigns/${campaign.id}`} sx={{ width: "100%" }}>
                    <Typography variant="body1">{campaign.name}</Typography>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CampaignList;
