'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';

interface ImageTransformerProps {
  file: File;
  onConfirm: (imageElement: HTMLImageElement, cropDetails: { width: number; height: number; x: number; y: number }, containerSize: number) => void;
  onCancel: () => void;
}

export default function ImageTransformer({ file, onConfirm, onCancel }: ImageTransformerProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [naturalSize, setNaturalSize] = useState<{ width: number; height: number } | null>(null);
  
  // Transformation state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 300, height: 300 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // We will normalize to a standard container size, e.g. 500px for high res 1:1
  const CONTAINER_SIZE = 500;
  // Local display scale factor so the modal isn't huge on small screens
  const [displayScale, setDisplayScale] = useState(1);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    
    // Scale down the display constraint if window is small, but keep logical container size
    const checkScale = () => {
       const optimalSize = Math.min(window.innerWidth * 0.8, 500);
       setDisplayScale(optimalSize / CONTAINER_SIZE);
    };
    
    checkScale();
    window.addEventListener('resize', checkScale);

    return () => {
      URL.revokeObjectURL(url);
      window.removeEventListener('resize', checkScale);
    };
  }, [file]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
    
    // Initial best fit logic inside our virtual CONTAINER_SIZE
    let startWidth = img.naturalWidth;
    let startHeight = img.naturalHeight;
    
    // Scale to fit container roughly (max width/height = CONTAINER_SIZE * 0.8)
    const scaleToFit = Math.min((CONTAINER_SIZE * 0.8) / startWidth, (CONTAINER_SIZE * 0.8) / startHeight);
    
    setSize({
      width: startWidth * scaleToFit,
      height: startHeight * scaleToFit
    });
    
    setPosition({
      x: (CONTAINER_SIZE - (startWidth * scaleToFit)) / 2,
      y: (CONTAINER_SIZE - (startHeight * scaleToFit)) / 2
    });
  };

  const handleConfirm = () => {
    if (imageRef.current) {
      onConfirm(
        imageRef.current,
        {
          width: size.width,
          height: size.height,
          x: position.x,
          y: position.y
        },
        CONTAINER_SIZE
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 shadow-2xl max-w-4xl w-full flex flex-col lg:flex-row gap-8 border border-white/10 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Left Side: Transform Area */}
        <div className="flex-1 flex flex-col items-center">
             <div className="mb-4 w-full flex justify-between items-center text-slate-800 dark:text-white">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    <span className="material-symbols-outlined">crop</span>
                    Free Transform
                </h3>
                <span className="text-xs uppercase tracking-widest bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 px-3 py-1 rounded-full font-bold">1:1 Ratio</span>
            </div>
            
            <div className="relative overflow-hidden bg-slate-100 dark:bg-neutral-950 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex items-center justify-center shadow-inner"
                 style={{ 
                     width: `${CONTAINER_SIZE * displayScale}px`, 
                     height: `${CONTAINER_SIZE * displayScale}px` 
                 }}
            >
                {/* Visual grid reference */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                {/* Scale wrapper for responsive display */}
                <div 
                    ref={containerRef}
                    className="relative origin-top-left"
                    style={{ 
                        width: CONTAINER_SIZE, 
                        height: CONTAINER_SIZE,
                        transform: `scale(${displayScale})`
                    }}
                >
                    <Rnd
                        size={{ width: size.width, height: size.height }}
                        position={{ x: position.x, y: position.y }}
                        onDragStop={(e, d) => { setPosition({ x: d.x, y: d.y }) }}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            setSize({
                                width: parseInt(ref.style.width, 10),
                                height: parseInt(ref.style.height, 10),
                            });
                            setPosition(position);
                        }}
                        lockAspectRatio={true}
                        bounds="parent"
                        className="group z-10"
                    >
                         {/* Transform Anchors/Handles visibility controlled via CSS group-hover or default styling */}
                        <div className="w-full h-full relative cursor-move">
                             {/* Outline */}
                             <div className="absolute inset-0 border border-blue-500/50 group-hover:border-blue-500 transition-colors pointer-events-none z-20"></div>
                             
                             <img 
                                ref={imageRef}
                                src={imageUrl} 
                                alt="Transform target" 
                                onLoad={handleImageLoad}
                                className="w-full h-full object-fill pointer-events-none"
                             />
                             
                             {/* Corner indicator dots (Visual only, Rnd handles the actual dragging area) */}
                            <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full border border-white pointer-events-none"></div>
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full border border-white pointer-events-none"></div>
                            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 rounded-full border border-white pointer-events-none"></div>
                            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full border border-white pointer-events-none"></div>
                        </div>
                    </Rnd>
                </div>
            </div>
        </div>

        {/* Right Side: Instructions and Actions */}
        <div className="w-full lg:w-80 flex flex-col justify-between">
            <div className="space-y-6">
                 <div>
                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-2">Instructions</h4>
                    <p className="text-sm text-slate-600 dark:text-zinc-400 font-medium">
                        Drag the image to position it. Use the edges or corners to scale it up or down.
                    </p>
                    <p className="text-sm text-slate-600 dark:text-zinc-400 font-medium mt-2">
                        The visible square area represents the final 1:1 image that will be shown in the store. Let the image breathe.
                    </p>
                 </div>
                 
                 <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl flex gap-3 text-blue-700 dark:text-blue-300">
                    <span className="material-symbols-outlined shrink-0 text-xl">auto_awesome</span>
                    <p className="text-xs font-bold font-sans">
                        Applying the transformation will automatically convert your image to WebP (optimized) and instantly upload it to Supabase storage.
                    </p>
                 </div>
            </div>

            <div className="flex flex-col gap-3 mt-8">
               <button 
                 type="button"
                 onClick={handleConfirm}
                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold tracking-widest uppercase py-4 rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2"
               >
                 <span className="material-symbols-outlined">done_all</span>
                 Confirm & Upload
               </button>
               <button 
                 type="button"
                 onClick={onCancel}
                 className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-300 font-bold tracking-widest uppercase py-4 rounded-2xl transition-all"
               >
                 Cancel
               </button>
            </div>
        </div>
      </div>
    </div>
  );
}
