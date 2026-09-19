export type ShareResult = "shared" | "copied" | "failed";

export async function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* fall through to the legacy path */
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}

export async function shareLink(data: {
  title: string;
  text: string;
  url: string;
}): Promise<ShareResult> {
  if ("share" in navigator) {
    try {
      await navigator.share(data);
      return "shared";
    } catch (error) {
      // The user closing the native sheet is not an error
      if (error instanceof DOMException && error.name === "AbortError") {
        return "failed";
      }
    }
  }
  return (await copyText(data.url)) ? "copied" : "failed";
}
