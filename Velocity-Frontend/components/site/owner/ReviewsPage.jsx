import { Star } from "lucide-react";

import PageHeader from "./common/PageHeader";

function ReviewsPage() {
  const reviews = [
    {
      name: "Rohit Verma",
      rating: 5,
      text: "Great car and very smooth pickup experience.",
    },
    {
      name: "Neha Singh",
      rating: 4,
      text: "The vehicle was clean and comfortable.",
    },
    {
      name: "Aman Gupta",
      rating: 5,
      text: "Excellent experience. Would definitely book again.",
    },
  ];

  return (
    <>
      <PageHeader
        title="Reviews"
        description="See what renters are saying about your vehicles."
      />

      <div className="space-y-4">

        {reviews.map((review) => (
          <div
            key={review.name}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                {review.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </div>

              <div>

                <p className="font-semibold">
                  {review.name}
                </p>

                <div className="flex gap-1">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    ),
                  )}

                </div>

              </div>

            </div>

            <p className="mt-4 text-sm text-slate-600">
              "{review.text}"
            </p>

          </div>
        ))}

      </div>
    </>
  );
}

export default ReviewsPage;