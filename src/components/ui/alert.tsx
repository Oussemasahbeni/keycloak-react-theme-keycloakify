import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle, Info, XCircle } from "lucide-react";
import * as React from "react";
import { MdCheckCircle } from "react-icons/md";

import { cn } from "@/components/lib/utils";

const alertVariants = cva(
    "relative w-full rounded-lg border p-4 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7",
    {
        variants: {
            variant: {
                info: "bg-card text-card-foreground",
                error: "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300 [&>svg]:text-red-800 dark:[&>svg]:text-red-300",
                warning:
                    "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300 [&>svg]:text-amber-800 dark:[&>svg]:text-amber-300",
                success:
                    "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950/50 dark:text-green-300 [&>svg]:text-green-800 dark:[&>svg]:text-green-300"
            }
        },
        defaultVariants: {
            variant: "info"
        }
    }
);

const Alert = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> &
        VariantProps<typeof alertVariants> & { showIcon?: boolean }
>(({ className, showIcon = true, variant, ...props }, ref) => (
    <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
    >
        <div className="flex items-start gap-3">
            {showIcon && (
                <>
                    {variant === "info" && <Info className="h-5 w-5 shrink-0" />}
                    {variant === "error" && <XCircle className="h-5 w-5 shrink-0" />}
                    {variant === "warning" && (
                        <AlertTriangle className="h-5 w-5 shrink-0" />
                    )}
                    {variant === "success" && (
                        <MdCheckCircle className="h-5 w-5 shrink-0" />
                    )}
                </>
            )}
            {props.children}
        </div>
    </div>
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={cn("mb-1 font-medium leading-none tracking-tight", className)}
        {...props}
    />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-sm [&_p]:leading-relaxed", className)}
        {...props}
    />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription, AlertTitle };
