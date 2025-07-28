import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const SOROSWAP_API_URL = "https://soroswap-api-staging-436722401508.us-central1.run.app/"
const SOROSWAP_API_KEY = 

const server = new McpServer({
  name: "Yoyo",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

