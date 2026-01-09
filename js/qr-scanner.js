function onScanSuccess(qrMessage) {
    document.getElementById("qr-result").innerText = "QR Code Scanned: " + qrMessage;
    localStorage.setItem("voter_id", qrMessage.trim());
    // Redirect to voter details page after a brief delay
    setTimeout(() => {
      window.location.href = "voter.html";
    }, 1500);
  }
  
  const html5QrCode = new Html5Qrcode("reader");
  html5QrCode.start(
    { facingMode: "environment" },
    { 
      fps: 10, 
      qrbox: (viewfinderWidth, viewfinderHeight) => {
        const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
        return { width: Math.floor(minEdge * 0.7), height: Math.floor(minEdge * 0.7) };
      }
    },
    onScanSuccess
  ).catch(err => console.error("QR scanning error:", err));
  