import * as StellarSdk from "@stellar/stellar-sdk";

async function main() {
  const rpcServer = new StellarSdk.rpc.Server("https://soroban-testnet.stellar.org");
  const server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");
  const pk = "GCLCYN2IIMY47IFK42QG47NY3D55G77IHL5P22F662Y2H6N4J6L34A4J"; // any valid address
  const account = await server.loadAccount(pk);
  
  const tx = new StellarSdk.TransactionBuilder(account, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: StellarSdk.Networks.TESTNET
  })
  .addOperation(StellarSdk.Operation.invokeContractFunction({
    contract: "CDICFUHEFDULYY46R7AUWLX6UYNQAVB2UPMOPE3K5K66IZ75M2QBLHMQ",
    function: "get_balance",
    args: [StellarSdk.nativeToScVal("CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC", { type: "address" })]
  }))
  .setTimeout(30)
  .build();

  const simResponse = await rpcServer.simulateTransaction(tx);
  console.log("SimResponse Keys:", Object.keys(simResponse));
  
  if (simResponse.error) {
    console.error("Simulation error:", simResponse.error);
  } else if (simResponse.result) {
    console.log("Result:", simResponse.result);
    console.log("Native:", StellarSdk.scValToNative(simResponse.result.retval));
  } else {
    console.log("Full simResponse:", JSON.stringify(simResponse, null, 2));
  }
}

main().catch(console.error);
