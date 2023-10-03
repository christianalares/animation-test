'use client'

import { useCallback, useEffect, useReducer, useState } from 'react'
import { Question } from './Question'
import { QuestionNav } from './QuestionNav'
import { AnimatePresence, motion } from 'framer-motion'

type State = {
  dir: Direction
  currentQuestionIndex: number
}

type Action = {
  type: 'prev' | 'next'
}

const initialState: State = {
  dir: 0,
  currentQuestionIndex: 0,
}

const reducer = (state: State, action: Action): State => {
  if (action.type === 'prev') {
    const canNavBack = state.currentQuestionIndex > 0
    const newCurrentQuestionIndex = canNavBack ? state.currentQuestionIndex - 1 : state.currentQuestionIndex

    return {
      ...state,
      dir: -1,
      currentQuestionIndex: newCurrentQuestionIndex,
    }
  } else if (action.type === 'next') {
    const canNavForward = state.currentQuestionIndex < QUESTIONS.length - 1
    const newCurrentQuestionIndex = canNavForward ? state.currentQuestionIndex + 1 : state.currentQuestionIndex

    return {
      ...state,
      dir: 1,
      currentQuestionIndex: newCurrentQuestionIndex,
    }
  }

  return state
}

type Direction = 0 | -1 | 1

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

const variants = {
  initial: (dir: Direction) => ({
    opacity: 0,
    x: `${dir * 130}%`,
    rotate: dir * 20,
    y: '80%',
  }),
  animate: {
    opacity: 1,
    x: '0%',
    rotate: 0,
    y: 0,
  },
  exit: (dir: Direction) => ({
    opacity: 0,
    x: `${-dir * 130}%`,
    rotate: -dir * 20,
    y: '80%',
  }),
}

export const Questions = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const canNavBack = state.currentQuestionIndex > 0
  const canNavForward = state.currentQuestionIndex < QUESTIONS.length - 1
  const question = QUESTIONS[state.currentQuestionIndex]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        dispatch({ type: 'prev' })
      } else if (e.key === 'ArrowRight') {
        dispatch({ type: 'next' })
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  if (!question) {
    return null
  }

  return (
    <div className="flex w-full max-w-3xl flex-1 flex-col">
      <AnimatePresence mode="popLayout" custom={state.dir} initial={false}>
        <motion.div
          key={state.currentQuestionIndex}
          custom={state.dir}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ /* type: 'spring', bounce: 0, */ duration: 1.5 }}
        >
          <Question question={question} />
        </motion.div>
      </AnimatePresence>

      <QuestionNav
        onPrev={() => dispatch({ type: 'prev' })}
        onNext={() => dispatch({ type: 'next' })}
        disabledPrev={!canNavBack}
        disabledNext={!canNavForward}
      />
    </div>
  )
}
