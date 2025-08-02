import { number } from "zod/v4";

async function soroSwapApi<T>(url: string): Promise<T | null> {
  const headers = {
    Authorization: `Bearer ${process.env.SOROSWAP_API_KEY}`,
    "Content-Type": "application/json",
  };
}

interface RequestBuilderQueryParams {
  network?: string;
}

//Quote
interface ProtocolQuoteRequest {
  network?: string;
}

interface ProtocolQuoteResponse {
  availableProtocols: string[];
}

interface QuoteRequest {
  assetIn: string;
  assetOut: string;
  amount: number;
  tradeType: "EXACT_IN" | "EXACT_OUT";
  protocols: string[][];
  parts?: number;
  slippageBps?: number;
  maxHops?: number;
  assetLists?: string[];
  feeBps?: number;
  gaslessTrustline?: string;
}
interface QuoteResponse {
  /**Input asset contract address */
  assetIn: string;
  /** Output asset contract address*/
  assetOut: string;
  /** expected input amount in stroops*/
  amountIn: string;
  /** expected output amount in stroops*/
  amountOut: string;
  /** minimum output or maximum output considering slippage protection*/
  otherAmountThreshold: number;
  /**Type of trade: EXACT_IN = input fixed; EXACT_OUT = output fixed */
  tradeType: "EXACT_IN" | "EXACT_OUT";
  /** Estimated price impact of the trade, as a percentage string*/
  priceImpactPct: number;
  /** Enum: "router" "aggregator" "sdex"
   * Indicates where the trade is routed: "router" (only Soroswap), "aggregator"
   * (aggregating more DEXes on Soroban), or "sdex" (The Stellar Classic DEX)*/
  platform: "router" | "aggregator" | "sdex";
  /** Internal object containing raw transaction data or metadata needed to execute the trade.
   * Structure varies by platform */
  rawTrade: object;
  /**Array of route steps (e.g., AMMs, pools) with associated splits and paths.
   * The sum of the percentages should be 100.*/
  routePlan: object[];
  /**Platform fee details - only present if fee is specified */
  platformFee: object;
}

interface BuildQuoteRequest {
  /**The quote to build the XDR for */
  quote: QuoteResponse;
  /**The wallet address that will send the funds */
  from?: string;
  /**The wallet address that will receive the funds.
   * If Gasless Trustline Swap is enabled, this is the wallet address must be the same as the from address
   * (hence, don't provide this parameter) */
  to?: string;
  /** The referral id wallet address (required when feeBps is provided)*/
  referralId?: string;
  /** The wallet address that will sponsor the transaction.
   * Only required for Gasless Trustline Swap and Soroban sponsored transactions*/
  sponsor?: string;
  /** The signed transaction XDR from Step 1 of Soroban sponsored transactions.
   * Required for Step 2 when sponsor is provided for non-SDEX platforms.*/
  signedUserXDR?: string;
}

interface BuildQuoteResponse {
  /**Transaction XDR ready for signing and execution */
  transactionXdr: string;
}

interface SendQuoteRequest {
  /** The signed transaction in XDR format */
  signedTransactionXDR: string;
  /** Whether to use launchtube or not */
  launchTube: boolean;
}

interface SendQuoteResponse {
  /** Transaction Hash*/
  transactionHash: string;
  /** Transaction Status */
  transactionStatus: string;
}

//Pools
// these are query parameters for the available pool request
interface AvailablePoolsRequest {
  /**Network in which the pairs will be searched i.e mainnet & testnet */
  network: string;
  /** Protocol in which the pairs will be searched */
  protocol: string;
  /**Filter pairs by asset lists (e.g. SOROSWAP, AQUA, STELLAR_EXPERT, LOBSTR) */
  assetList: string[];
}

interface PoolResponse {
  /**protocol name */
  protocol: string;
  /**Pool Contract Address */
  address: string;
  /** first token contract address */
  tokenA: string;
  /** */
  tokenB: string;
  /** */
  reserveA: string;
  /** */
  reserveB: string;
  /** */
  ledgerNo: number;
}

interface AvailablePoolsResponse {
  /** an Array of pools */
  pools: PoolResponse[][];
}

// path params and query params for the get pools for two tokens req
interface GetPoolsForTwoTokensRequest {
  /** path params */
  tokenA: string;
  tokenB: string;

  /** query params */
  network: string;
  protocol: string[];
}

interface GetPoolsForTwoTokensResponse {
  pools: PoolResponse[][];
}
//Asset List
interface ListAssetsRequest {
  /** query parameter */
  name: "SOROSWAP" | "AQUA" | "STELLAR_EXPERT" | "LOBSTR";
}

interface ListAssetResponse {
  result: object[];
}

//Price

interface Pricedata {
  asset: string;
  referenceCurrency: string;
  price: string;
}

interface PriceInfoRequest {
  /**network with wich the price will be searched i.e mainnet or testnet */
  network: string;
  /** asset contract address or list seperated by commas */
  asset: string[];
  /** reference currency, default is USD */
  referenceCurrency?: any;
}

interface PriceInfoResponse {
  priceData: Pricedata[][];
}

// Liquidity
interface AddLiquidityRequest {
  assetA: string;
  assetB: string;
  amountA: number;
  amountB: number;
  to: string;
  /**slippage tolerance in basis points (bps). 10000 = 100%,
   * 100 = 1%, 50 = 0.5%. Default is 50 bps (0.5%) */
  slippageBps?: string;
}

interface AddLiquidityResponse {
  /** transaction xdr  */
  transactionXdr: string;
}

function buildUrl(
  url: string,
  queryparams?: RequestBuilderQueryParams
): string {}
