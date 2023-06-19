import Document , { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          />

          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/mortezaom/google-sans-cdn@master/fonts.css"
          />

{/*           <script
            src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.6.2/socket.io.min.js"
            integrity="sha512-mUWPbwx6PZatai4i3+gevCw6LeuQxcMgnJs/DZij22MZ4JMpqKaEvMq0N9TTArSWEb5sdQ9xH68HMUc30eNPEA=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            async 
          ></script> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
