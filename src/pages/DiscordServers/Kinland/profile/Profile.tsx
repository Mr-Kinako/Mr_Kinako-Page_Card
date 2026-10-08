// src/pages/DiscordServers/Kinland/porfile/Porfile.tsx

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useKinlandAuth } from "../KinlandAuthContext";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export const Profile = () => {
  const { id } = useParams<{ id?: string }>();
  const { user, isAuthenticated, isLoadingUser } = useKinlandAuth();
  const navigate = useNavigate();

  useDocumentTitle("Kinland |> Профиль");

  useEffect(() => {
    if (!id && user?.id) {
      navigate(`/kinland/profile/${user.id}`, { replace: true });
    }
  }, [id, user, navigate]);

  if (isLoadingUser) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Загрузка профиля…</div>;
  }

  if (!isAuthenticated || !user) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>Вы не авторизованы или сессия истекла.</p>
        <button onClick={() => navigate("/kinland")}>На главную Kinland</button>
      </div>
    );
  }

  return (
    <>
      <div style={{ padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img
            src={user.avatarUrl}
            alt={user.username}
            width={64}
            height={64}
            style={{ borderRadius: "50%" }}
          />
          <div>
            <h1 style={{ margin: 0, fontSize: "24px" }}>{user.globalName ?? user.username}</h1>
            <p style={{ margin: "4px 0 0", opacity: 0.7 }}>@{user.username}</p>
          </div>
        </div>
      </div>
    </>
  );
};
