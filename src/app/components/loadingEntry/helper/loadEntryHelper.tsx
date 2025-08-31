import { useMemo } from "react";

export function StatusRow({ label, value, ok }: { label: string; value: string; ok: boolean }) {
    return (
        <div className="rounded-xl bg-neutral-900/70 px-3 py-2 border border-neutral-800 flex items-center justify-between">
            <span className="text-neutral-400 text-xs">{label}</span>
            <span className={`text-xs font-mono ${ok ? "text-emerald-400" : "text-neutral-500"}`}>
                {value} {ok ? "· OK" : "· …"}
            </span>
        </div>
    );
}

export function Particles({ count = 50 }: { count?: number }) {
    const parts = useMemo(() => Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        dur: Math.random() * 6 + 4,
        delay: Math.random() * 3,
        alpha: Math.random() * 0.7 + 0.1,
    })), [count]);
    return (
        <div className="pointer-events-none absolute inset-0">
            {parts.map(p => (
                <span
                    key={p.id}
                    className="absolute rounded-full bg-white"
                    style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, opacity: p.alpha, animation: `floatY ${p.dur}s ease-in-out ${p.delay}s infinite alternate` }}
                />
            ))}
            <style jsx>{`
          @keyframes floatY { from { transform: translateY(-6px); } to { transform: translateY(6px); } }
        `}</style>
        </div>
    );
}