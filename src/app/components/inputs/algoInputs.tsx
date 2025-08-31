const INPUT_DESIGN = "bg-zinc-950 rounded-md p-4 w-full"


export const algoInputs = {
  input1: ({ id, onchange, placeholder, type, value }: { id: string; onchange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string; type: string; value: string; }) => {
    return (
      <input id={id} onChange={onchange} type={type} placeholder={placeholder} value={value} />
    )
  }
}