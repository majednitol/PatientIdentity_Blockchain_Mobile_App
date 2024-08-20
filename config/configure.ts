import {config as conf} from 'dotenv';
conf();
const _config = {
  contract_address: process.env.CONTRACT_ADDRESS,
  project_id: process.env.PROJECT_ID,
  secret_key: process.env.SECRET_KEY,
  api_url: process.env.API_URL,
  private_key: process.env.PRIVATE_KEY,
  pinta_api_key: process.env.PINATA_API_KEY,
  pinta_secret_key: process.env.PINATA_SECRET_KEY,
  // 0xF0E64dD48580D759e6301449fA7a2e001B15643B
};
const config = Object.freeze(_config);
export default config;
