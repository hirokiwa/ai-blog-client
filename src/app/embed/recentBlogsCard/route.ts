import { NextResponse } from "next/server";

const scriptContent = `(() => {
  const AUTHOR_NAME = "AI おじさん";
  const STYLE_ID = "ai-blog-widget-style";
  const ROOT_CLASS = "ai-blog-widget";
  const CARD_WRAPPER_CLASS = "ai-blog-scroll";
  const CARD_CLASS = "ai-blog-card";
  const AUTHOR_CLASS = "ai-blog-author";
  const TEXT_LIMIT = 60;

  const resolveBaseUrl = (scriptEl) => {
    try {
      return new URL(scriptEl.src).origin;
    } catch (error) {
      console.warn("AI Blog Widget: Failed to resolve base URL.", error);
      return window.location.origin;
    }
  };

  const createRoot = (scriptEl) => {
    const targetSelector = scriptEl.dataset.target;
    if (targetSelector) {
      const target = document.querySelector(targetSelector) || document.getElementById(targetSelector);
      if (target) {
        target.classList.add(ROOT_CLASS);
        return target;
      }
    }
    const container = document.createElement("div");
    container.className = ROOT_CLASS;
    if (scriptEl.parentNode) {
      scriptEl.parentNode.insertBefore(container, scriptEl.nextSibling);
    } else if (scriptEl instanceof Element && scriptEl.insertAdjacentElement) {
      scriptEl.insertAdjacentElement("afterend", container);
    }
    return container;
  };

  const ensureStyle = () => {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = String.raw\`
      .\${ROOT_CLASS} {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: #111827;
        width: 100%;
      }
      .\${ROOT_CLASS} * {
        box-sizing: border-box;
      }
      .\${CARD_WRAPPER_CLASS} {
        display: flex;
        gap: 16px;
        overflow-x: auto;
        padding: 8px 16px;
        scrollbar-width: thin;
      }
      .\${CARD_WRAPPER_CLASS}::-webkit-scrollbar {
        height: 8px;
      }
      .\${CARD_WRAPPER_CLASS}::-webkit-scrollbar-thumb {
        background-color: rgba(0,0,0,0.2);
        border-radius: 9999px;
      }
      .\${CARD_CLASS} {
        flex: 0 0 280px;
        background: #fff;
        border: 1px solid #e5e7eb;
        border-radius: 16px;
        padding: 16px;
      }
      .\${CARD_CLASS}:hover,
      .\${CARD_CLASS}:focus {
        transform: translateY(-2px);
      }
      .\${CARD_CLASS} h3 {
        font-size: 1rem;
        line-height: 1.4;
        margin: 0 0 8px;
        color: #0f172a;
      }
      .\${CARD_CLASS} .ai-blog-date {
        font-size: 0.8rem;
        color: #6b7280;
        margin-bottom: 12px;
      }
      .\${CARD_CLASS} .ai-blog-body {
        font-size: 0.9rem;
        line-height: 1.5;
        color: #374151;
        min-height: 66px;
      }
      .\${AUTHOR_CLASS} {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 16px;
      }
      .\${AUTHOR_CLASS} img {
        width: 40px;
        height: 40px;
        border-radius: 9999px;
        object-fit: cover;
        border: 1px solid #e5e7eb;
        background: #fff;
      }
      .\${AUTHOR_CLASS} span {
        font-weight: 600;
        color: #0f172a;
      }
      .ai-blog-state {
        font-size: 0.9rem;
        color: #374151;
        padding: 12px 0;
      }
    \`;
    document.head.appendChild(style);
  };

  const truncate = (text = "") => {
    if (text.length <= TEXT_LIMIT) return text;
    return \`\${text.slice(0, TEXT_LIMIT)}…\`;
  };

  const formatDate = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const createCard = (blog, iconUrl, baseUrl) => {
    const card = document.createElement("a");
    card.className = CARD_CLASS;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    if (blog && blog.id) {
      try {
        card.href = new URL(\`/post/\${blog.id}\`, baseUrl).toString();
      } catch (error) {
        console.warn("AI Blog Widget: invalid blog URL", error);
      }
    }
    const title = blog && blog.title ? blog.title : "タイトル未設定";
    card.innerHTML = \`
      <h3>\${title}</h3>
      <div class="ai-blog-date">\${formatDate(blog.publishedAt)}</div>
      <div class="ai-blog-body">\${truncate(blog.body)}</div>
      <div class="\${AUTHOR_CLASS}">
        <img src="\${iconUrl}" alt="\${AUTHOR_NAME}">
        <div>
          <span>\${AUTHOR_NAME}</span>
        </div>
      </div>
    \`;
    return card;
  };

  const render = (root, blogs, iconUrl, baseUrl) => {
    const wrapper = document.createElement("div");
    wrapper.className = CARD_WRAPPER_CLASS;
    blogs.forEach((blog) => wrapper.appendChild(createCard(blog, iconUrl, baseUrl)));
    root.innerHTML = "";
    root.appendChild(wrapper);
  };

  const displayState = (root, message) => {
    root.innerHTML = \`<div class="ai-blog-state">\${message}</div>\`;
  };

  const fetchBlogs = async (baseUrl) => {
    const response = await fetch(new URL("/api/get-recent-blogs", baseUrl).toString(), {
      mode: "cors",
      credentials: "omit",
    });
    if (!response.ok) throw new Error("Failed to fetch blogs");
    const payload = await response.json();
    return payload && Array.isArray(payload.data) ? payload.data : [];
  };

  const init = async () => {
    const scriptEl = document.currentScript || document.querySelector('script[src*="embed.js"]');
    if (!scriptEl) {
      console.warn("AI Blog Widget: script element not found.");
      return;
    }
    ensureStyle();
    const root = createRoot(scriptEl);
    displayState(root, "読み込み中...");
    const baseUrl = resolveBaseUrl(scriptEl);
    const iconUrl = new URL("/ojisan_icon_128x128.webp", baseUrl).toString();
    try {
      const blogs = await fetchBlogs(baseUrl);
      if (!blogs.length) {
        displayState(root, "公開中のブログがありません。");
        return;
      }
      render(root, blogs, iconUrl, baseUrl);
    } catch (error) {
      console.error("AI Blog Widget:", error);
      displayState(root, "ブログ情報を取得できませんでした。");
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();`;

export const revalidate = 300;

export const dynamic = "force-static";

export const GET = () =>
  new NextResponse(scriptContent, {
    status: 200,
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=300",
    },
  });
