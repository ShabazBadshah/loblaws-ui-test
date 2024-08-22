import axios from "axios";

const BASE_API_URL = "http://localhost:4000/campaigns";

async function getAllCampaigns() {
  try {
    const {
      data: { campaigns },
    } = await axios.get(`${BASE_API_URL}/`);

    return campaigns.map((campaign) => {
      return { id: parseInt(campaign.id), name: campaign.name.toString() };
    });
  } catch (err) {
    return null;
  }
}

async function getCampaignMetrics(cid, num) {
  try {
    const {
      data: { impressions, clicks, users },
    } = await axios.get(`${BASE_API_URL}/${cid}?number=${num}`);
    return {
      impressions: parseInt(impressions),
      clicks: parseInt(clicks),
      users: parseInt(users),
    };
  } catch (err) {
    return null;
  }
}

export { getAllCampaigns, getCampaignMetrics };
