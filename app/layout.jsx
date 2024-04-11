import "@styles/globals.css";
import Header from "../components/Header";

export const metadata = {
  title: "Skill Forge",
  description: "Skill Forge is a platform for learning and improving skills.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="wholeBody">
        <div>
          <main>
            <Header />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
