const INPUT_DESIGN =
  "bg-gradient-to-b from-slate-200/80 to-slate-500/80 shadow-inner focus:outline-none focus:ring-2 focus:ring-lime-500 rounded-md p-2 w-full";

const INFO_BASE =
  "text-xs text-zinc-200 bg-gradient-to-b from-blue-300/80 to-blue-900/80 " +
  "border-2 border-zinc-900/80 rounded p-2";

const INFO_COLLAPSE =
  // fully hidden when not focused
  "overflow-hidden max-h-0 " +
  // animate height only (no opacity)
  "transition-[max-height] duration-300 ease-out " +
  // expand when input (inside .group) is focused
  "group-focus-within:max-h-96"; // adjust 96 (24rem) to fit your content 

export const algoInputs = {
  input1: ({
    id,
    onchange,
    placeholder,
    type,
    value,
    info,
  }: {
    id: string;
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type: string;
    value: string;
    info: React.ReactNode;
  }) => (
    <div className="group relative flex flex-col gap-2">
      <input
        id={id}
        className="bg-zinc-400/80 focus:outline-none focus:ring-2 focus:ring-lime-500 rounded-md p-2 w-full"
        onChange={onchange}
        type={type}
        placeholder={placeholder}
        value={value}
        aria-describedby={`${id}-info`}
      />

      {/* Collapsible container (hidden by default; animates open on focus) */}
      <div className={INFO_COLLAPSE} aria-live="polite">
        <div id={`${id}-info`} className={INFO_BASE}>
          {info}
        </div>
      </div>
    </div>
  ),
};
