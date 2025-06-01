
"use client"

import * as React from "react"
import { ChevronLeft, Github, Twitter } from "lucide-react"
import { motion } from "framer-motion"
import { FcGoogle } from "react-icons/fc"

interface AuthFormProps {
  onGoogleSignIn: () => void;
  onTwitterSignIn: () => void;
  onGithubSignIn: () => void;
  isLoading: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ 
  onGoogleSignIn, 
  onTwitterSignIn, 
  onGithubSignIn, 
  isLoading 
}) => {
  return (
    <div className="bg-white py-8 sm:py-12 lg:py-20 text-zinc-800 selection:bg-zinc-300 min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.25, ease: "easeInOut" }}
        className="relative z-10 w-full max-w-md sm:max-w-lg lg:max-w-xl p-4 sm:p-6"
      >
        <Logo />
        <Header />
        <SocialButtons 
          onGoogleSignIn={onGoogleSignIn}
          onTwitterSignIn={onTwitterSignIn}
          onGithubSignIn={onGithubSignIn}
          isLoading={isLoading}
        />
        <TermsAndConditions />
      </motion.div>
      <BackgroundDecoration />
    </div>
  )
}

const Logo: React.FC = () => (
  <div className="mb-6 flex justify-center items-center">
    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-book-purple to-book-orange flex items-center justify-center text-white">
      <span className="text-lg sm:text-xl font-bold">BK</span>
    </div>
    <span className="ml-2 text-lg sm:text-xl font-bold bg-gradient-to-r from-book-purple to-book-orange bg-clip-text text-transparent">
      Book-Kreate
    </span>
  </div>
)

const Header: React.FC = () => (
  <div className="mb-6 text-center">
    <h1 className="text-xl sm:text-2xl font-semibold">Sign in to your account</h1>
    <p className="mt-2 text-sm sm:text-base text-zinc-500">
      Start creating amazing books with AI
    </p>
  </div>
)

interface SocialButtonsProps {
  onGoogleSignIn: () => void;
  onTwitterSignIn: () => void;
  onGithubSignIn: () => void;
  isLoading: boolean;
}

const SocialButtons: React.FC<SocialButtonsProps> = ({ 
  onGoogleSignIn, 
  onTwitterSignIn, 
  onGithubSignIn, 
  isLoading 
}) => (
  <div className="mb-6 space-y-3">
    <div className="grid grid-cols-1 gap-3">
      <SocialButton 
        icon={<FcGoogle size={20} />} 
        onClick={onGoogleSignIn}
        disabled={isLoading}
      >
        Continue with Google
      </SocialButton>
      <SocialButton 
        icon={<Twitter size={20} />} 
        onClick={onTwitterSignIn}
        disabled={isLoading}
      >
        Continue with Twitter
      </SocialButton>
      <SocialButton 
        icon={<Github size={20} />} 
        onClick={onGithubSignIn}
        disabled={isLoading}
      >
        Continue with GitHub
      </SocialButton>
    </div>
  </div>
)

const SocialButton: React.FC<{
  icon?: React.ReactNode
  children?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}> = ({ icon, children, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`relative z-0 flex items-center justify-center gap-2 overflow-hidden rounded-md 
    border border-zinc-300 bg-zinc-100 
    px-4 py-3 text-sm sm:text-base font-semibold text-zinc-800 transition-all duration-500
    before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5]
    before:rounded-[100%] before:bg-zinc-800 before:transition-transform before:duration-1000 before:content-[""]
    hover:scale-105 hover:text-zinc-100 hover:before:translate-x-[0%] hover:before:translate-y-[0%] active:scale-95
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:text-zinc-800
    disabled:hover:before:translate-x-[150%] disabled:hover:before:translate-y-[150%] w-full`}
  >
    {icon}
    <span className="truncate">{children}</span>
  </button>
)

const TermsAndConditions: React.FC = () => (
  <p className="mt-6 sm:mt-9 text-xs text-zinc-500 text-center">
    By signing in, you agree to our{" "}
    <a href="/terms" className="text-book-purple hover:underline">
      Terms & Conditions
    </a>{" "}
    and{" "}
    <a href="/privacy" className="text-book-purple hover:underline">
      Privacy Policy.
    </a>
  </p>
)

const BackgroundDecoration: React.FC = () => {
  return (
    <div
      className="absolute right-0 top-0 z-0 w-[50vw] h-[50vw] sm:size-[50vw] opacity-30 sm:opacity-100"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(124 58 237 / 0.3)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(100% 100% at 100% 0%, rgba(255,255,255,0), rgba(255,255,255,1))",
        }}
      />
    </div>
  )
}

export default AuthForm
