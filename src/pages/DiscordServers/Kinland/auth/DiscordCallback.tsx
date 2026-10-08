// src/pages/DiscordServers/Kinland/auth/DiscordCallback.tsx

import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { kinlandApi } from "../api";
import { useKinlandAuth } from "../KinlandAuthContext";

export const DiscordCallback = () => {
  const [params, setParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const { setUser } = useKinlandAuth();

  const navigate = useNavigate();
  const isExchanging = useRef(false);

  useEffect(() => {
    if (isExchanging.current) return;

    const code = params.get("code");
    const state = params.get("state");

    if (!code || !state) {
      console.error("[OAuth Error]: Missing code or state in URL parameters");
      setError("Некорректный ответ от Discord. Попробуйте войти снова.");
      return;
    }

    isExchanging.current = true;

    kinlandApi
      .exchangeCode(code, state)
      .then((res) => {
        setUser(res.user);

        navigate(`/kinland/profile/${res.user.id}`, { replace: true });
      })
      .catch((err) => {
        console.error("[Exchange Code Error]:", err);
        setParams({}, { replace: true });
        setError("Не удалось завершить вход через Discord.");
      });
  }, [navigate, params, setParams, setUser]);

  if (error) {
    return (
      <>
        <div style={{ padding: "40px", textAlign: "center" }}>
          <p style={{ color: "var(--kin-danger, #ff4d4f)", marginBottom: "16px" }}>{error}</p>
          <button
            onClick={() => navigate("/kinland", { replace: true })}
            style={{ cursor: "pointer", padding: "8px 16px" }}
          >
            Вернуться в Kinland
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div style={{ padding: "60px 0", textAlign: "center" }}>
        <p>Вход через Discord…</p>
      </div>
    </>
  );
};
