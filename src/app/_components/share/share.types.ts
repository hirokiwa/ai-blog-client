export type ShareUrls = Readonly<{ x: string; line: string; other: string }>;
export type ShareTexts = Readonly<{ x: string; line: string; other: string }>;

export type ShareEncoded = Readonly<{
  url: Readonly<{ x: string; line: string; other: string }>;
  text: Readonly<{ x: string; line: string }>; // other is not encoded for navigator.share
}>;

export type ShareData = Readonly<{
  url: ShareUrls;   // raw URL
  text: ShareTexts; // raw text
  enc: ShareEncoded;
}>;
