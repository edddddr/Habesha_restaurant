import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaCoffee, FaLeaf } from "react-icons/fa";
import { useAuthStore } from "../stores/authStore";

const phone = z.string().trim().regex(/^\+251(?:9|7)\d{8}$/, "Use a valid Ethiopian number, e.g. +251911234567.");
const loginSchema = z.object({ phone, password: z.string().min(8, "Password must be at least 8 characters.") });
const registrationSchema = loginSchema.extend({
  fullName: z.string().trim().min(3, "Enter your full name.").max(80),
  email: z.string().trim().email("Enter a valid email address."),
  confirmPassword: z.string(),
}).refine((values) => values.password === values.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match." });

function Field({ label, error, children }) { return <label>{label}{children}{error && <small className="form-error" role="alert">{error.message}</small>}</label>; }

export default function AccountPage({ register: isRegistration = false }) {
  const navigate = useNavigate();
  const signIn = useAuthStore((state) => state.signIn);
  const registerUser = useAuthStore((state) => state.register);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(isRegistration ? registrationSchema : loginSchema),
    defaultValues: { fullName: "", phone: "", email: "", password: "", confirmPassword: "" },
  });
  const submit = (values) => {
    if (isRegistration) registerUser(values); else signIn(values);
    navigate("/specials");
  };
  return <main className="account-page page-main">
    <div className="account-intro"><p className="eyebrow">Mesob Feast Circle</p><h1>{isRegistration ? "Become an Honored Table Guest" : "A table shared is a bond celebrated."}</h1><p>Immerse yourself in authentic highland hospitality, where every shared meal honors community, connection, and craft.</p><div className="account-benefit"><FaCoffee /><div><b>Welcome Gift: Pure Tej or Buna</b><small>Enjoy a complimentary welcome tradition with your first banquet.</small></div></div><div className="account-benefit"><FaLeaf /><div><b>Communal Gursha Points</b><small>Earn generous loyalty points for special platters and upgrades.</small></div></div></div>
    <form className="account-form" onSubmit={handleSubmit(submit)} noValidate><h2>{isRegistration ? "Create Your Mesob House Account" : "Welcome to the Mesob Table"}</h2><p>{isRegistration ? "Join our culinary heritage circle in less than a minute." : "Sign in to manage your feasts, rewards, and reserved dining mesobs."}</p><div className="social-buttons"><button type="button">Telebirr Quick Sign</button><button type="button">Continue with Google</button></div>{isRegistration && <Field label="Full Name" error={errors.fullName}><input {...register("fullName")} autoComplete="name" placeholder="e.g. Abebe Bikila or Genet Tadesse" /></Field>}<Field label="Ethiopian Mobile Number" error={errors.phone}><input {...register("phone")} inputMode="tel" autoComplete="tel" placeholder="+251911234567" /></Field>{isRegistration && <Field label="Email Address" error={errors.email}><input {...register("email")} type="email" autoComplete="email" placeholder="guest@mesobhouse.com" /></Field>}<Field label="Password" error={errors.password}><input {...register("password")} type="password" autoComplete={isRegistration ? "new-password" : "current-password"} placeholder="Minimum 8 characters" /></Field>{isRegistration && <Field label="Confirm Password" error={errors.confirmPassword}><input {...register("confirmPassword")} type="password" autoComplete="new-password" placeholder="Repeat password" /></Field>}<button disabled={isSubmitting} className="button button-primary submit-button">{isRegistration ? "Create Account & Receive Welcome Gursha" : "Sign In to Mesob House"} <FaArrowRight /></button><Link className="text-action" to={isRegistration ? "/login" : "/register"}>{isRegistration ? "Already part of our dining family? Sign in here" : "New to our dining family? Join the Mesob Table"}</Link></form>
  </main>;
}
