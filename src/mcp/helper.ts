async function soroSwapApi<T>(url: string): Promise<T | null> {
  const headers = {
    Authorization: `Bearer ${process.env.SOROSWAP_API_KEY}`,
    "Content-Type": "application/json",
  };
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
interface PoolsInfoRequest {}
//Asset List

//Price

// Liquidity
interface LiquidityRequest {
  assetA: string;
  assetB: string;
  amountA: number;
  amountB: number;
  to: string;
  slippageBps: string;
}

interface LiquidityResponse {
  transactionXdr: string;
}
