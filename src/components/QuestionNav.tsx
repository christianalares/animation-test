type Props = {
  onPrev: () => void
  onNext: () => void
  disabledPrev: boolean
  disabledNext: boolean
}

export const QuestionNav = ({ onPrev, onNext, disabledPrev, disabledNext }: Props) => {
  return (
    <div className="mt-auto flex items-center justify-between gap-2">
      <button
        disabled={disabledPrev}
        onClick={onPrev}
        className="h-12 w-12 cursor-pointer rounded-md border border-gray-600 bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 [&:not(:disabled)]:hover:bg-gray-800"
      >
        &larr;
      </button>
      <button
        disabled={disabledNext}
        onClick={onNext}
        className="h-12 w-12 cursor-pointer rounded-md border border-gray-600 bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 [&:not(:disabled)]:hover:bg-gray-800"
      >
        &rarr;
      </button>
    </div>
  )
}
