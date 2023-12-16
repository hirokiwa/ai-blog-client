import Image from "next/image";
import loadingAnimation from './../../public/loading.gif'

const Loading = () => (
  <div style={{
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}>
    <div
      style={{
        textAlign: "center",
      }}
    >
      <Image
        src={loadingAnimation}
        alt={"AIおじさん"}
        width={300}
      />
      <hr/>
      <p
        style={{
          margin: "1em",
        }}
      >loading...</p>
    </div>
  </div>
)

export default Loading;