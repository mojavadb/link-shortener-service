export function validateUrl(url: string): { isValid: boolean; error?: string } {
  if (!url || url.trim() === "") {
    return { isValid: false, error: "لینک نمی‌تواند خالی باشد" };
  }

  const trimmedUrl = url.trim();

  if (trimmedUrl.length < 3) {
    return { isValid: false, error: "لینک بسیار کوتاه است" };
  }

  if (trimmedUrl.length > 2000) {
    return { isValid: false, error: "لینک بسیار طولانی است" };
  }

  let urlToCheck = trimmedUrl;
  if (!trimmedUrl.startsWith("http://") && !trimmedUrl.startsWith("https://")) {
    urlToCheck = "https://" + trimmedUrl;
  }

  try {
    new URL(urlToCheck);
    return { isValid: true };
  } catch {
    return { isValid: false, error: "فرمت لینک معتبر نیست (مثال: https://example.com)" };
  }
}