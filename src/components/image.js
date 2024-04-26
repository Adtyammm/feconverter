// Di komponen React Anda
import axios from "axios";
import React, { useEffect, useState } from "react";

function ImageDisplay() {
  const [latestImage, setLatestImage] = useState(null);

  useEffect(() => {
    axios
      .get("/api/images/latest")
      .then((response) => {
        setLatestImage(response.data);
      })
      .catch((error) => {
        console.error("Error fetching latest image:", error);
      });
  }, []);

  return (
    <div>
      {latestImage && (
        <div>
          <h2>Latest Image</h2>
          <img
            src={`data:${latestImage.processedImage.contentType};base64,${latestImage.processedImage.data}`}
            alt="Latest"
          />
          <h1>{latestImage.processedImage.width}</h1>
          <h1>asd</h1>
        </div>
      )}
    </div>
  );
}

export default ImageDisplay;
