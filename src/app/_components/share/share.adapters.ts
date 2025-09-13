import type { ShareData } from "./share.types";

export const buildXIntentHref = (share: ShareData) =>
  `https://twitter.com/intent/tweet?text=${share.enc.text.x}&url=${share.enc.url.x}`;

export const buildLineMsgHref = (share: ShareData) =>
  `https://line.me/R/msg/text/?${share.enc.text.line}`;
