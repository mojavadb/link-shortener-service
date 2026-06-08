export function validateUrl (url: string): {isValid: boolean, error?: string} {

  if (!url || url.trim() === "") {
    return { isValid: false, error: "ورودی ارسالی خالی است." };
  }

  const trimmedUrl = url.trim();

  // 2. بررسی حداقل طول (مثلاً حداقل 5 کاراکتر)
  if (trimmedUrl.length < 5) {
    return { isValid: false, error: "ورودی ارسالی بسیار کوچک است" };
  }

  // 3. بررسی حداکثر طول (اختیاری)
  if (trimmedUrl.length > 2048) {
    return { isValid: false, error: "ورودی ارسالی بسیار بزرگ است" };
  }

  // 4. بررسی وجود پروتکل (http://, https://, ftp://)
  let urlToCheck = trimmedUrl;
  if (!/^https?:\/\//i.test(trimmedUrl)) {
    // اگر پروتکل ندارد، https:// اضافه می‌کنیم برای بررسی
    urlToCheck = "https://" + trimmedUrl;
  }

  // 5. اعتبارسنجی با regex پیشرفته
  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
  
  if (!urlPattern.test(trimmedUrl) && !urlPattern.test(urlToCheck)) {
    return { isValid: false, error: "فرمت لینک صحیح نیست" };
  }

  // 6. بررسی با URL constructor (روش مدرن)
  try {
    const urlObject = new URL(urlToCheck);
    
    // اعتبارسنجی پروتکل
    if (!["http:", "https:", "ftp:"].includes(urlObject.protocol)) {
      return { isValid: false, error: "پروتکل پشتیبانی نمی‌شود. فقط http:// و https://" };
    }
    
    // بررسی وجود hostname
    if (!urlObject.hostname || urlObject.hostname === "") {
      return { isValid: false, error: "دامنه لینک معتبر نیست" };
    }
    
    // بررسی IP های خصوصی و localhost (اختیاری - برای امنیت)
    const hostname = urlObject.hostname.toLowerCase();
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      hostname.startsWith("172.")
    ) {
      return { isValid: false, error: "لینک‌های داخلی پشتیبانی نمی‌شوند" };
    }
    
    // بررسی طول کلی لینک
    if (urlObject.toString().length > 2048) {
      return { isValid: false, error: "لینک بسیار طولانی است" };
    }
    
    return { isValid: true };
    
  } catch (error) {
    return { isValid: false, error: "فرمت لینک نامعتبر است" };
  }
};