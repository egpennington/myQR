import { useState } from "react";
import QRCode from "qrcode";

export default function QRGenerator() {
  const [text, setText] = useState("");
  const [qr, setQR] = useState("");

  const generateQR = async () => {
    if (!text) return;

    const url = await QRCode.toDataURL(text);
    setQR(url);
    console.log("Generating QR for:", text);
    console.log(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // stops page reload
    generateQR();
  };

  const downloadQR = () => {
    if (!qr) return;

    const link = document.createElement("a");
    link.href = qr;
    link.download = "qrcode.png";
    link.click();
    };

  return (
    <main className="app">
      <section className="qr-card">
        <h1 className="qr-title">myQR</h1>
        <p className="qr-subtitle">
          Generate a QR code from text or a URL.
        </p>

        <form className="qr-form" onSubmit={handleSubmit}>
          <input
            className="qr-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text or URL"
          />

          <button className="qr-button" type="submit">
            Generate
          </button>
        </form>

        {qr && (
            <div className="qr-output">
                <img src={qr} alt="QR Code" />

                <button className="qr-download" onClick={downloadQR}>
                Download PNG
                </button>
            </div>
        )}
      </section>
    </main>
  );
}