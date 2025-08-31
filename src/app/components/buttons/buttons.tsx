const BUTTON_COLOR = "bg-gradient-to-b from-lime-300 to-lime-600 border-b-6 border-lime-700"
const BUTTON_COLOR_HOVER = "hover:border-lime-200 hover:from-lime-500 hover:to-lime-200"
const BUTTON_COLOR_INACTIVE = "opacity-50 pointer-events-none hover:cursor-not-allowed saturate-0"
const BUTTON_DESIGN = "text-white px-4 py-2 rounded-md z-20"

export const algoButton = {
  button1: ({ txt, active, handleClick }: { txt: string; active: boolean; handleClick: (e: React.FormEvent<HTMLButtonElement>) => void; }) => {
    return (
      <>
        <button
          className={`relative ${BUTTON_COLOR} ${BUTTON_COLOR_HOVER} ${active ? "" : BUTTON_COLOR_INACTIVE} ${BUTTON_DESIGN}`} type='button'
          onClick={(e: React.FormEvent<HTMLButtonElement>) => handleClick(e)}
          disabled={!active}
        >
          {txt}
        </button>

      </>
    )
  }
}