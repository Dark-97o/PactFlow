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
