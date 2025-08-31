// components/HomeClient.tsx
"use client";

import { useState } from "react";
import GameEntryLoader from "../components/loadingEntry/loadEntry";
import Entryfeedback from "./feedback/EntryFeedback/entryfeedback";

export default function HomeClient() {
    const [ready, setReady] = useState(false);

    return (
        <>
            {!ready && (
                <GameEntryLoader
                    title="ALGOVSION"
                    subtitle="booting kernel · loading assets · warming shaders"
                    durationMs={3500}
                    onComplete={() => setReady(true)}
                />
            )}
            {ready && <main className="min-h-screen bg-neutral-950 text-white grid place-items-center">
                <Entryfeedback />
            </main>}
        </>
    );
}