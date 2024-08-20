import HeroText  from "./hero";
import Header from "./header";
import WebpageBody from "./body";
import "./globals.css"

export default function RootLayout({ children }) {
    return (
        <html lang="en">
         
            <body>
            <Header/>
     
        <HeroText />
       <WebpageBody/>
        </body>
      </html>
    );
  }
  