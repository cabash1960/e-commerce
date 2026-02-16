import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import type { reviews } from "@/lib/types";

function CarouselCard({ review }: { review: reviews }) {
  return (
    <div className="space-y-4 w-fit  flex flex-col gap-4  ">
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          <div
            className="bg-white p-8 rounded-full w-fit"
            role="img"
            aria-label={`Avatar for ${review.names}`}
          ></div>

          <h3 className="text-2xl text-gray-600!">{review.names}</h3>
        </div>
        <p className="text-gray-900 text-lg">{review.comment}</p>
      </div>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < review.rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default CarouselCard;
