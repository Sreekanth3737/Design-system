import * as React from "react";
import { cn } from "../../../utils/cn";

export type Theme =
  | "default"
  | "dark"
  | "ocean"
  | "sunset"
  | "forest"
  | "lavender"
  | "monochrome"
  | "neon"
  | "corporate"
  | "minimal";

export interface CustomTheme {
  name: string;
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    border: string;
    input: string;
    ring: string;
  };
  backgroundGradient?: string;
  cardGradient?: string;
}

export interface AuthLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  subtitle?: string;
  logo?: React.ReactNode;
  backgroundVariant?: "default" | "gradient" | "pattern" | "image";
  backgroundImage?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  cardVariant?: "default" | "elevated" | "bordered" | "glass";
  headerAlignment?: "left" | "center" | "right";
  footerContent?: React.ReactNode;
  isLoading?: boolean;
  theme?: Theme;
  customTheme?: CustomTheme;
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

const cardVariantClasses = {
  default: "bg-card border shadow-sm",
  elevated: "bg-card border shadow-lg",
  bordered: "bg-card border-2 border-primary/20",
  glass: "bg-card/80 backdrop-blur-md border border-white/20 shadow-xl",
};

const backgroundVariantClasses = {
  default: "bg-background",
  gradient: "bg-gradient-to-br from-primary/5 via-background to-secondary/5",
  pattern:
    "bg-background bg-[radial-gradient(circle_at_1px_1px,_rgba(0,0,0,0.05)_1px,_transparent_0)] bg-[length:20px_20px]",
  image: "bg-cover bg-center bg-no-repeat",
};

const themes: Record<Theme, CustomTheme> = {
  default: {
    name: "Default",
    colors: {
      background: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
      card: "0 0% 100%",
      cardForeground: "222.2 84% 4.9%",
      primary: "221.2 83.2% 53.3%",
      primaryForeground: "210 40% 98%",
      secondary: "210 40% 96%",
      secondaryForeground: "222.2 47.4% 11.2%",
      muted: "210 40% 96%",
      mutedForeground: "215.4 16.3% 46.9%",
      accent: "210 40% 96%",
      accentForeground: "222.2 47.4% 11.2%",
      border: "214.3 31.8% 91.4%",
      input: "214.3 31.8% 91.4%",
      ring: "221.2 83.2% 53.3%",
    },
  },
  dark: {
    name: "Dark",
    colors: {
      background: "222.2 84% 4.9%",
      foreground: "210 40% 98%",
      card: "222.2 84% 4.9%",
      cardForeground: "210 40% 98%",
      primary: "210 40% 98%",
      primaryForeground: "222.2 47.4% 11.2%",
      secondary: "217.2 32.6% 17.5%",
      secondaryForeground: "210 40% 98%",
      muted: "217.2 32.6% 17.5%",
      mutedForeground: "215 20.2% 65.1%",
      accent: "217.2 32.6% 17.5%",
      accentForeground: "210 40% 98%",
      border: "217.2 32.6% 17.5%",
      input: "217.2 32.6% 17.5%",
      ring: "212.7 26.8% 83.9%",
    },
  },
  ocean: {
    name: "Ocean",
    colors: {
      background: "200 70% 8%",
      foreground: "210 40% 98%",
      card: "200 60% 12%",
      cardForeground: "210 40% 98%",
      primary: "195 100% 50%",
      primaryForeground: "222.2 47.4% 11.2%",
      secondary: "200 50% 20%",
      secondaryForeground: "210 40% 98%",
      muted: "200 50% 20%",
      mutedForeground: "200 20% 65%",
      accent: "195 100% 40%",
      accentForeground: "210 40% 98%",
      border: "200 50% 25%",
      input: "200 50% 25%",
      ring: "195 100% 50%",
    },
  },
  sunset: {
    name: "Sunset",
    colors: {
      background: "30 100% 95%",
      foreground: "222.2 84% 4.9%",
      card: "30 100% 98%",
      cardForeground: "222.2 84% 4.9%",
      primary: "25 95% 53%",
      primaryForeground: "210 40% 98%",
      secondary: "30 80% 85%",
      secondaryForeground: "222.2 47.4% 11.2%",
      muted: "30 80% 85%",
      mutedForeground: "215.4 16.3% 46.9%",
      accent: "15 90% 60%",
      accentForeground: "210 40% 98%",
      border: "30 60% 80%",
      input: "30 60% 80%",
      ring: "25 95% 53%",
    },
  },
  forest: {
    name: "Forest",
    colors: {
      background: "120 30% 8%",
      foreground: "210 40% 98%",
      card: "120 25% 12%",
      cardForeground: "210 40% 98%",
      primary: "142 76% 36%",
      primaryForeground: "210 40% 98%",
      secondary: "120 20% 20%",
      secondaryForeground: "210 40% 98%",
      muted: "120 20% 20%",
      mutedForeground: "120 10% 65%",
      accent: "142 76% 50%",
      accentForeground: "210 40% 98%",
      border: "120 20% 25%",
      input: "120 20% 25%",
      ring: "142 76% 36%",
    },
  },
  lavender: {
    name: "Lavender",
    colors: {
      background: "260 50% 95%",
      foreground: "222.2 84% 4.9%",
      card: "260 50% 98%",
      cardForeground: "222.2 84% 4.9%",
      primary: "262 83% 58%",
      primaryForeground: "210 40% 98%",
      secondary: "260 40% 85%",
      secondaryForeground: "222.2 47.4% 11.2%",
      muted: "260 40% 85%",
      mutedForeground: "215.4 16.3% 46.9%",
      accent: "262 83% 70%",
      accentForeground: "210 40% 98%",
      border: "260 30% 80%",
      input: "260 30% 80%",
      ring: "262 83% 58%",
    },
  },
  monochrome: {
    name: "Monochrome",
    colors: {
      background: "0 0% 5%",
      foreground: "0 0% 98%",
      card: "0 0% 8%",
      cardForeground: "0 0% 98%",
      primary: "0 0% 98%",
      primaryForeground: "0 0% 9%",
      secondary: "0 0% 14.9%",
      secondaryForeground: "0 0% 98%",
      muted: "0 0% 14.9%",
      mutedForeground: "0 0% 63.9%",
      accent: "0 0% 14.9%",
      accentForeground: "0 0% 98%",
      border: "0 0% 14.9%",
      input: "0 0% 14.9%",
      ring: "0 0% 83.1%",
    },
  },
  neon: {
    name: "Neon",
    colors: {
      background: "200 100% 5%",
      foreground: "180 100% 90%",
      card: "200 100% 8%",
      cardForeground: "180 100% 90%",
      primary: "180 100% 50%",
      primaryForeground: "200 100% 5%",
      secondary: "280 100% 20%",
      secondaryForeground: "180 100% 90%",
      muted: "280 100% 20%",
      mutedForeground: "180 50% 70%",
      accent: "320 100% 50%",
      accentForeground: "200 100% 5%",
      border: "280 100% 30%",
      input: "280 100% 30%",
      ring: "180 100% 50%",
    },
  },
  corporate: {
    name: "Corporate",
    colors: {
      background: "220 100% 97%",
      foreground: "222.2 84% 4.9%",
      card: "220 100% 99%",
      cardForeground: "222.2 84% 4.9%",
      primary: "221.2 83.2% 53.3%",
      primaryForeground: "210 40% 98%",
      secondary: "220 60% 90%",
      secondaryForeground: "222.2 47.4% 11.2%",
      muted: "220 60% 90%",
      mutedForeground: "215.4 16.3% 46.9%",
      accent: "220 80% 85%",
      accentForeground: "222.2 47.4% 11.2%",
      border: "220 40% 85%",
      input: "220 40% 85%",
      ring: "221.2 83.2% 53.3%",
    },
  },
  minimal: {
    name: "Minimal",
    colors: {
      background: "0 0% 100%",
      foreground: "0 0% 9%",
      card: "0 0% 100%",
      cardForeground: "0 0% 9%",
      primary: "0 0% 9%",
      primaryForeground: "0 0% 98%",
      secondary: "0 0% 96.1%",
      secondaryForeground: "0 0% 9%",
      muted: "0 0% 96.1%",
      mutedForeground: "0 0% 45.1%",
      accent: "0 0% 96.1%",
      accentForeground: "0 0% 9%",
      border: "0 0% 89.8%",
      input: "0 0% 89.8%",
      ring: "0 0% 3.9%",
    },
  },
};

// Helper function to convert camelCase to kebab-case
const camelToKebab = (str: string): string => {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
};

// Helper function to determine if theme is dark
const isDarkTheme = (theme: Theme): boolean => {
  return ["dark", "ocean", "forest", "monochrome", "neon"].includes(theme);
};

// Helper function to get appropriate text colors based on theme
const getTextColorClasses = (theme: Theme) => {
  const isDark = isDarkTheme(theme);
  return {
    title: isDark ? "text-white" : "text-foreground",
    subtitle: isDark ? "text-gray-200" : "text-muted-foreground",
    description: isDark ? "text-gray-300" : "text-muted-foreground",
    backButton: isDark
      ? "text-gray-300 hover:text-white"
      : "text-muted-foreground hover:text-foreground",
    loading: isDark ? "text-gray-300" : "text-muted-foreground",
  };
};

const AuthLayout = React.forwardRef<HTMLDivElement, AuthLayoutProps>(
  (
    {
      className,
      children,
      title,
      description,
      subtitle,
      logo,
      backgroundVariant = "default",
      backgroundImage,
      showBackButton = false,
      onBackClick,
      maxWidth = "md",
      cardVariant = "default",
      headerAlignment = "center",
      footerContent,
      isLoading = false,
      theme = "default",
      customTheme,
      ...props
    },
    ref
  ) => {
    const backgroundStyle =
      backgroundVariant === "image" && backgroundImage
        ? { backgroundImage: `url(${backgroundImage})` }
        : {};

    const headerAlignmentClass = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    }[headerAlignment];

    // Determine theme to use
    const activeTheme = customTheme || themes[theme] || themes.default;

    // Get conditional text color classes
    const textColors = getTextColorClasses(theme);

    // Map theme colors to CSS variables with proper kebab-case naming
    const themeVars = Object.entries(activeTheme.colors).reduce(
      (vars, [key, value]) => {
        const cssVarName = `--${camelToKebab(key)}`;
        vars[cssVarName] = value;
        return vars;
      },
      {} as Record<string, string>
    );

    // Add gradients if present
    if (activeTheme.backgroundGradient) {
      themeVars["--background-gradient"] = activeTheme.backgroundGradient;
    }
    if (activeTheme.cardGradient) {
      themeVars["--card-gradient"] = activeTheme.cardGradient;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "min-h-screen flex items-center justify-center px-4 py-8 relative",
          backgroundVariantClasses[backgroundVariant],
          className
        )}
        style={{ ...backgroundStyle, ...themeVars }}
        {...props}
      >
        {/* Background overlay for image variant */}
        {backgroundVariant === "image" && (
          <div className="absolute inset-0 bg-black/40" />
        )}

        {/* Back button */}
        {showBackButton && (
          <button
            onClick={onBackClick}
            className={cn(
              "absolute top-6 left-6 z-10 flex items-center gap-2 transition-colors",
              textColors.backButton
            )}
            type="button"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        )}

        <div
          className={cn(
            "w-full space-y-6 relative z-10",
            maxWidthClasses[maxWidth]
          )}
        >
          {/* Header Section */}
          {(logo || title || description || subtitle) && (
            <div className={cn("space-y-3", headerAlignmentClass)}>
              {logo && <div className="flex justify-center mb-4">{logo}</div>}

              {title && (
                <h1
                  className={cn(
                    "text-2xl font-bold tracking-tight",
                    textColors.title
                  )}
                >
                  {title}
                </h1>
              )}

              {subtitle && (
                <h2 className={cn("text-lg font-medium", textColors.subtitle)}>
                  {subtitle}
                </h2>
              )}

              {description && (
                <p className={textColors.description}>{description}</p>
              )}
            </div>
          )}

          {/* Main Card */}
          <div
            className={cn(
              "p-6 rounded-lg relative",
              cardVariantClasses[cardVariant]
            )}
          >
            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-card/80 rounded-lg flex items-center justify-center z-20">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className={cn("text-sm", textColors.loading)}>
                    Loading...
                  </span>
                </div>
              </div>
            )}

            {children}
          </div>

          {/* Footer Content */}
          {footerContent && (
            <div className={cn("space-y-2", headerAlignmentClass)}>
              {footerContent}
            </div>
          )}
        </div>
      </div>
    );
  }
);

AuthLayout.displayName = "AuthLayout";

export { AuthLayout };
