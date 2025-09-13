import type { ShareData } from "./share.types";

const freeze = <T extends object>(o: T) => Object.freeze(o);

const buildUtmUrl = (
  base: string,
  source: "x" | "line" | "other",
  campaign = "share_button"
) => {
  const u = new URL(base);
  u.searchParams.set("utm_source", source);
  u.searchParams.set("utm_medium", "social");
  u.searchParams.set("utm_campaign", campaign);
  return u.toString();
};

export const buildShareData = (args: {
  blogTitle: string;
  blogId: string;
  baseOrigin?: string;
  campaign?: string;
}): ShareData => {
  const {
    blogTitle,
    blogId,
    baseOrigin = "https://ai-blog.hirokiwa.com",
    campaign = "share_button",
  } = args;

  const baseUrl = `${baseOrigin}/post/${blogId}`;

  const url = freeze({
    x: buildUtmUrl(baseUrl, "x", campaign),
    line: buildUtmUrl(baseUrl, "line", campaign),
    other: buildUtmUrl(baseUrl, "other", campaign),
  });

  const text = freeze({
    x: `${blogTitle}\n#関西弁でお届けするAIおじさん毎日ブログ @ojisan_model\n`,
    line: `『${blogTitle}』\n関西弁でお届けするAIおじさん毎日ブログ\n${url.line}`,
    other: `『${blogTitle}』関西弁でお届けするAIおじさん毎日ブログ`,
  });

  const enc = freeze({
    url: freeze({
      x: encodeURIComponent(url.x),
      line: encodeURIComponent(url.line),
      other: encodeURIComponent(url.other),
    }),
    text: freeze({
      x: encodeURIComponent(text.x),
      line: encodeURIComponent(text.line),
    }),
  });

  return freeze({ url, text, enc });
};
