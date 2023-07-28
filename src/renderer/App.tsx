/* eslint-disable react/jsx-props-no-spreading */
import {
  autoUpdate,
  offset,
  shift,
  size,
  useClick,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';

type usePopoverProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function usePopover({ isOpen, setIsOpen }: usePopoverProps) {
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset({
        mainAxis: 19,
      }),
      size({
        padding: {
          top: 72,
        },
        apply({ availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
          });
        },
      }),
      shift({
        padding: {
          right: 19,
        },
      }),
    ],
    placement: 'top',
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click]);

  return {
    getReferenceProps,
    getFloatingProps,
    refs,
    floatingStyles,
  };
}

function Hello() {
  const [isOpen, setIsOpen] = useState(false);

  const { floatingStyles, getFloatingProps, getReferenceProps, refs } =
    usePopover({
      isOpen,
      setIsOpen,
    });

  return (
    <div className={styles.app}>
      <div />
      <div>
        <motion.div animate={{ x: isOpen ? 100 : 0 }}>
          <button
            type="button"
            ref={refs.setReference}
            {...getReferenceProps()}
          >
            Click me
          </button>
        </motion.div>
        <AnimatePresence>
          {isOpen && (
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...getFloatingProps()}
              className={styles.popper}
            >
              <motion.div
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                className={styles.motion}
                exit={{
                  y: 10,
                  opacity: 0,
                }}
                initial={{
                  y: 10,
                  opacity: 0,
                }}
                transition={{
                  ease: 'easeInOut',
                }}
              >
                <ul>
                  <li> item 1</li>
                  <li> item 2</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 3</li>
                  <li> item 4</li>
                </ul>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
