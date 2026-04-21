import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Track hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest('[data-cursor], a, button, [role="button"]');
      
      if (hoverable) {
        setIsHovering(true);
        const text = hoverable.getAttribute('data-cursor-text') || '';
        setCursorText(text);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest('[data-cursor], a, button, [role="button"]');
      
      if (hoverable) {
        setIsHovering(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border-2 border-white flex items-center justify-center"
          animate={{
            width: isHovering ? 80 : 40,
            height: isHovering ? 80 : 40,
            scale: isClicking ? 0.9 : 1,
            backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          }}
          transition={{ duration: 0.2 }}
        >
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-white text-xs font-medium"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-2 h-2 bg-white rounded-full"
          animate={{
            scale: isClicking ? 0.5 : 1,
            opacity: isHovering ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
