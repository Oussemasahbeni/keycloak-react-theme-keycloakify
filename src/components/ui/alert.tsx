import { cn } from "@/components/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle, Info, XCircle } from "lucide-react";
import * as React from "react";
import { MdCheckCircle } from "react-icons/md";

const alertVariants = cva(
    "relative w-full rounded-lg border px-5 py-4 text-sm flex items-center gap-4 transition-all",
    {
        variants: {
            variant: {
                info: "bg-card text-card-foreground",
                success: "bg-emerald-50/50 border-emerald-200 text-emerald-900 dark:bg-emerald-500/5 dark:border-emerald-500/20 dark:text-emerald-400",
                warning: "bg-amber-50/50 border-amber-200 text-amber-900 dark:bg-amber-500/5 dark:border-amber-500/20 dark:text-amber-400",
                error: "bg-destructive/5 border-destructive/20 text-destructive",
            },
        },
        defaultVariants: {
            variant: "info",
        },
    }
);

interface AlertProps
    extends React.ComponentProps<"div">,
    VariantProps<typeof alertVariants> {
    showIcon?: boolean;
}

function Alert({
    className,
    variant = "info",
    showIcon = true,
    children,
    ...props
}: AlertProps) {
    const Icon = {
        info: Info,
        error: XCircle,
        warning: AlertTriangle,
        success: MdCheckCircle,
    }[variant as string] || Info;

    return (
        <div
            data-slot="alert"
            role="alert"
            className={cn(alertVariants({ variant }), className)}
            {...props}
        >
            {showIcon && <Icon className="size-5 shrink-0" data-slot="alert-icon" />}
            {/* We use a div wrapper for children to ensure Title and Description stack vertically */}
            <div className="flex flex-col gap-0.5 flex-1">
                {children}
            </div>
        </div>
    );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="alert-title"
            className={cn(
                "font-medium leading-none tracking-tight",
                className
            )}
            {...props}
        />
    );
}

function AlertDescription({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="alert-description"
            className={cn(
                "text-muted-foreground text-sm [&_p]:leading-relaxed",
                className
            )}
            {...props}
        />
    );
}

export { Alert, AlertDescription, AlertTitle };
