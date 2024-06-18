// Define the color options and their respective Tailwind CSS background classes
export const colorOptions = {
  white: 'bg-white',
  black: 'bg-black',
  green: 'bg-[#5f5f53]',
  red: 'bg-[#ff0000]',
  lightGray: 'bg-[#cdcfde]',
  gray: 'bg-[#44454a]',
  pink: 'bg-[#ebb9bc]',
  yellow: 'bg-[#fddb70]',
  blue: 'bg-[#243549]',

}

export type ColorOption = keyof typeof colorOptions
