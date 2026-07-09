import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { client } from '../lib/sanityClient';

const fallbackSettings = {
  siteName: 'ARCBUILD',
  defaultSeoTitle: 'ArcBuild Corporation | Construction & Real Estate Philippines',
  defaultSeoDescription: "ArcBuild Corporation is one of the Philippines' most trusted construction and real estate development companies — residential, commercial, and industrial.",
};

export async function generateMetadata() {
  const settings = (await client.fetch(`*[_id == "siteSettings"][0]{defaultSeoTitle, defaultSeoDescription}`)) || {};
  const title = settings.defaultSeoTitle || fallbackSettings.defaultSeoTitle;
  const description = settings.defaultSeoDescription || fallbackSettings.defaultSeoDescription;
  return {
    title: { default: title, template: `%s | ${fallbackSettings.siteName}` },
    description,
  };
}

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

const settingsQuery = `*[_id == "siteSettings"][0]`;

export default async function RootLayout({ children }) {
  const settings = (await client.fetch(settingsQuery)) || {};

  return (
    <html lang="en">
      <body>
        <Navbar siteName={settings.siteName} />
        {children}
        <Footer
          siteName={settings.siteName}
          footerTagline={settings.footerTagline}
          phone={settings.phone}
          email={settings.email}
          address={settings.address}
          licenseLabel={settings.licenseLabel}
          copyrightText={settings.copyrightText}
        />
      </body>
    </html>
  );
}
