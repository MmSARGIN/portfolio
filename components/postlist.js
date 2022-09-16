import Image from "next/image";
import Link from "next/link";
import { cx } from "@utils/all";
import GetImage from "@utils/getImage";
import { parseISO, format } from "date-fns";
import { PhotographIcon } from "@heroicons/react/outline";
import CategoryLabel from "@components/blog/category";
import { useState, useEffect } from "react";
import { data } from "autoprefixer";

export default function PostList({ post, aspect, preloadImage, data1 }) {
  const [first, setfirst] = useState([]);


  const AuthorimageProps = post?.author?.image
    ? GetImage(post.author.image)
    : null;

  useEffect(() => {
    setfirst(data1)
    console.log('datas', data1);

  }, []);






  return (
    <>




    </>
  );
}
