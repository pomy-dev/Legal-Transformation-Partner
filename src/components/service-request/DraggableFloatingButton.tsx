import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { MessageCirclePlus, X } from 'lucide-react';

interface DraggableFloatingButtonProps {
  onClick: () => void;
}

export default function DraggableFloatingButton({ onClick }: DraggableFloatingButtonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const pointerDownPos = useRef({ x: 0, y: 0 });

  // Show hint tooltip after 2.5 s on first render
  useEffect(() => {
    const t = setTimeout(() => { if (!hasMoved) setShowTooltip(true); }, 2500);
    const t2 = setTimeout(() => setShowTooltip(false), 6500);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerDownPos.current = { x: e.clientX, y: e.clientY };
    dragControls.start(e);
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setShowTooltip(false);
    setHasMoved(true);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number; y: number } }) => {
    setIsDragging(false);
    // If pointer barely moved, treat as a click
    const dist = Math.hypot(info.offset.x, info.offset.y);
 
  };

  if (dismissed) return null;

  return (
    // Full-screen constraint layer (invisible)
    <div ref={constraintsRef} className="fixed inset-0 z-[55] pointer-events-none">
      <motion.div
        drag
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={constraintsRef}
        dragElastic={0.12}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 1.2 }}
        style={{ position: 'absolute', bottom: 80, right: 24 }}
        className="pointer-events-auto select-none"
      >
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap"
            >
              <div className="bg-card border border-primary/30 rounded-lg px-3 py-2 shadow-lg flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-gold-pulse shrink-0" />
                <span className="text-xs font-medium text-foreground">Request a service</span>
                {/* Arrow */}
                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0
                  border-t-[6px] border-t-transparent
                  border-b-[6px] border-b-transparent
                  border-l-[6px] border-l-primary/30" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dismiss button — appears on hover */}
        <motion.button
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground z-10 transition-colors"
          initial={{ opacity: 0, scale: 0 }}
          whileHover={{ opacity: 1, scale: 1 }}
          onClick={(e) => { e.stopPropagation(); setDismissed(true); }}
          title="Dismiss"
        >
          <X className="h-2.5 w-2.5" />
        </motion.button>

        {/* Main button */}
        <motion.button
          onPointerDown={handlePointerDown}
          onTap={onClick}
          whileHover={isDragging ? {} : { scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl cursor-grab active:cursor-grabbing transition-shadow ${
            isDragging ? 'shadow-primary/30' : ''
          }`}
          style={{
            background: 'linear-gradient(135deg, hsl(43, 75%, 52%), hsl(38, 80%, 42%))',
          }}
          aria-label="Request a service"
        >
          {/* Outer pulse ring */}
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{ background: 'hsl(43, 75%, 52%)' }}
          />
          {/* Second slower ring */}
          <span
            className="absolute -inset-1.5 rounded-full border border-primary/30 animate-pulse"
          />

          <MessageCirclePlus className="h-6 w-6 text-primary-foreground relative z-10" strokeWidth={1.8} />
        </motion.button>

        {/* Label below button */}
        <div className="mt-1.5 text-center">
          <span className="text-[9px] font-bold tracking-widest text-primary uppercase select-none">
            {isDragging ? 'Drag' : 'Services'}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
