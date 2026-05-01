"use client";

import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }: any, ref: any) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i: number, distX: number, distY: number, total: number) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});
const placeNow = (el: any, slot: any, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = ({
  width = 400,
  height = 280,
  cardDistance = 50,
  verticalDistance = 60,
  delay = 4000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 4,
  easing = 'elastic',
  children
}: any) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 1.5,
          durMove: 0.8,
          durReturn: 1.2,
          promoteOverlap: 0.7,
          returnDelay: 0.1
        }
      : {
          ease: 'power2.inOut',
          durDrop: 0.5,
          durMove: 0.5,
          durReturn: 0.5,
          promoteOverlap: 0.3,
          returnDelay: 0.1
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const [isAnimating, setIsAnimating] = useState(false);

  const tlRef = useRef<any>(null);
  const intervalRef = useRef<any>(null);
  const container = useRef<any>(null);
  const isHoveredRef = useRef(false);

  const swap = () => {
    if (order.current.length < 2 || isAnimating) return;

    const [front, ...rest] = order.current;
    const elFront = refs[front].current;

    // Check if element exists before animating
    if (!elFront) {
      console.log('CardSwap: Front element not found', refs.map(r => !!r.current));
      return;
    }

    setIsAnimating(true);
    console.log('CardSwap: Starting swap animation');
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      }
    });
    tlRef.current = tl;

    // Animate front card dropping down
    tl.to(elFront as gsap.TweenTarget, {
      y: '+=300',
      duration: config.durDrop,
      ease: 'power2.inOut'
    });

    tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);

    // Move remaining cards forward
    rest.forEach((idx: any, i: number) => {
      const el = refs[idx].current;
      const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
      tl.set(el as gsap.TweenTarget, { zIndex: slot.zIndex }, 'promote');
      tl.to(el as gsap.TweenTarget, {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: config.durMove,
          ease: config.ease
        },
        `promote+=${i * 0.12}`
      );
    });

    // Return front card to back
    const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
    tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);

    // Reset front card opacity and position it at the back
    tl.set(elFront, {
      opacity: 1,
      zIndex: backSlot.zIndex
    }, 'return');

    tl.to(elFront as gsap.TweenTarget, {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        duration: config.durReturn,
        ease: config.ease
      },
      'return'
    );

    // Update order
    tl.call(() => {
      order.current = [...rest, front];
    });
  };

  useEffect(() => {
    const total = refs.length;
    console.log('CardSwap: Setting up', total, 'cards');
    refs.forEach((r: any, i: number) => {
      if (r.current) {
        placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
        console.log(`CardSwap: Placed card ${i}`, r.current);
      }
    });

    const startInterval = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      // Add a small delay to ensure refs are populated
      setTimeout(() => {
        console.log('CardSwap: Starting interval with delay', delay, 'ms');
        intervalRef.current = window.setInterval(() => {
          if (!isHoveredRef.current && !isAnimating) {
            console.log('CardSwap: Interval triggered swap');
            swap();
          }
        }, delay);
      }, 500);
    };

    startInterval();

    if (pauseOnHover) {
      const node = container.current;
      const onEnter = () => {
        isHoveredRef.current = true;
        if (tlRef.current) {
          tlRef.current.pause();
        }
      };
      const onLeave = () => {
        isHoveredRef.current = false;
        if (tlRef.current) {
          tlRef.current.play();
        }
      };
      node?.addEventListener('mouseenter', onEnter);
      node?.addEventListener('mouseleave', onLeave);
      return () => {
        node?.removeEventListener('mouseenter', onEnter);
        node?.removeEventListener('mouseleave', onLeave);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child: any, i: number) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...((child.props as any)?.style ?? {}) }
        } as any)
      : child
  );

  return (
    <div ref={container} className="card-swap-container w-[280px] sm:w-[320px] h-[200px] sm:h-[240px] mx-auto">
      {rendered}
    </div>
  );
};

export default CardSwap;
