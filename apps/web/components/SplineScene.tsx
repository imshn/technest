"use client";
import Spline from '@splinetool/react-spline';

export default function SplineScene({ scene }: { scene: string }) {
  return (
    <div className="absolute inset-0 -top-55 w-full h-full">
      <Spline scene={scene} />
    </div>
  );
}