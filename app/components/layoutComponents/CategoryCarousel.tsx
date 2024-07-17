import { Category } from "@prisma/client";
import { Link, useParams, useSearchParams } from "@remix-run/react";
import { setSearchParamsString } from "~/utils/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Button } from "../ui/button";

interface CategoryCarouselProps {
  categories: Category[];
}

export default function CategoryCarousel({
  categories,
}: CategoryCarouselProps) {
  const [searchParams] = useSearchParams();
  const { category } = useParams();
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-4xl"
    >
      <CarouselContent>
        {categories.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/6 lg:basis-1/7">
            <div className="rounded-md">
              <Link
                key={index}
                prefetch="intent"
                to={{
                  pathname: item.name,
                  search: setSearchParamsString(searchParams, {
                    //   page: 0,
                  }),
                }}
              >
                <Button
                  variant={
                    item.name.toLowerCase() === category?.toLowerCase()
                      ? "default"
                      : "outline"
                  }
                >
                  {item.name.toUpperCase()}
                </Button>
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
