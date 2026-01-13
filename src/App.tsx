import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    else location.reload();
  };

  const logout = async () => {
    await supabase.auth.signOut();
    location.reload();
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Healthcare Platform</h1>

      {!user ? (
        <>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br/><br/>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br/><br/>
          <button onClick={login}>Login</button>
        </>
      ) : (
        <>
          <p>Welcome {user.email}</p>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}
