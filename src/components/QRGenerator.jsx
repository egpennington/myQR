import { useState } from "react";
import QRCode from "qrcode";

export default function QRGenerator() {
    const [text, setText] = useState("");
    const [qr, setQR] = useState("");

    const generateQR = async () => {
        if(!text) return;
        const url = await QRCode.toDataURL(text);
        setQR(url);
        console.log("Generating QR for:", text);
        console.log(url);
    };

    return (
        <div>
            <input 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder = "Enter text or URL"            
            />
            <button onClick={generateQR}>Generate</button>

            {qr && <img src={qr} alt="QR Code" />}
        </div>
    );
}
