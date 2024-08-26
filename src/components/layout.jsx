import HeroText  from "./HeroText";
import Header from "./Header";
import WebpageBody from "./WebpageBody/WebpageBody";
import "./globals.css"

export default function RootLayout({ children }) {
    return (
      <>        
      <Header/>
      <HeroText />
      <WebpageBody/>
       </>
    );
  }
  