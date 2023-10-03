import { type TQuestion } from './Questions'

type Props = {
  question: TQuestion
}

export const Question = ({ question }: Props) => {
  return (
    <div className="rounded-lg border border-gray-600 bg-gray-700 p-16 shadow-lg">
      <h2 className="text-2xl">
        #{question.id} {question.body}
      </h2>
      <input type="text" className="mt-8 w-full rounded-md border border-gray-800 bg-slate-600 px-4 py-2" />
    </div>
  )
}
