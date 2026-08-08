"use client"

// Dynamic import to prevent SSR issues
let confetti: any = null;

if (typeof window !== "undefined") {
  import("canvas-confetti").then((module) => {
    confetti = module.default;
  });
}

export const triggerConfetti = (
  particleCount = 100,
  spread = 70,
  origin = { y: 0.6 },
  colors = ["#3b82f6", "#10b981", "#f59e0b", "#f43f5e"]
) => {
  if (!confetti) return;
  
  confetti({
    particleCount,
    spread,
    origin,
    colors,
  });
};

export const triggerFireworks = () => {
  if (!confetti) return;
  
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const interval: any = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
  }, 250);
};

export const triggerStars = () => {
  if (!confetti) return;
  
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ['star'],
    colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ['star']
    });

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ['circle']
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
};
