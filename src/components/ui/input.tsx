import { cn } from "@/lib/utils";
import * as React from "react";

interface InputProps extends React.ComponentProps<"input"> {
    error?: boolean;
}

function Input({ className, type, error, ...props }: InputProps) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-2",
                error
                    ? "border-destructive ring-destructive/20 dark:ring-destructive/40 focus-visible:border-destructive focus-visible:ring-destructive/50"
                    : "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                "focus-visible:ring-[3px]",
                className
            )}
            aria-invalid={error}
            {...props}
        />
    );
}

export { Input };
