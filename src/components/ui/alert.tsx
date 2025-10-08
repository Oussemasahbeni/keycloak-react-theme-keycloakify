import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle, Info, XCircle } from "lucide-react";
import { MdCheckCircle } from "react-icons/md";

import * as React from "react";

import { cn } from "@/lib/utils";

const alertVariants = cva("relative w-full rounded-lg p-4", {
    variants: {
        appearance: {
            border: "border-l-4",
            outline: "border"
        },
        type: {
            info: "",
            success: "",
            warning: "",
            error: ""
        }
    },
    compoundVariants: [
        // Border Appearance
        {
            appearance: "border",
            type: "info",
            className:
                "bg-white border-blue-600 text-blue-700 dark:bg-gray-700 dark:border-blue-400 dark:text-blue-400"
        },
        {
            appearance: "border",
            type: "success",
            className:
                "bg-white border-green-500 text-green-600 dark:bg-gray-700 dark:border-green-400 dark:text-green-400"
        },
        {
            appearance: "border",
            type: "warning",
            className:
                "bg-white border-yellow-500 text-yellow-600 dark:bg-gray-700 dark:border-yellow-400 dark:text-yellow-400"
        },
        {
            appearance: "border",
            type: "error",
            className:
                "bg-white border-red-600 text-red-700 dark:bg-gray-700 dark:border-red-400 dark:text-red-400"
        },
        // Outline Appearance
        {
            appearance: "outline",
            type: "info",
            className:
                "bg-blue-50 border-blue-400 text-blue-700 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300"
        },
        {
            appearance: "outline",
            type: "success",
            className:
                "bg-green-50 border-green-400 text-green-700 dark:bg-green-950 dark:border-green-800 dark:text-green-300"
        },
        {
            appearance: "outline",
            type: "warning",
            className:
                "bg-yellow-50 border-yellow-400 text-yellow-700 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-300"
        },
        {
            appearance: "outline",
            type: "error",
            className:
                "bg-red-50 border-red-400 text-red-700 dark:bg-red-950 dark:border-red-800 dark:text-red-300"
        }
    ],
    defaultVariants: {
        appearance: "outline",
        type: "info"
    }
});

const iconMap = {
    info: <Info className="h-5 w-5" />,
    success: <MdCheckCircle className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    error: <XCircle className="h-5 w-5" />
};

const Alert = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> &
        VariantProps<typeof alertVariants> & { showIcon?: boolean }
>(({ className, appearance, type, showIcon = true, children, ...props }, ref) => {
    const icon = type ? iconMap[type] : null;

    return (
        <div
            ref={ref}
            role="alert"
            className={cn(alertVariants({ appearance, type }), className)}
            {...props}
        >
            <div className="flex items-start gap-3">
                {showIcon && icon}
                <div className="flex-1 space-y-1">{children}</div>
            </div>
        </div>
    );
});
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={cn("font-semibold leading-5 tracking-tight", className)}
        {...props}
    />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm leading-5", className)} {...props} />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription, AlertTitle };
