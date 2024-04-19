import "@styles/globals.css";
import Header from "../components/Header";
import Provider from "@components/Provider";

export const metadata = {
  title: "Skill Forge",
  description: "Skill Forge is a platform for learning and improving skills.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </head>
      <body className="wholeBody">
        <Provider>
          <div>
            <main>
              <Header />
              <div style={{ width: "100%", height: "4vw" }}></div>
              {children}
            </main>
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
