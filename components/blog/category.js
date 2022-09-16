import Link from "next/link";
import Label from "@components/ui/label";

export default function CategoryLabel({ categories }) {
  console.log('cete', categories);

  return (
    <div>
      {categories?.length &&
        categories.map((category, index) => (
          <Link
            href={`/category/${category.slug.current}`}
            key={index}>
            <a>
              <Label color={category.color}>{category.title}</Label>
            </a>
          </Link>
        ))}
    </div>
  );
}
