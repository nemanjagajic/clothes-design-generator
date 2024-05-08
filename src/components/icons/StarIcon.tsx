const StarIcon = ({ color }: { color: string }) => (
  <svg
    width="17"
    height="24"
    viewBox="0 0 17 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.45648 7.07178L10.6751 13.0675L16.6708 15.2861L10.6751 17.5047L8.45648 23.5004L6.23788 17.5047L0.242188 15.2861L6.23788 13.0675L8.45648 7.07178Z"
      fill={color}
    />
    <path
      d="M4.62314 0.5L5.8064 3.6977L9.0041 4.88096L5.8064 6.06421L4.62314 9.26191L3.43989 6.06421L0.242188 4.88096L3.43989 3.6977L4.62314 0.5Z"
      fill={color}
    />
  </svg>
)

export default StarIcon
