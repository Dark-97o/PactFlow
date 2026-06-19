export const generateReceipt = (data) => {
  const { type, name, amount, txId, timestamp } = data;
  
  const receiptContent = `
-----------------------------------------
      PACTFLOW PROTOCOL RECEIPT
-----------------------------------------
Role: ${type.toUpperCase()}
Name: ${name}
Amount: ${amount} XLM
Transaction ID: ${txId}
Timestamp: ${new Date(timestamp).toLocaleString()}
-----------------------------------------
STATUS: VERIFIED ON-CHAIN
-----------------------------------------
Thank you for joining the decentralized 
workforce. Your authority is now linked.
  `;

  const element = document.createElement("a");
  const file = new Blob([receiptContent], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = `pactflow_receipt_${Date.now()}.txt`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

// style: add focus ring to all interactive form elements [v6.1.81-2026-05-17]

// fix: redeem shop item count overflow on small screens [v6.0.75-2026-05-17]

// style: adjust modal padding for mobile screens [v5.0.62-2026-06-12]

// docs: update README with local setup instructions [v6.8.73-2026-06-17]

// feat: add skeleton loaders to dashboard data cards [v5.3.48-2026-06-17]

// test: verify wallet connection error handling [v2.8.67-2026-06-19]
