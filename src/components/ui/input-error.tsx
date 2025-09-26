export function InputError({ id, children }: { id: string; children: React.ReactNode }) {
    return (
        <span
            id={id}
            className="text-sm ms-2 text-destructive"
            aria-live="polite"
            role="alert"
        >
            {children}
        </span>
    );
}