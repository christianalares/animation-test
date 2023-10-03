'use client'

import { useCallback, useEffect, useState } from 'react'
import { Question } from './Question'
import { QuestionNav } from './QuestionNav'
import { AnimatePresence, motion } from 'framer-motion'

export type TQuestion = {
  id: string
  body: string
}

// Don't judge me, this was co-pilot's idea
const QUESTIONS: TQuestion[] = [
  {
    id: '1',
    body: 'What is your name?',
  },
  {
    id: '2',
    body: 'What is your favorite color?',
  },
  {
    id: '3',
    body: 'What is your quest?',
  },
  {
    id: '4',
    body: 'What is the airspeed velocity of an unladen swallow?',
  },
  {
    id: '5',
    body: 'What is the capital of Assyria?',
  },
]

export const Questions = () => {
  const [direction, setDirection] = useState<0 | -1 | 1>(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const question = QUESTIONS[currentQuestionIndex]

  const canNavBack = currentQuestionIndex > 0
  const canNavForward = currentQuestionIndex < QUESTIONS.length - 1

  const handlePrev = useCallback(() => {
    if (!canNavBack) {
      return
    }
    setDirection(-1)
    setCurrentQuestionIndex((prev) => prev - 1)
  }, [canNavBack])

  const handleNext = useCallback(() => {
    if (!canNavForward) {
      return
    }
    setDirection(1)
    setCurrentQuestionIndex((prev) => prev + 1)
  }, [canNavForward])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleNext, handlePrev])

  return (
    <div className="flex w-full max-w-3xl flex-1 flex-col overflow-hidden">
      <AnimatePresence mode="popLayout" custom={direction} initial={false}>
        <motion.div
          custom={direction}
          variants={{
            initial: (dir) => ({
              opacity: 0,
              x: `${dir * 130}%`,
              rotate: dir * 20,
              y: '50%',
            }),
            animate: {
              opacity: 1,
              x: '0%',
              rotate: 0,
              y: 0,
            },
            exit: (dir) => ({
              opacity: 0,
              x: `${-dir * 130}%`,
              rotate: -dir * 20,
              y: '50%',
            }),
          }}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: 'spring', bounce: 0, duration: 1.5 }}
          key={currentQuestionIndex}
        >
          <Question question={question} />
        </motion.div>
      </AnimatePresence>
      <QuestionNav onPrev={handlePrev} onNext={handleNext} disabledPrev={!canNavBack} disabledNext={!canNavForward} />
    </div>
  )
}
