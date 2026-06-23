import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../../lib/firebase";
import { X, Mail, Lock, User, Eye, EyeOff, Loader } from "lucide-react";

interface AuthModalProps {
  onClose: () => void;
}

export function AuthModal({ onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  // Terjemahkan pesan error Firebase ke Bahasa Indonesia
  function getErrorMessage(code: string): string {
    switch (code) {
      case "auth/invalid-email":
        return "Format email tidak valid.";
      case "auth/user-not-found":
        return "Email tidak terdaftar.";
      case "auth/wrong-password":
        return "Password salah.";
      case "auth/email-already-in-use":
        return "Email sudah digunakan. Coba login.";
      case "auth/weak-password":
        return "Password minimal 6 karakter.";
      case "auth/invalid-credential":
        return "Email atau password salah.";
      case "auth/popup-closed-by-user":
        return "Login Google dibatalkan.";
      case "auth/too-many-requests":
        return "Terlalu banyak percobaan. Coba lagi nanti.";
      default:
        return "Terjadi kesalahan. Coba lagi.";
    }
  }

  async function handleSubmit() {
    setError("");
    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }
    if (mode === "register" && !name) {
      setError("Nama wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });
      }
      onClose();
    } catch (err: any) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setGoogleLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err: any) {
      setError(getErrorMessage(err.code));
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    // Overlay gelap di belakang modal
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        fontFamily: "'Inter', sans-serif",
      }}
      onClick={onClose}
    >
      {/* Modal box */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "420px",
          padding: "32px",
          position: "relative",
          boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
          maxHeight: "min(85dvh, 720px)",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          paddingBottom: "calc(32px + env(safe-area-inset-bottom))",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol tutup */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "#f5f5f4",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#78716c",
          }}
        >
          <X size={16} />
        </button>

        {/* Logo & judul */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div
            style={{
              background: "#ea580c",
              borderRadius: "10px",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
            }}
          >
            <User size={24} style={{ color: "#fff" }} />
          </div>
          <h2
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "#1c1917",
              letterSpacing: "-0.02em",
            }}
          >
            {mode === "login" ? "Masuk ke Akun" : "Buat Akun Baru"}
          </h2>
          <p style={{ fontSize: "0.82rem", color: "#78716c", marginTop: "4px" }}>
            {mode === "login"
              ? "Selamat datang kembali di BM Truss"
              : "Daftar dan mulai belanja sekarang"}
          </p>
        </div>

        {/* Tombol Google */}
        <button
          onClick={handleGoogle}
          disabled={googleLoading}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "11px",
            border: "1.5px solid #e7e5e4",
            borderRadius: "10px",
            background: "#ffffff",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#1c1917",
            cursor: googleLoading ? "not-allowed" : "pointer",
            opacity: googleLoading ? 0.7 : 1,
            marginBottom: "20px",
            transition: "border-color 0.15s, background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#fafaf9")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
        >
          {googleLoading ? (
            <Loader size={18} style={{ animation: "spin 1s linear infinite" }} />
          ) : (
            // Logo Google SVG
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.1-2.7-.4-4z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.2 0-9.6-2.9-11.3-7.1l-6.6 4.8C9.7 39.6 16.3 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6.2 5.2C41 35.2 44 30 44 24c0-1.3-.1-2.7-.4-4z"/>
            </svg>
          )}
          {mode === "login" ? "Masuk dengan Google" : "Daftar dengan Google"}
        </button>

        {/* Garis pemisah */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "#e7e5e4" }} />
          <span style={{ fontSize: "0.75rem", color: "#a8a29e" }}>atau</span>
          <div style={{ flex: 1, height: "1px", background: "#e7e5e4" }} />
        </div>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Input Nama — hanya muncul saat register */}
          {mode === "register" && (
            <div>
              <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#292524", display: "block", marginBottom: "6px" }}>
                Nama Lengkap
              </label>
              <div style={{ position: "relative" }}>
                <User size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#a8a29e" }} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama lengkap Anda"
                  style={{
                    width: "100%",
                    padding: "10px 12px 10px 36px",
                    border: "1.5px solid #e7e5e4",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    outline: "none",
                    boxSizing: "border-box",
                    color: "#1c1917",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#ea580c")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#e7e5e4")}
                />
              </div>
            </div>
          )}

          {/* Input Email */}
          <div>
            <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#292524", display: "block", marginBottom: "6px" }}>
              Email
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#a8a29e" }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="email@contoh.com"
                style={{
                  width: "100%",
                  padding: "10px 12px 10px 36px",
                  border: "1.5px solid #e7e5e4",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  outline: "none",
                  boxSizing: "border-box",
                  color: "#1c1917",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#ea580c")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e7e5e4")}
              />
            </div>
          </div>

          {/* Input Password */}
          <div>
            <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#292524", display: "block", marginBottom: "6px" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#a8a29e" }} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Minimal 6 karakter"
                style={{
                  width: "100%",
                  padding: "10px 40px 10px 36px",
                  border: "1.5px solid #e7e5e4",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  outline: "none",
                  boxSizing: "border-box",
                  color: "#1c1917",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#ea580c")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e7e5e4")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#a8a29e",
                  padding: 0,
                }}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Pesan error */}
          {error && (
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                padding: "10px 12px",
                fontSize: "0.8rem",
                color: "#dc2626",
              }}
            >
              {error}
            </div>
          )}

          {/* Tombol submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? "#d6d3d1" : "#ea580c",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "0.88rem",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "background 0.15s",
              marginTop: "4px",
            }}
          >
            {loading && <Loader size={16} style={{ animation: "spin 1s linear infinite" }} />}
            {mode === "login" ? "Masuk" : "Daftar Sekarang"}
          </button>
        </div>

        {/* Switch mode login/register */}
        <p style={{ textAlign: "center", fontSize: "0.82rem", color: "#78716c", marginTop: "20px" }}>
          {mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
          <button
            onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
            style={{
              color: "#ea580c",
              fontWeight: 700,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "0.82rem",
            }}
          >
            {mode === "login" ? "Daftar sekarang" : "Masuk di sini"}
          </button>
        </p>

        {/* CSS animasi loading */}
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
