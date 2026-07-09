import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { useRouter } from "next/router";

// Import komponen global
import Navbar from "@/components/navbar";
import LoginPopup from "@/components/auth/loginpopup";
import RegisterPopup from "@/components/auth/registerpopup";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);

  // Fungsi untuk Auth
  const handleLogin = (credentials: any) => {
    console.log("Login:", credentials);
    // Tambahkan logika set token/cookie di sini nanti
    setIsLoginPopupOpen(false);
  };

  const handleRegister = (data: any) => {
    console.log("Register:", data);
    setIsRegisterPopupOpen(false);
  };

  // Fungsi navigasi dari Navbar
  const handleShowPage = (page: string) => {
    if (page === 'home-page') {
      router.push('/');
    } else if (page === 'admin-dashboard') {
      router.push('/admin'); // Sesuaikan dengan route halaman admin Anda
    }
  };

  return (
    <>
      <Navbar 
        onShowPage={handleShowPage}
        onLoginClick={() => setIsLoginPopupOpen(true)}
        onRegisterClick={() => setIsRegisterPopupOpen(true)}
      />

      <main>
        <Component {...pageProps} />
      </main>

      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={() => setIsLoginPopupOpen(false)}
        onLogin={handleLogin}
      />
      
      <RegisterPopup
        isOpen={isRegisterPopupOpen}
        onClose={() => setIsRegisterPopupOpen(false)}
        onRegister={handleRegister}
      />
    </>
  );
}