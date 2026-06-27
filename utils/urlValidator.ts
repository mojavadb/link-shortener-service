export function validateUrl (url: string): {isValid: boolean, error?: string} {

  if (!url || url.trim() === "") {
    return { isValid: false, error: " آدرس نباید خالی باشد" };
  }

  const trimmedUrl = url.trim();

  if (trimmedUrl.length < 5) {
    return { isValid: false, error: " آدرس بسیار کوچک است" };
  }

  if (trimmedUrl.length > 2048) {
    return { isValid: false, error: "آدرس بسیار بزرگ است" };
  }

  let urlToCheck = trimmedUrl;
  if (!/^https?:\/\//i.test(trimmedUrl)) {
    urlToCheck = "https://" + trimmedUrl;
  }

  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
  
  if (!urlPattern.test(trimmedUrl) && !urlPattern.test(urlToCheck)) {
    return { isValid: false, error: "فرمت  آدرس صحیح نیست" };
  }

  try {
    const urlObject = new URL(urlToCheck);
    
    if (!["http:", "https:", "ftp:"].includes(urlObject.protocol)) {
      return { isValid: false, error: "پروتکل از  آدرس پشتیبانی نمیکند. فقط http:// و https://" };
    }
    
    if (!urlObject.hostname || urlObject.hostname === "") {
      return { isValid: false, error: "دامنه  آدرس معتبر نیست" };
    }

    const hostname = urlObject.hostname.toLowerCase();
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      hostname.startsWith("172.")
    ) {
      return { isValid: false, error: "آدرس های داخلی پشتیبانی نمی‌شوند" };
    }
    
    if (urlObject.toString().length > 2048) {
      return { isValid: false, error: "آدرس بسیار طولانی است" };
    }
    
    return { isValid: true };
    
  } catch (error) {
    return { isValid: false, error: "فرمت آدرس نامعتبر است" };
  }
};