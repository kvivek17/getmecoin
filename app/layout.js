import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";


export const metadata = {
  title: "Get me coin",
  description: "this is website help me to funding ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
  
      <body className="min-h-screen  [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <SessionWrapper>
            <Navbar/>
            <div className="min-h-screen   [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white ">
        {children}

            </div>
        <Footer/>
        </SessionWrapper>
      </body>
    </html>
  );
}
