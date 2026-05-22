import { useState, useContext, createContext, useEffect, useRef } from "react";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar
} from "recharts";
import {
  Dumbbell, Flame, Droplets, Moon, Target, TrendingUp, Award,
  Plus, ChevronRight, Activity, Scale, Heart, Zap, User,
  BarChart2, Settings, LogOut, Menu, X, Check, Star,
  Coffee, Utensils, Apple, Clock, ArrowUp, ArrowDown,
  MessageSquare, Bell, Calendar, Camera, Trophy, Layers,
  ChevronDown, Play, Pause, RotateCcw, Edit3, Trash2,
  ShieldCheck, Users, PieChart, FileText, Home, Bot
} from "lucide-react";

/* ─── Theme & App Context ─── */
const AppCtx = createContext(null);
const useApp = () => useContext(AppCtx);

const PALETTE = {
  emerald: "#10b981", emeraldDark: "#059669", emeraldLight: "#d1fae5",
  violet: "#7c3aed", violetLight: "#ede9fe",
  amber: "#f59e0b", amberLight: "#fef3c7",
  rose: "#f43f5e", roseLight: "#ffe4e6",
  sky: "#0ea5e9", skyLight: "#e0f2fe",
  slate: "#64748b",
};

/* ─── Sample Data ─── */
const SAMPLE_USER = {
  name: "Alex Rivera", email: "alex@fitforge.io",
  avatar: null, age: 28, gender: "male",
  height: 178, weight: 74, goalWeight: 70,
  goal: "Weight Loss", level: 12, xp: 2480, streak: 23,
  fitnessScore: 82, bmi: 23.4,
};

const weeklyWorkouts = [
  { day: "Mon", duration: 45, calories: 380 },
  { day: "Tue", duration: 0, calories: 0 },
  { day: "Wed", duration: 60, calories: 510 },
  { day: "Thu", duration: 30, calories: 260 },
  { day: "Fri", duration: 75, calories: 640 },
  { day: "Sat", duration: 50, calories: 420 },
  { day: "Sun", duration: 20, calories: 180 },
];

const weightHistory = [
  { month: "Jan", weight: 78 }, { month: "Feb", weight: 77.2 },
  { month: "Mar", weight: 76.4 }, { month: "Apr", weight: 75.8 },
  { month: "May", weight: 75.1 }, { month: "Jun", weight: 74.3 },
  { month: "Jul", weight: 74 },
];

const nutritionData = [
  { name: "Mon", protein: 142, carbs: 210, fat: 68 },
  { name: "Tue", protein: 118, carbs: 195, fat: 55 },
  { name: "Wed", protein: 165, carbs: 230, fat: 72 },
  { name: "Thu", protein: 130, carbs: 180, fat: 60 },
  { name: "Fri", protein: 155, carbs: 220, fat: 65 },
  { name: "Sat", protein: 140, carbs: 205, fat: 58 },
  { name: "Sun", protein: 125, carbs: 190, fat: 52 },
];

const WORKOUTS = [
  { id: 1, date: "2025-05-16", name: "Push Day", category: "Chest", duration: 75, calories: 480, exercises: ["Bench Press 4×8", "Incline DB Press 3×10", "Cable Fly 3×12", "Tricep Pushdown 4×12"] },
  { id: 2, date: "2025-05-14", name: "Leg Day", category: "Legs", duration: 60, calories: 520, exercises: ["Squats 5×5", "Romanian DL 4×8", "Leg Press 3×12", "Calf Raises 4×15"] },
  { id: 3, date: "2025-05-12", name: "Pull Day", category: "Back", duration: 65, calories: 440, exercises: ["Deadlift 4×5", "Pull-ups 4×8", "Barbell Row 3×10", "Face Pulls 3×15"] },
  { id: 4, date: "2025-05-10", name: "HIIT Cardio", category: "Cardio", duration: 30, calories: 380, exercises: ["Treadmill Sprints 10×30s", "Jump Rope 5×2min", "Box Jumps 4×10"] },
];

const MEALS = [
  { id: 1, type: "Breakfast", name: "Oatmeal + Eggs", calories: 480, protein: 32, carbs: 58, fat: 14, time: "07:30" },
  { id: 2, type: "Lunch", name: "Chicken Rice Bowl", calories: 620, protein: 55, carbs: 72, fat: 18, time: "12:30" },
  { id: 3, type: "Snack", name: "Protein Shake", calories: 180, protein: 30, carbs: 8, fat: 4, time: "16:00" },
  { id: 4, type: "Dinner", name: "Salmon + Veggies", calories: 540, protein: 48, carbs: 35, fat: 22, time: "19:30" },
];

const GOALS = [
  { id: 1, title: "Daily Workout", target: 1, current: 1, unit: "session", icon: Dumbbell, color: PALETTE.emerald },
  { id: 2, title: "Calorie Burn", target: 500, current: 480, unit: "kcal", icon: Flame, color: PALETTE.rose },
  { id: 3, title: "Water Intake", target: 3, current: 2.4, unit: "L", icon: Droplets, color: PALETTE.sky },
  { id: 4, title: "Sleep", target: 8, current: 7.5, unit: "hrs", icon: Moon, color: PALETTE.violet },
  { id: 5, title: "Steps", target: 10000, current: 8240, unit: "steps", icon: Activity, color: PALETTE.amber },
];

const BADGES = [
  { name: "First Workout", icon: "🏋️", earned: true },
  { name: "Week Warrior", icon: "⚡", earned: true },
  { name: "Hydration Hero", icon: "💧", earned: true },
  { name: "Iron Will", icon: "🔥", earned: true },
  { name: "Century Club", icon: "💯", earned: false },
  { name: "Marathon Master", icon: "🏃", earned: false },
];

const MOTIVATIONAL_QUOTES = [
  "The only bad workout is the one that didn't happen.",
  "Push yourself because no one else is going to do it for you.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "Fitness is not about being better than someone else. It's about being better than you used to be.",
  "Success starts with self-discipline.",
];

const EXERCISE_LIBRARY = {
  Chest: ["Bench Press", "Incline Press", "Decline Press", "Cable Fly", "Chest Dip", "Push-up"],
  Back: ["Deadlift", "Pull-up", "Lat Pulldown", "Barbell Row", "Seated Row", "Face Pull"],
  Legs: ["Squat", "Romanian Deadlift", "Leg Press", "Lunges", "Leg Curl", "Calf Raise"],
  Shoulder: ["OHP", "Lateral Raise", "Front Raise", "Rear Delt Fly", "Arnold Press", "Shrugs"],
  Arms: ["Barbell Curl", "Hammer Curl", "Tricep Pushdown", "Skull Crusher", "Preacher Curl"],
  Cardio: ["Treadmill Run", "Cycling", "Jump Rope", "Rowing", "Stair Climber", "HIIT Sprints"],
  "Full Body": ["Burpees", "Thrusters", "Clean & Press", "Kettlebell Swing", "Battle Ropes"],
};

/* ─── Utility Components ─── */
const Badge = ({ children, color = "#10b981", size = "sm" }) => (
  <span style={{
    background: color + "22", color, border: `1px solid ${color}44`,
    borderRadius: 20, padding: size === "sm" ? "2px 10px" : "4px 14px",
    fontSize: size === "sm" ? 11 : 13, fontWeight: 600, letterSpacing: "0.03em"
  }}>{children}</span>
);

const Card = ({ children, style = {}, onClick, glass = false }) => (
  <div onClick={onClick} style={{
    background: glass
      ? "rgba(255,255,255,0.06)"
      : "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 20, padding: "1.25rem",
    backdropFilter: "blur(12px)",
    cursor: onClick ? "pointer" : "default",
    transition: "transform 0.2s, box-shadow 0.2s",
    ...style,
  }}
    onMouseEnter={e => onClick && (e.currentTarget.style.transform = "translateY(-2px)")}
    onMouseLeave={e => onClick && (e.currentTarget.style.transform = "translateY(0)")}
  >{children}</div>
);

const ProgressRing = ({ pct, size = 80, stroke = 7, color = "#10b981", children }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div style={{ position: "relative", width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size} height={size} style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s ease" }} />
      </svg>
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>{children}</div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, unit, color, trend, sub }) => (
  <Card style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ background: color + "22", borderRadius: 12, padding: 8, display: "flex" }}>
        <Icon size={18} color={color} />
      </div>
      {trend !== undefined && (
        <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 12, color: trend >= 0 ? PALETTE.emerald : PALETTE.rose }}>
          {trend >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div>
      <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", lineHeight: 1.1 }}>
        {value}<span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.5)", marginLeft: 3 }}>{unit}</span>
      </div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: color, marginTop: 4 }}>{sub}</div>}
    </div>
  </Card>
);

const Toast = ({ msg, type = "success", onClose }) => (
  <div style={{
    position: "fixed", bottom: 24, right: 24, zIndex: 9999,
    background: type === "success" ? PALETTE.emerald : type === "error" ? PALETTE.rose : PALETTE.violet,
    color: "#fff", borderRadius: 14, padding: "12px 20px",
    display: "flex", alignItems: "center", gap: 10,
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    animation: "slideIn 0.3s ease",
    fontSize: 14, fontWeight: 600,
  }}>
    {type === "success" ? <Check size={16} /> : <Bell size={16} />}
    {msg}
    <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", marginLeft: 4 }}>
      <X size={14} />
    </button>
  </div>
);

const Modal = ({ title, children, onClose }) => (
  <div style={{
    position: "fixed", inset: 0, zIndex: 1000,
    background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
    display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
  }} onClick={e => e.target === e.currentTarget && onClose()}>
    <div style={{
      background: "#111827", border: "1px solid rgba(255,255,255,0.15)",
      borderRadius: 24, padding: "1.5rem", width: "100%", maxWidth: 520,
      maxHeight: "90vh", overflowY: "auto",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
        <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 20, margin: 0 }}>{title}</h3>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 10, padding: 8, cursor: "pointer", color: "#fff", display: "flex" }}>
          <X size={16} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div style={{ marginBottom: 14 }}>
    {label && <label style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 6, fontWeight: 600 }}>{label}</label>}
    <input {...props} style={{
      width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
      borderRadius: 12, padding: "10px 14px", color: "#fff", fontSize: 14,
      outline: "none", boxSizing: "border-box",
      ...props.style,
    }} />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div style={{ marginBottom: 14 }}>
    {label && <label style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 6, fontWeight: 600 }}>{label}</label>}
    <select {...props} style={{
      width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
      borderRadius: 12, padding: "10px 14px", color: "#fff", fontSize: 14, outline: "none",
      ...props.style,
    }}>
      {options.map(o => <option key={o} value={o} style={{ background: "#1f2937" }}>{o}</option>)}
    </select>
  </div>
);

const Btn = ({ children, variant = "primary", size = "md", onClick, icon: Icon, style: s = {}, disabled }) => {
  const styles = {
    primary: { background: `linear-gradient(135deg, ${PALETTE.emerald}, ${PALETTE.emeraldDark})`, color: "#fff" },
    secondary: { background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" },
    danger: { background: `linear-gradient(135deg, ${PALETTE.rose}, #be123c)`, color: "#fff" },
    ghost: { background: "transparent", color: "rgba(255,255,255,0.7)", border: "none" },
  };
  const sizes = { sm: "8px 14px", md: "11px 20px", lg: "14px 28px" };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      ...styles[variant], padding: sizes[size], borderRadius: 12, border: "none",
      fontSize: size === "lg" ? 15 : 13, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer",
      display: "inline-flex", alignItems: "center", gap: 6, transition: "opacity 0.2s, transform 0.15s",
      opacity: disabled ? 0.5 : 1, ...s,
    }}
      onMouseEnter={e => !disabled && (e.currentTarget.style.opacity = "0.88")}
      onMouseLeave={e => !disabled && (e.currentTarget.style.opacity = "1")}
      onMouseDown={e => !disabled && (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={e => !disabled && (e.currentTarget.style.transform = "scale(1)")}
    >
      {Icon && <Icon size={size === "sm" ? 12 : 14} />}{children}
    </button>
  );
};

/* ─── AUTH PAGES ─── */
const AuthPage = ({ mode, setMode, onLogin }) => {
  const [form, setForm] = useState({ name: "", email: "demo@fitforge.io", password: "demo", confirmPassword: "", goal: "Weight Loss", gender: "male", age: "", height: "", weight: "" });
  const [loading, setLoading] = useState(false);
  const up = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 900);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#050d18",
      display: "flex", fontFamily: "'Syne', 'Plus Jakarta Sans', system-ui",
    }}>
      {/* Left panel */}
      <div style={{
        flex: 1, background: `linear-gradient(160deg, #0a1628 0%, #0d1f3c 60%, #091528 100%)`,
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        padding: "2rem", position: "relative", overflow: "hidden",
      }}>
        {/* Ambient blobs */}
        {[
          { top: "10%", left: "20%", w: 280, c: PALETTE.emerald },
          { top: "60%", right: "10%", w: 200, c: PALETTE.violet },
        ].map((b, i) => (
          <div key={i} style={{
            position: "absolute", width: b.w, height: b.w, borderRadius: "50%",
            background: b.c, opacity: 0.06, filter: "blur(60px)",
            top: b.top, left: b.left, right: b.right,
          }} />
        ))}
        <div style={{ position: "relative", textAlign: "center", maxWidth: 400 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: "2rem" }}>
            <div style={{ background: `linear-gradient(135deg, ${PALETTE.emerald}, ${PALETTE.violet})`, borderRadius: 16, padding: 12, display: "flex" }}>
              <Dumbbell size={28} color="#fff" />
            </div>
            <span style={{ fontSize: 32, fontWeight: 900, color: "#fff", letterSpacing: "-1px" }}>FitForge</span>
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: "1rem", letterSpacing: "-1.5px" }}>
            Forge Your<br />
            <span style={{ background: `linear-gradient(135deg, ${PALETTE.emerald}, ${PALETTE.sky})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Best Self
            </span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, lineHeight: 1.7, marginBottom: "2rem" }}>
            Track workouts, nutrition, sleep, and body progress — all in one premium fitness platform.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, textAlign: "left" }}>
            {[
              { icon: Activity, text: "Smart Analytics" }, { icon: Target, text: "Goal System" },
              { icon: Flame, text: "Streak Tracker" }, { icon: Bot, text: "AI Assistant" },
            ].map(({ icon: Ic, text }) => (
              <div key={text} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                <Ic size={16} color={PALETTE.emerald} />
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{
        width: "clamp(360px,42%,480px)", background: "#0a0f1a",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "2.5rem", overflowY: "auto",
      }}>
        <h2 style={{ color: "#fff", fontWeight: 900, fontSize: 28, marginBottom: 6, letterSpacing: "-0.5px" }}>
          {mode === "login" ? "Welcome back" : "Start your journey"}
        </h2>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, marginBottom: "2rem" }}>
          {mode === "login" ? "Use demo@fitforge.io / demo to try instantly" : "Create your account in seconds"}
        </p>

        {mode === "register" && <Input label="Full Name" placeholder="Alex Rivera" value={form.name} onChange={up("name")} />}
        <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={up("email")} />
        <Input label="Password" type="password" placeholder="••••••••" value={form.password} onChange={up("password")} />
        {mode === "register" && <>
          <Input label="Confirm Password" type="password" placeholder="••••••••" value={form.confirmPassword} onChange={up("confirmPassword")} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <Input label="Age" type="number" placeholder="28" value={form.age} onChange={up("age")} />
            <Input label="Height (cm)" type="number" placeholder="178" value={form.height} onChange={up("height")} />
            <Input label="Weight (kg)" type="number" placeholder="74" value={form.weight} onChange={up("weight")} />
          </div>
          <Select label="Fitness Goal" value={form.goal} onChange={up("goal")}
            options={["Weight Loss", "Muscle Gain", "Maintenance", "Fat Loss"]} />
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 8, fontWeight: 600 }}>Gender</label>
            <div style={{ display: "flex", gap: 10 }}>
              {["male", "female", "other"].map(g => (
                <button key={g} onClick={() => setForm(f => ({ ...f, gender: g }))} style={{
                  flex: 1, padding: "9px 0", borderRadius: 10,
                  background: form.gender === g ? PALETTE.emerald : "rgba(255,255,255,0.08)",
                  border: `1px solid ${form.gender === g ? PALETTE.emerald : "rgba(255,255,255,0.15)"}`,
                  color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", textTransform: "capitalize",
                }}>{g}</button>
              ))}
            </div>
          </div>
        </>}

        <Btn size="lg" onClick={submit} disabled={loading} style={{ width: "100%", justifyContent: "center", marginBottom: 16 }}>
          {loading ? "Loading..." : mode === "login" ? "Sign In" : "Create Account"}
        </Btn>

        <div style={{ textAlign: "center", color: "rgba(255,255,255,0.45)", fontSize: 13 }}>
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setMode(mode === "login" ? "register" : "login")} style={{
            background: "none", border: "none", color: PALETTE.emerald, cursor: "pointer", fontWeight: 700, fontSize: 13,
          }}>
            {mode === "login" ? "Sign up free" : "Sign in"}
          </button>
        </div>

        <div style={{ margin: "1.5rem 0", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>or continue with</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {["Google", "GitHub"].map(p => (
            <button key={p} style={{
              flex: 1, padding: "10px 0", background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12,
              color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 700, cursor: "pointer",
            }}>{p}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── SIDEBAR ─── */
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "workouts", label: "Workouts", icon: Dumbbell },
  { id: "nutrition", label: "Nutrition", icon: Utensils },
  { id: "progress", label: "Progress", icon: TrendingUp },
  { id: "goals", label: "Goals", icon: Target },
  { id: "analytics", label: "Analytics", icon: BarChart2 },
  { id: "ai", label: "AI Assistant", icon: Bot },
  { id: "profile", label: "Profile", icon: User },
  { id: "admin", label: "Admin", icon: ShieldCheck },
];

const Sidebar = ({ page, setPage, collapsed, setCollapsed, user, onLogout }) => (
  <div style={{
    width: collapsed ? 64 : 220, background: "#080d17",
    borderRight: "1px solid rgba(255,255,255,0.07)",
    display: "flex", flexDirection: "column",
    transition: "width 0.3s ease", overflow: "hidden", flexShrink: 0,
  }}>
    {/* Logo */}
    <div style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ background: `linear-gradient(135deg, ${PALETTE.emerald}, ${PALETTE.violet})`, borderRadius: 10, padding: 7, display: "flex", flexShrink: 0 }}>
        <Dumbbell size={18} color="#fff" />
      </div>
      {!collapsed && <span style={{ fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px", whiteSpace: "nowrap" }}>FitForge</span>}
    </div>

    {/* Nav */}
    <nav style={{ flex: 1, padding: "0.75rem 0.5rem", overflowY: "auto" }}>
      {NAV_ITEMS.map(({ id, label, icon: Ic }) => {
        const active = page === id;
        return (
          <button key={id} onClick={() => setPage(id)} title={collapsed ? label : ""} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px", borderRadius: 12, marginBottom: 2,
            background: active ? `${PALETTE.emerald}22` : "transparent",
            border: `1px solid ${active ? PALETTE.emerald + "44" : "transparent"}`,
            color: active ? PALETTE.emerald : "rgba(255,255,255,0.5)",
            cursor: "pointer", transition: "all 0.15s", justifyContent: collapsed ? "center" : "flex-start",
          }}
            onMouseEnter={e => !active && (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
            onMouseLeave={e => !active && (e.currentTarget.style.background = "transparent")}
          >
            <Ic size={17} style={{ flexShrink: 0 }} />
            {!collapsed && <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, whiteSpace: "nowrap" }}>{label}</span>}
          </button>
        );
      })}
    </nav>

    {/* User + collapse */}
    <div style={{ padding: "0.75rem 0.5rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      {!collapsed && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", marginBottom: 6 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${PALETTE.emerald}, ${PALETTE.violet})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>{user.name[0]}</span>
          </div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
            <div style={{ fontSize: 10, color: PALETTE.emerald, fontWeight: 600 }}>Lvl {user.level}</div>
          </div>
        </div>
      )}
      <button onClick={onLogout} style={{
        width: "100%", display: "flex", alignItems: "center", gap: 10, justifyContent: collapsed ? "center" : "flex-start",
        padding: "9px 12px", borderRadius: 10, background: "transparent", border: "none",
        color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 13,
      }}
        onMouseEnter={e => (e.currentTarget.style.color = PALETTE.rose)}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
      >
        <LogOut size={16} />
        {!collapsed && "Logout"}
      </button>
      <button onClick={() => setCollapsed(c => !c)} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
        padding: "8px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "none",
        color: "rgba(255,255,255,0.4)", cursor: "pointer", marginTop: 4,
      }}>
        {collapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} style={{ transform: "rotate(90deg)" }} />}
      </button>
    </div>
  </div>
);

/* ─── TOPBAR ─── */
const Topbar = ({ page, user, onAddWorkout, onAddMeal }) => {
  const title = NAV_ITEMS.find(n => n.id === page)?.label || "Dashboard";
  return (
    <div style={{
      height: 60, background: "rgba(8,13,23,0.95)", borderBottom: "1px solid rgba(255,255,255,0.07)",
      display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.5rem",
      backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 100,
    }}>
      <div>
        <h1 style={{ color: "#fff", fontWeight: 900, fontSize: 20, margin: 0, letterSpacing: "-0.5px" }}>{title}</h1>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, margin: 0 }}>
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: `${PALETTE.amber}22`, border: `1px solid ${PALETTE.amber}44`, borderRadius: 20, padding: "5px 12px" }}>
          <Flame size={13} color={PALETTE.amber} />
          <span style={{ fontSize: 12, fontWeight: 800, color: PALETTE.amber }}>{user.streak} day streak</span>
        </div>
        <Btn icon={Plus} size="sm" onClick={onAddWorkout}>Log Workout</Btn>
      </div>
    </div>
  );
};

/* ─── DASHBOARD PAGE ─── */
const DashboardPage = ({ user, setToast }) => {
  const quote = MOTIVATIONAL_QUOTES[Math.floor(Date.now() / 86400000) % MOTIVATIONAL_QUOTES.length];
  const totalCals = MEALS.reduce((s, m) => s + m.calories, 0);
  const calorieGoal = 2200;
  const waterPct = (2.4 / 3) * 100;

  return (
    <div style={{ padding: "1.5rem", maxWidth: 1400 }}>
      {/* Welcome */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(124,58,237,0.12) 100%)",
          border: "1px solid rgba(16,185,129,0.2)", borderRadius: 20, padding: "1.25rem 1.5rem",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: "0 0 4px" }}>Good morning,</p>
            <h2 style={{ color: "#fff", fontWeight: 900, fontSize: 26, margin: "0 0 6px", letterSpacing: "-0.5px" }}>{user.name} 👋</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: 0, fontStyle: "italic" }}>"{quote}"</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ textAlign: "center" }}>
              <ProgressRing pct={user.fitnessScore} size={72} color={PALETTE.emerald}>
                <span style={{ fontSize: 15, fontWeight: 900, color: "#fff" }}>{user.fitnessScore}</span>
              </ProgressRing>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", margin: "4px 0 0", fontWeight: 600 }}>FITNESS SCORE</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ProgressRing pct={(user.xp % 1000) / 10} size={72} color={PALETTE.violet}>
                <span style={{ fontSize: 13, fontWeight: 900, color: "#fff" }}>Lv{user.level}</span>
              </ProgressRing>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", margin: "4px 0 0", fontWeight: 600 }}>LEVEL</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 12, marginBottom: "1.5rem" }}>
        <StatCard icon={Flame} label="Calories Today" value={totalCals} unit="kcal" color={PALETTE.rose} trend={5} sub={`${calorieGoal - totalCals} remaining`} />
        <StatCard icon={Droplets} label="Water Intake" value="2.4" unit="L" color={PALETTE.sky} trend={-3} sub="0.6L to goal" />
        <StatCard icon={Dumbbell} label="Workout Today" value="75" unit="min" color={PALETTE.emerald} trend={12} sub="480 kcal burned" />
        <StatCard icon={Moon} label="Last Sleep" value="7.5" unit="hrs" color={PALETTE.violet} trend={2} sub="Good quality" />
        <StatCard icon={Scale} label="Current Weight" value={user.weight} unit="kg" color={PALETTE.amber} sub={`Goal: ${user.goalWeight}kg`} />
        <StatCard icon={Heart} label="BMI" value={user.bmi} unit="" color={PALETTE.rose} sub="Normal range" />
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: "1.5rem" }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 15, margin: 0 }}>Weekly Workout Activity</h3>
            <Badge color={PALETTE.emerald}>This Week</Badge>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyWorkouts} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1f2937", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#fff", fontSize: 12 }} />
              <Bar dataKey="duration" fill={PALETTE.emerald} radius={[6, 6, 0, 0]} name="Duration (min)" />
              <Bar dataKey="calories" fill={PALETTE.violet} radius={[6, 6, 0, 0]} name="Calories" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 15, margin: "0 0 1rem" }}>Today's Goals</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {GOALS.slice(0, 4).map(g => {
              const pct = Math.min(100, Math.round((g.current / g.target) * 100));
              return (
                <div key={g.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <g.icon size={13} color={g.color} />
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{g.title}</span>
                    </div>
                    <span style={{ fontSize: 11, color: g.color, fontWeight: 700 }}>{pct}%</span>
                  </div>
                  <div style={{ height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${g.color}, ${g.color}aa)`, borderRadius: 10, transition: "width 1s ease" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Weight chart + recent activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 15, margin: 0 }}>Weight Progress</h3>
            <Badge color={PALETTE.violet}>7 months</Badge>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={weightHistory}>
              <defs>
                <linearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={PALETTE.violet} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={PALETTE.violet} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={["dataMin - 1", "dataMax + 1"]} tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1f2937", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#fff", fontSize: 12 }} />
              <Area type="monotone" dataKey="weight" stroke={PALETTE.violet} fill="url(#wGrad)" strokeWidth={2.5} dot={{ fill: PALETTE.violet, r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 15, margin: "0 0 1rem" }}>Recent Workouts</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {WORKOUTS.slice(0, 3).map(w => (
              <div key={w.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: "rgba(255,255,255,0.04)", borderRadius: 12 }}>
                <div style={{ background: PALETTE.emerald + "22", borderRadius: 8, padding: 7, display: "flex" }}>
                  <Dumbbell size={14} color={PALETTE.emerald} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{w.name}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{w.date} · {w.duration}min · {w.calories}kcal</div>
                </div>
                <Badge color={PALETTE.emerald} size="sm">{w.category}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

/* ─── WORKOUTS PAGE ─── */
const WorkoutsPage = ({ setToast }) => {
  const [showModal, setShowModal] = useState(false);
  const [workouts, setWorkouts] = useState(WORKOUTS);
  const [form, setForm] = useState({ name: "", category: "Chest", duration: "", calories: "", notes: "", exercises: [] });
  const [selectedEx, setSelectedEx] = useState("");
  const [activeTab, setActiveTab] = useState("history");
  const up = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const addEx = () => {
    if (!selectedEx) return;
    setForm(f => ({ ...f, exercises: [...f.exercises, selectedEx + " 3×10"] }));
    setSelectedEx("");
  };

  const save = () => {
    if (!form.name) return;
    setWorkouts(w => [{ id: Date.now(), date: new Date().toISOString().slice(0, 10), ...form }, ...w]);
    setShowModal(false);
    setForm({ name: "", category: "Chest", duration: "", calories: "", notes: "", exercises: [] });
    setToast({ msg: "Workout logged!", type: "success" });
  };

  const CATS = Object.keys(EXERCISE_LIBRARY);
  const catColors = { Chest: PALETTE.rose, Back: PALETTE.violet, Legs: PALETTE.emerald, Shoulder: PALETTE.sky, Arms: PALETTE.amber, Cardio: "#f97316", "Full Body": "#a855f7" };

  return (
    <div style={{ padding: "1.5rem", maxWidth: 1200 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["history", "templates", "records"].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              padding: "8px 16px", borderRadius: 10, border: "none",
              background: activeTab === t ? PALETTE.emerald : "rgba(255,255,255,0.07)",
              color: activeTab === t ? "#fff" : "rgba(255,255,255,0.5)",
              fontSize: 13, fontWeight: 700, cursor: "pointer", textTransform: "capitalize",
            }}>{t}</button>
          ))}
        </div>
        <Btn icon={Plus} onClick={() => setShowModal(true)}>Log Workout</Btn>
      </div>

      {/* Category pills */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.25rem" }}>
        {CATS.map(c => (
          <div key={c} style={{ display: "flex", alignItems: "center", gap: 6, background: catColors[c] + "15", border: `1px solid ${catColors[c]}33`, borderRadius: 20, padding: "5px 12px" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: catColors[c] }} />
            <span style={{ fontSize: 12, color: catColors[c], fontWeight: 700 }}>{c}</span>
          </div>
        ))}
      </div>

      {/* Workout list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {workouts.map(w => (
          <Card key={w.id} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 14, alignItems: "center" }}>
            <div style={{ background: (catColors[w.category] || PALETTE.emerald) + "22", borderRadius: 14, padding: 12, display: "flex" }}>
              <Dumbbell size={22} color={catColors[w.category] || PALETTE.emerald} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 16, margin: 0 }}>{w.name}</h3>
                <Badge color={catColors[w.category] || PALETTE.emerald}>{w.category}</Badge>
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, margin: "0 0 6px" }}>{w.date}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {(w.exercises || []).map((ex, i) => (
                  <span key={i} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 6, padding: "2px 8px", fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{ex}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end", minWidth: 80 }}>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{w.duration}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>min</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: PALETTE.rose }}>{w.calories}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>kcal</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {showModal && (
        <Modal title="Log New Workout" onClose={() => setShowModal(false)}>
          <Input label="Workout Name" placeholder="Push Day" value={form.name} onChange={up("name")} />
          <Select label="Category" value={form.category} onChange={up("category")} options={CATS} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Input label="Duration (min)" type="number" placeholder="60" value={form.duration} onChange={up("duration")} />
            <Input label="Calories Burned" type="number" placeholder="400" value={form.calories} onChange={up("calories")} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 6, fontWeight: 600 }}>Add Exercises</label>
            <div style={{ display: "flex", gap: 8 }}>
              <select value={selectedEx} onChange={e => setSelectedEx(e.target.value)} style={{
                flex: 1, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 10, padding: "9px 12px", color: "#fff", fontSize: 13, outline: "none",
              }}>
                <option value="" style={{ background: "#1f2937" }}>Select exercise…</option>
                {(EXERCISE_LIBRARY[form.category] || []).map(e => <option key={e} value={e} style={{ background: "#1f2937" }}>{e}</option>)}
              </select>
              <Btn onClick={addEx} icon={Plus} size="sm">Add</Btn>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
              {form.exercises.map((e, i) => (
                <span key={i} style={{ background: "rgba(16,185,129,0.15)", color: PALETTE.emerald, borderRadius: 8, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{e}</span>
              ))}
            </div>
          </div>
          <Input label="Notes (optional)" placeholder="Great session…" value={form.notes} onChange={up("notes")} />
          <Btn size="lg" onClick={save} style={{ width: "100%", justifyContent: "center" }}>Save Workout</Btn>
        </Modal>
      )}
    </div>
  );
};

/* ─── NUTRITION PAGE ─── */
const NutritionPage = ({ setToast }) => {
  const [showModal, setShowModal] = useState(false);
  const [meals, setMeals] = useState(MEALS);
  const [water, setWater] = useState(2.4);
  const [form, setForm] = useState({ name: "", type: "Breakfast", calories: "", protein: "", carbs: "", fat: "" });
  const up = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const totalCals = meals.reduce((s, m) => s + m.calories, 0);
  const totalProtein = meals.reduce((s, m) => s + m.protein, 0);
  const totalCarbs = meals.reduce((s, m) => s + m.carbs, 0);
  const totalFat = meals.reduce((s, m) => s + m.fat, 0);
  const calorieGoal = 2200;

  const save = () => {
    if (!form.name) return;
    setMeals(m => [...m, { id: Date.now(), ...form, calories: +form.calories, protein: +form.protein, carbs: +form.carbs, fat: +form.fat, time: new Date().toTimeString().slice(0, 5) }]);
    setShowModal(false);
    setToast({ msg: "Meal logged!", type: "success" });
  };

  const MEAL_ICONS = { Breakfast: Coffee, Lunch: Utensils, Dinner: Apple, Snack: Star };
  const MEAL_COLORS = { Breakfast: PALETTE.amber, Lunch: PALETTE.emerald, Dinner: PALETTE.violet, Snack: PALETTE.rose };

  return (
    <div style={{ padding: "1.5rem", maxWidth: 1100 }}>
      {/* Macro summary */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: "1.5rem" }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 15, margin: 0 }}>Today's Macros</h3>
            <Btn icon={Plus} size="sm" onClick={() => setShowModal(true)}>Add Meal</Btn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: "1rem" }}>
            {[
              { label: "Calories", value: totalCals, goal: calorieGoal, unit: "kcal", color: PALETTE.rose },
              { label: "Protein", value: totalProtein, goal: 160, unit: "g", color: PALETTE.emerald },
              { label: "Carbs", value: totalCarbs, goal: 250, unit: "g", color: PALETTE.amber },
              { label: "Fats", value: totalFat, goal: 75, unit: "g", color: PALETTE.sky },
            ].map(m => (
              <div key={m.label} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: "10px 12px" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4, fontWeight: 600 }}>{m.label}</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>{m.value}</div>
                <div style={{ fontSize: 10, color: m.color }}>{m.unit} / {m.goal}{m.unit}</div>
                <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 4, marginTop: 6, overflow: "hidden" }}>
                  <div style={{ width: `${Math.min(100, (m.value / m.goal) * 100)}%`, height: "100%", background: m.color, borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={nutritionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1f2937", border: "none", borderRadius: 10, color: "#fff", fontSize: 11 }} />
              <Bar dataKey="protein" stackId="a" fill={PALETTE.emerald} radius={[0, 0, 0, 0]} />
              <Bar dataKey="carbs" stackId="a" fill={PALETTE.amber} radius={[0, 0, 0, 0]} />
              <Bar dataKey="fat" stackId="a" fill={PALETTE.sky} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Water tracker */}
        <Card style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 15, margin: 0 }}>Hydration</h3>
          <ProgressRing pct={(water / 3) * 100} size={130} stroke={12} color={PALETTE.sky}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>{water.toFixed(1)}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>of 3.0 L</div>
            </div>
          </ProgressRing>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, width: "100%" }}>
            {[0.25, 0.5].map(amt => (
              <Btn key={amt} variant="secondary" size="sm" icon={Droplets} onClick={() => { setWater(w => Math.min(3, +(w + amt).toFixed(2))); setToast({ msg: `+${amt}L added!`, type: "success" }); }}>
                +{amt}L
              </Btn>
            ))}
          </div>
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 4 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ height: 8, background: i < Math.floor(water / 0.375) ? PALETTE.sky : "rgba(255,255,255,0.08)", borderRadius: 4, transition: "background 0.3s" }} />
            ))}
          </div>
        </Card>
      </div>

      {/* Meals */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {["Breakfast", "Lunch", "Dinner", "Snack"].map(type => {
          const typeMeals = meals.filter(m => m.type === type);
          const Ic = MEAL_ICONS[type];
          const col = MEAL_COLORS[type];
          return (
            <Card key={type}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: typeMeals.length ? 12 : 0 }}>
                <div style={{ background: col + "22", borderRadius: 10, padding: 7 }}>
                  <Ic size={16} color={col} />
                </div>
                <span style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>{type}</span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginLeft: "auto" }}>
                  {typeMeals.reduce((s, m) => s + m.calories, 0)} kcal
                </span>
              </div>
              {typeMeals.map(m => (
                <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", background: "rgba(255,255,255,0.04)", borderRadius: 10, marginTop: 6 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{m.time}</div>
                  </div>
                  <div style={{ display: "flex", gap: 12, fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
                    <span style={{ color: PALETTE.rose, fontWeight: 700 }}>{m.calories} kcal</span>
                    <span>P: {m.protein}g</span>
                    <span>C: {m.carbs}g</span>
                    <span>F: {m.fat}g</span>
                  </div>
                </div>
              ))}
            </Card>
          );
        })}
      </div>

      {showModal && (
        <Modal title="Add Meal" onClose={() => setShowModal(false)}>
          <Input label="Meal Name" placeholder="Chicken Salad" value={form.name} onChange={up("name")} />
          <Select label="Meal Type" value={form.type} onChange={up("type")} options={["Breakfast", "Lunch", "Dinner", "Snack"]} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Input label="Calories" type="number" placeholder="400" value={form.calories} onChange={up("calories")} />
            <Input label="Protein (g)" type="number" placeholder="35" value={form.protein} onChange={up("protein")} />
            <Input label="Carbs (g)" type="number" placeholder="45" value={form.carbs} onChange={up("carbs")} />
            <Input label="Fats (g)" type="number" placeholder="15" value={form.fat} onChange={up("fat")} />
          </div>
          <Btn size="lg" onClick={save} style={{ width: "100%", justifyContent: "center" }}>Add Meal</Btn>
        </Modal>
      )}
    </div>
  );
};

/* ─── PROGRESS PAGE ─── */
const ProgressPage = () => {
  const measurements = [
    { label: "Chest", value: 98, unit: "cm", color: PALETTE.rose },
    { label: "Waist", value: 82, unit: "cm", color: PALETTE.amber },
    { label: "Hips", value: 96, unit: "cm", color: PALETTE.violet },
    { label: "Arms", value: 38, unit: "cm", color: PALETTE.emerald },
    { label: "Legs", value: 58, unit: "cm", color: PALETTE.sky },
    { label: "Body Fat", value: 18.5, unit: "%", color: PALETTE.rose },
  ];

  return (
    <div style={{ padding: "1.5rem", maxWidth: 1100 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: "1.5rem" }}>
        <Card>
          <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 15, margin: "0 0 1rem" }}>Weight Journey</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weightHistory}>
              <defs>
                <linearGradient id="wg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={PALETTE.emerald} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={PALETTE.emerald} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={["dataMin - 1", "dataMax + 1"]} tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1f2937", border: "none", borderRadius: 10, color: "#fff", fontSize: 12 }} />
              <Area type="monotone" dataKey="weight" stroke={PALETTE.emerald} fill="url(#wg2)" strokeWidth={2.5} dot={{ fill: PALETTE.emerald, r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 15, margin: "0 0 1rem" }}>Body Measurements</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {measurements.map(m => (
              <div key={m.label} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{m.label}</span>
                <span style={{ fontSize: 16, fontWeight: 900, color: m.color }}>{m.value}<span style={{ fontSize: 10, marginLeft: 2, opacity: 0.7 }}>{m.unit}</span></span>
              </div>
            ))}
          </div>
          <Btn variant="secondary" icon={Plus} size="sm" style={{ marginTop: 12 }}>Update Measurements</Btn>
        </Card>
      </div>

      {/* Progress photos placeholder */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 15, margin: 0 }}>Progress Photos</h3>
          <Btn icon={Camera} size="sm" variant="secondary">Upload Photo</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => (
            <div key={m} style={{
              aspectRatio: "3/4", background: `linear-gradient(135deg, rgba(16,185,129,${0.05 + i * 0.02}), rgba(124,58,237,${0.05 + i * 0.02}))`,
              border: "1px dashed rgba(255,255,255,0.15)", borderRadius: 14,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              <Camera size={20} color="rgba(255,255,255,0.3)" />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>{m} 2025</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

/* ─── GOALS PAGE ─── */
const GoalsPage = ({ setToast }) => (
  <div style={{ padding: "1.5rem", maxWidth: 900 }}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: "1.5rem" }}>
      {GOALS.map(g => {
        const pct = Math.min(100, Math.round((g.current / g.target) * 100));
        return (
          <Card key={g.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ background: g.color + "22", borderRadius: 12, padding: 10, display: "flex" }}>
                <g.icon size={20} color={g.color} />
              </div>
              <Badge color={pct >= 100 ? PALETTE.emerald : g.color}>{pct >= 100 ? "Complete!" : `${pct}%`}</Badge>
            </div>
            <h4 style={{ color: "#fff", fontWeight: 800, fontSize: 16, margin: "0 0 4px" }}>{g.title}</h4>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, margin: "0 0 12px" }}>
              {g.current} / {g.target} {g.unit}
            </p>
            <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${g.color}, ${g.color}bb)`, borderRadius: 10, transition: "width 1.2s ease" }} />
            </div>
          </Card>
        );
      })}
    </div>

    {/* Badges */}
    <Card>
      <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 15, margin: "0 0 1rem" }}>Achievement Badges</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 10 }}>
        {BADGES.map(b => (
          <div key={b.name} style={{
            background: b.earned ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${b.earned ? PALETTE.emerald + "33" : "rgba(255,255,255,0.08)"}`,
            borderRadius: 14, padding: "14px 10px", textAlign: "center",
            opacity: b.earned ? 1 : 0.5,
          }}>
            <div style={{ fontSize: 30, marginBottom: 6 }}>{b.icon}</div>
            <div style={{ fontSize: 11, color: b.earned ? "#fff" : "rgba(255,255,255,0.4)", fontWeight: 700, lineHeight: 1.3 }}>{b.name}</div>
            {b.earned && <div style={{ fontSize: 9, color: PALETTE.emerald, fontWeight: 700, marginTop: 4 }}>EARNED</div>}
          </div>
        ))}
      </div>
    </Card>
  </div>
);

/* ─── ANALYTICS PAGE ─── */
const AnalyticsPage = () => {
  const heatmapData = Array.from({ length: 12 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => ({
      week: w, day: d,
      value: Math.random() > 0.35 ? Math.floor(Math.random() * 4) + 1 : 0,
    }))
  ).flat();

  const HEAT_COLORS = ["rgba(255,255,255,0.06)", "#064e3b", "#059669", "#10b981", "#34d399"];

  return (
    <div style={{ padding: "1.5rem", maxWidth: 1200 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: "1.5rem" }}>
        <Card>
          <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 15, margin: "0 0 1rem" }}>Calorie Trends (Weekly)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={nutritionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1f2937", border: "none", borderRadius: 10, color: "#fff", fontSize: 12 }} />
              <Line type="monotone" dataKey="protein" stroke={PALETTE.emerald} strokeWidth={2.5} dot={{ r: 3, fill: PALETTE.emerald }} name="Protein" />
              <Line type="monotone" dataKey="carbs" stroke={PALETTE.amber} strokeWidth={2.5} dot={{ r: 3, fill: PALETTE.amber }} name="Carbs" strokeDasharray="5 3" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 15, margin: "0 0 1rem" }}>Workout Distribution</h3>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <ResponsiveContainer width="50%" height={200}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" data={[
                { name: "Chest", value: 25, fill: PALETTE.rose },
                { name: "Back", value: 20, fill: PALETTE.violet },
                { name: "Legs", value: 30, fill: PALETTE.emerald },
                { name: "Cardio", value: 15, fill: PALETTE.sky },
                { name: "Arms", value: 10, fill: PALETTE.amber },
              ]}>
                <RadialBar dataKey="value" />
              </RadialBarChart>
            </ResponsiveContainer>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              {[["Chest", PALETTE.rose, 25], ["Back", PALETTE.violet, 20], ["Legs", PALETTE.emerald, 30], ["Cardio", PALETTE.sky, 15], ["Arms", PALETTE.amber, 10]].map(([label, col, pct]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: col, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", flex: 1 }}>{label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Heatmap */}
      <Card style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 15, margin: "0 0 1rem" }}>Workout Consistency (3 months)</h3>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {heatmapData.map((d, i) => (
            <div key={i} title={`Week ${d.week + 1}, ${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.day]}: ${d.value ? d.value + " workout(s)" : "rest"}`} style={{
              width: 14, height: 14, borderRadius: 3,
              background: HEAT_COLORS[d.value] || HEAT_COLORS[0],
              transition: "transform 0.1s", cursor: "default",
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.3)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            />
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12 }}>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>Less</span>
          {HEAT_COLORS.map((c, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: 2, background: c }} />)}
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>More</span>
        </div>
      </Card>

      {/* Monthly summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[
          { label: "Total Workouts", value: "24", unit: "sessions", color: PALETTE.emerald, icon: Dumbbell },
          { label: "Calories Burned", value: "9,240", unit: "kcal", color: PALETTE.rose, icon: Flame },
          { label: "Active Minutes", value: "1,440", unit: "min", color: PALETTE.violet, icon: Clock },
          { label: "Goal Completion", value: "78", unit: "%", color: PALETTE.amber, icon: Target },
        ].map(s => (
          <Card key={s.label} style={{ textAlign: "center" }}>
            <div style={{ background: s.color + "22", borderRadius: 12, padding: 10, display: "inline-flex", marginBottom: 10 }}>
              <s.icon size={20} color={s.color} />
            </div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#fff" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: s.color }}>{s.unit}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.label}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

/* ─── AI ASSISTANT PAGE ─── */
const AIPage = ({ user }) => {
  const [messages, setMessages] = useState([
    { role: "assistant", text: `Hey ${user.name.split(" ")[0]}! 👋 I'm your FitForge AI Coach. I can help with workout plans, nutrition advice, form tips, and progress insights. What's on your mind?` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const CANNED_RESPONSES = {
    workout: "Based on your goal of **Weight Loss** and current fitness level (Lv 12), I recommend:\n\n• **4 days/week** of training\n• **2 days** strength + **2 days** HIIT\n• Keep sessions 45–60 min\n• Progressive overload every 2 weeks\n\nYour current streak of 23 days is fantastic — keep it up! 🔥",
    nutrition: "For your weight loss goal at 74kg, target:\n\n• **Calories:** 1,900–2,000 kcal/day\n• **Protein:** 148–160g (2g/kg)\n• **Carbs:** 200–220g\n• **Fat:** 55–65g\n\nYou're currently hitting 1,820 kcal — slightly under. Consider adding a protein-rich snack post-workout! 💪",
    sleep: "Your 7.5hr average is solid! For optimal recovery and fat loss:\n\n• Aim for **7–9 hours** consistently\n• Sleep before **11pm** for best HGH release\n• Avoid screens 1hr before bed\n• Keep room temp at **65–68°F (18–20°C)**\n\nQuality sleep can boost fat loss by up to **20%**! 😴",
    progress: `You've lost **4kg** in 7 months — steady and sustainable! 🎉\n\nAt this rate:\n• **Goal weight (70kg)** in ~6–8 weeks\n• Body fat trending down nicely\n• Fitness score: 82 — in the top 30% of your age group!\n\nKeep consistent with your calorie deficit and strength training. You've got this!`,
  };

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(m => [...m, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));

    const lower = userMsg.toLowerCase();
    let reply = "Great question! Let me analyze your data... Based on your profile and recent activity, I'd recommend maintaining your current routine while slightly increasing intensity each week. Remember: consistency beats perfection! 💪";

    if (lower.includes("workout") || lower.includes("train") || lower.includes("exercise")) reply = CANNED_RESPONSES.workout;
    else if (lower.includes("eat") || lower.includes("food") || lower.includes("nutrition") || lower.includes("diet") || lower.includes("calor")) reply = CANNED_RESPONSES.nutrition;
    else if (lower.includes("sleep") || lower.includes("rest") || lower.includes("recover")) reply = CANNED_RESPONSES.sleep;
    else if (lower.includes("progress") || lower.includes("weight") || lower.includes("goal") || lower.includes("result")) reply = CANNED_RESPONSES.progress;

    setMessages(m => [...m, { role: "assistant", text: reply }]);
    setLoading(false);
  };

  const QUICK = ["Workout plan for weight loss", "Nutrition tips", "Sleep optimization", "My progress analysis"];

  return (
    <div style={{ padding: "1.5rem", maxWidth: 800, display: "flex", flexDirection: "column", height: "calc(100vh - 120px)" }}>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, marginBottom: "1rem" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", gap: 10, justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            {m.role === "assistant" && (
              <div style={{ background: `linear-gradient(135deg, ${PALETTE.emerald}, ${PALETTE.violet})`, borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, alignSelf: "flex-end" }}>
                <Bot size={16} color="#fff" />
              </div>
            )}
            <div style={{
              maxWidth: "75%", padding: "10px 14px", borderRadius: 16,
              background: m.role === "user" ? `linear-gradient(135deg, ${PALETTE.emerald}, ${PALETTE.emeraldDark})` : "rgba(255,255,255,0.07)",
              color: "#fff", fontSize: 13, lineHeight: 1.6,
              borderBottomRightRadius: m.role === "user" ? 4 : 16,
              borderBottomLeftRadius: m.role === "assistant" ? 4 : 16,
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ background: `linear-gradient(135deg, ${PALETTE.emerald}, ${PALETTE.violet})`, borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Bot size={16} color="#fff" />
            </div>
            <div style={{ padding: "12px 16px", background: "rgba(255,255,255,0.07)", borderRadius: 16, borderBottomLeftRadius: 4, display: "flex", gap: 5, alignItems: "center" }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: PALETTE.emerald, animation: `pulse ${0.9}s ${i * 0.2}s infinite` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
        {QUICK.map(q => (
          <button key={q} onClick={() => { setInput(q); }} style={{
            background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 20, padding: "5px 12px", color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>{q}</button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask your AI coach anything…"
          style={{
            flex: 1, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 14, padding: "12px 16px", color: "#fff", fontSize: 14, outline: "none",
          }} />
        <Btn onClick={send} disabled={loading || !input.trim()} style={{ padding: "12px 20px" }}>Send</Btn>
      </div>
    </div>
  );
};

/* ─── PROFILE PAGE ─── */
const ProfilePage = ({ user, setToast }) => {
  const [form, setForm] = useState({ ...user });
  const up = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div style={{ padding: "1.5rem", maxWidth: 800 }}>
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Card style={{ textAlign: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${PALETTE.emerald}, ${PALETTE.violet})`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 32, fontWeight: 900, color: "#fff" }}>
              {user.name[0]}
            </div>
            <h3 style={{ color: "#fff", fontWeight: 900, fontSize: 18, margin: "0 0 4px" }}>{user.name}</h3>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, margin: "0 0 12px" }}>{user.email}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 12 }}>
              <Badge color={PALETTE.emerald}>Level {user.level}</Badge>
              <Badge color={PALETTE.amber}>{user.streak}d Streak</Badge>
            </div>
            <Btn variant="secondary" icon={Camera} size="sm" style={{ width: "100%", justifyContent: "center" }}>Change Photo</Btn>
          </Card>

          <Card>
            <h4 style={{ color: "#fff", fontWeight: 800, fontSize: 13, margin: "0 0 12px" }}>Quick Stats</h4>
            {[
              { label: "Fitness Score", value: user.fitnessScore, color: PALETTE.emerald },
              { label: "Total Workouts", value: "48", color: PALETTE.violet },
              { label: "Weight Lost", value: "-4kg", color: PALETTE.rose },
              { label: "BMI", value: user.bmi, color: PALETTE.sky },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{s.label}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: s.color }}>{s.value}</span>
              </div>
            ))}
          </Card>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Card>
            <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 15, margin: "0 0 1rem" }}>Personal Information</h3>
            <Input label="Full Name" value={form.name} onChange={up("name")} />
            <Input label="Email" value={form.email} onChange={up("email")} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              <Input label="Age" type="number" value={form.age} onChange={up("age")} />
              <Input label="Height (cm)" type="number" value={form.height} onChange={up("height")} />
              <Input label="Weight (kg)" type="number" value={form.weight} onChange={up("weight")} />
            </div>
            <Select label="Fitness Goal" value={form.goal} onChange={up("goal")} options={["Weight Loss", "Muscle Gain", "Maintenance", "Fat Loss"]} />
            <Btn onClick={() => setToast({ msg: "Profile updated!", type: "success" })} icon={Check}>Save Changes</Btn>
          </Card>

          <Card>
            <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 15, margin: "0 0 1rem" }}>Account Actions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Btn variant="secondary" icon={FileText} size="sm">Export Progress Report (PDF)</Btn>
              <Btn variant="secondary" icon={Bell} size="sm">Notification Preferences</Btn>
              <Btn variant="danger" icon={Trash2} size="sm">Delete Account</Btn>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

/* ─── ADMIN PAGE ─── */
const AdminPage = () => {
  const stats = [
    { label: "Total Users", value: "12,847", icon: Users, color: PALETTE.sky, trend: "+8.2%" },
    { label: "Active Today", value: "3,241", icon: Activity, color: PALETTE.emerald, trend: "+12.1%" },
    { label: "Workouts Today", value: "8,920", icon: Dumbbell, color: PALETTE.violet, trend: "+5.4%" },
    { label: "Retention Rate", value: "78%", icon: TrendingUp, color: PALETTE.amber, trend: "+2.1%" },
  ];

  const users = [
    { name: "Alex Rivera", email: "alex@fitforge.io", goal: "Weight Loss", streak: 23, status: "active", joined: "Jan 2025" },
    { name: "Jordan Kim", email: "jordan@example.com", goal: "Muscle Gain", streak: 15, status: "active", joined: "Feb 2025" },
    { name: "Sam Chen", email: "sam@example.com", goal: "Maintenance", streak: 7, status: "active", joined: "Mar 2025" },
    { name: "Taylor Brown", email: "taylor@example.com", goal: "Fat Loss", streak: 0, status: "inactive", joined: "Apr 2025" },
    { name: "Morgan Davis", email: "morgan@example.com", goal: "Weight Loss", streak: 42, status: "active", joined: "Jan 2025" },
  ];

  return (
    <div style={{ padding: "1.5rem", maxWidth: 1200 }}>
      <div style={{ background: `${PALETTE.amber}22`, border: `1px solid ${PALETTE.amber}44`, borderRadius: 12, padding: "10px 16px", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: 8 }}>
        <ShieldCheck size={16} color={PALETTE.amber} />
        <span style={{ fontSize: 13, color: PALETTE.amber, fontWeight: 600 }}>Admin Dashboard — Full access enabled</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: "1.5rem" }}>
        {stats.map(s => (
          <Card key={s.label}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ background: s.color + "22", borderRadius: 10, padding: 8, display: "flex" }}>
                <s.icon size={16} color={s.color} />
              </div>
              <span style={{ fontSize: 11, color: PALETTE.emerald, fontWeight: 700 }}>{s.trend}</span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#fff" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.label}</div>
          </Card>
        ))}
      </div>

      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 15, margin: 0 }}>User Management</h3>
          <Badge color={PALETTE.sky}>{users.length} shown</Badge>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["User", "Goal", "Streak", "Joined", "Status", "Actions"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "10px 12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg, ${PALETTE.emerald}, ${PALETTE.violet})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff" }}>
                        {u.name[0]}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{u.name}</div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "10px 12px" }}><Badge color={PALETTE.violet} size="sm">{u.goal}</Badge></td>
                  <td style={{ padding: "10px 12px", fontSize: 13, color: PALETTE.amber, fontWeight: 700 }}>{u.streak}d 🔥</td>
                  <td style={{ padding: "10px 12px", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{u.joined}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <Badge color={u.status === "active" ? PALETTE.emerald : PALETTE.rose}>{u.status}</Badge>
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Btn variant="ghost" size="sm" icon={Edit3} />
                      <Btn variant="ghost" size="sm" icon={Trash2} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

/* ─── MAIN APP ─── */
export default function FitForge() {
  const [authMode, setAuthMode] = useState("login");
  const [authed, setAuthed] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [toast, setToast] = useState(null);
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const user = SAMPLE_USER;

  const showToast = (t) => {
    setToast(t);
    setTimeout(() => setToast(null), 3000);
  };

  if (!authed) return <AuthPage mode={authMode} setMode={setAuthMode} onLogin={() => setAuthed(true)} />;

  const renderPage = () => {
    const props = { user, setToast: showToast };
    switch (page) {
      case "dashboard": return <DashboardPage {...props} />;
      case "workouts": return <WorkoutsPage {...props} />;
      case "nutrition": return <NutritionPage {...props} />;
      case "progress": return <ProgressPage {...props} />;
      case "goals": return <GoalsPage {...props} />;
      case "analytics": return <AnalyticsPage {...props} />;
      case "ai": return <AIPage {...props} />;
      case "profile": return <ProfilePage {...props} />;
      case "admin": return <AdminPage {...props} />;
      default: return <DashboardPage {...props} />;
    }
  };

  return (
    <div style={{
      display: "flex", height: "100vh", background: "#060c18", overflow: "hidden",
      fontFamily: "'Plus Jakarta Sans', 'Syne', system-ui, sans-serif",
      color: "#fff",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }
        @keyframes slideIn { from { transform: translateX(60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.1); } }
        input::placeholder { color: rgba(255,255,255,0.25); }
        select option { background: #1f2937; }
      `}</style>

      <Sidebar page={page} setPage={setPage} collapsed={collapsed} setCollapsed={setCollapsed} user={user} onLogout={() => setAuthed(false)} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar page={page} user={user} onAddWorkout={() => setPage("workouts")} onAddMeal={() => setPage("nutrition")} />
        <main style={{ flex: 1, overflowY: "auto" }}>
          {renderPage()}
        </main>
      </div>

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
