import { useState, useEffect } from "react";

// Custom hook to add attachment parameter to URLs
const useAttachmentUrl = (baseUrl) => {
  const [attachmentUrl, setAttachmentUrl] = useState("");

  useEffect(() => {
    if (baseUrl) {
      const url = new URL(baseUrl);
      url.searchParams.append("attachment", "true");
      setAttachmentUrl(url.toString());
    }
  }, [baseUrl]);

  return attachmentUrl;
};

export default useAttachmentUrl;
