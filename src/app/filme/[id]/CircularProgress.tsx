export const CircularProgress = ({
  percentage = 0,
}: {
  percentage?: number
}) => {
  const r = 30
  const p = 2 * r * Math.PI
  return (
    <div className="inline-flex items-center justify-center">
      <svg className="h-20 w-20" transform="rotate(270)">
        <circle
          strokeWidth="5"
          strokeDasharray={p}
          strokeDashoffset={`calc(${p} - (${percentage} / 100 * ${p}))`}
          strokeLinecap="round"
          stroke="#14FF00"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
        <circle
          cx="40"
          cy="40"
          r="30"
          fill="white"
          strokeWidth="5"
          stroke="white"
          opacity="0.1"
        />
      </svg>
      <span className="absolute text-base text-[#14FF00]">{`${percentage.toPrecision(
        2,
      )}%`}</span>
    </div>
  )
}
