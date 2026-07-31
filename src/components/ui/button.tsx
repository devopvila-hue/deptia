"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode, type AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonStyles = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium tracking-tight transition-all duration-200 will-change-transform hover:-translate-y-px active:translate-y-0 active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background [&_svg]:size-[1.1em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-[#0a0c08] hover:bg-[#e3ff7a] active:bg-[#cbff4e] shadow-[0_1px_0_rgba(0,0,0,0.1)]",
        secondary:
          "bg-surface-soft text-foreground border border-border-strong hover:bg-surface hover:border-foreground/30",
        ghost:
          "bg-transparent text-foreground hover:bg-surface-soft",
        outline:
          "bg-transparent text-foreground border border-border hover:border-foreground/40 hover:bg-surface-soft/50",
        subtle:
          "bg-accent-soft text-foreground border border-accent/30 hover:border-accent/60 hover:bg-accent-soft",
        link:
          "bg-transparent text-foreground underline-offset-4 hover:underline px-0 h-auto",
        danger:
          "bg-danger/15 text-danger border border-danger/40 hover:bg-danger/25",
      },
      size: {
        sm: "h-9 px-3.5 text-[0.8125rem] rounded-md",
        md: "h-11 px-5 text-[0.9375rem] rounded-lg",
        lg: "h-12 px-6 text-[0.9375rem] rounded-lg",
        xl: "h-14 px-7 text-[1rem] rounded-xl",
        icon: "h-10 w-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type CommonProps = VariantProps<typeof buttonStyles> & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  className?: string;
  children?: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | "href"> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function ButtonContent({
  leftIcon,
  rightIcon,
  loading,
  children,
}: Pick<CommonProps, "leftIcon" | "rightIcon" | "loading" | "children">) {
  return (
    <>
      {loading ? (
        <span
          aria-hidden
          className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-current border-t-transparent"
        />
      ) : (
        leftIcon
      )}
      <span className="inline-flex items-center gap-2">{children}</span>
      {!loading && rightIcon}
    </>
  );
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      variant,
      size,
      leftIcon,
      rightIcon,
      loading,
      children,
      disabled,
      ...rest
    } = props as CommonProps & { disabled?: boolean; href?: string; external?: boolean };

    const classes = cn(buttonStyles({ variant, size, className }));

    if ("href" in props && props.href) {
      const isExternal = (props as ButtonAsLink).external ?? props.href.startsWith("http");
      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={props.href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
            {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            <ButtonContent leftIcon={leftIcon} rightIcon={rightIcon} loading={loading}>
              {children}
            </ButtonContent>
          </a>
        );
      }
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={props.href}
          className={classes}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          <ButtonContent leftIcon={leftIcon} rightIcon={rightIcon} loading={loading}>
            {children}
          </ButtonContent>
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        disabled={disabled || loading}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        <ButtonContent leftIcon={leftIcon} rightIcon={rightIcon} loading={loading}>
          {children}
        </ButtonContent>
      </button>
    );
  }
);
Button.displayName = "Button";
