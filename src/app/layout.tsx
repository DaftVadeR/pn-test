import { Metadata } from 'next';
import Layout from '../components/layout';
import "../components/layout/globals.css";
import '../components/layout/layout.scss';

export const metadata: Metadata = {
  title: "CiaoChow",
  description: "CiaoChow - FEWD IS GEWD",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    // apple: '/apple-icon.png',
    // other: {
    //   rel: 'apple-touch-icon-precomposed',
    //   url: '/apple-touch-icon-precomposed.png',
    // },
  },
  
};

export default Layout;