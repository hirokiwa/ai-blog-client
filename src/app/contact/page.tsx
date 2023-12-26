import TopicPath from "@/components/TopicPath";

const Contact = () => {
  return (
    <main className="w-full bg-white text-black flex justify-center py-10">
      <div className="w-[640px]">
        <div className="mx-4">
          <TopicPath path={[{name: "ホーム", href: "/"}, {name: "お問い合わせ", href: null}]} />
        </div>
        <div className="bg-gray-100 mt-4">
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfJSIOBowLKuFb106H9XKbrZ1XwjIl-05oONrYf1lT2ML9UUQ/viewform?embedded=true" width={"100%"} height="1100" title="お問い合わせフォーム">読み込んでいます…</iframe>
        </div>
        <div className="mx-4">
          <TopicPath path={[{name: "ホーム", href: "/"}, {name: "お問い合わせ", href: null}]} />
        </div>
      </div>
    </main>
  )
}

export default Contact;