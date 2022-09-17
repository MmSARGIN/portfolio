import { NextSeo } from "next-seo";
import Layout from "@components/layout";
import Container from "@components/container";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "@lib/sanity";
import defaultOG from "../public/img/opengraph.jpg";
import { postquery, configQuery } from "@lib/groq";
import GetImage from "@utils/getImage";
import PostList from "@components/postlist";
import { useEffect, useState } from "react";
import Link from "next/link";
import CategoryLabel from "@components/blog/category";
import { cx, myLoader } from "@utils/all";
import Image from "next/image";
import { CubeTransparentIcon } from "@heroicons/react/outline";


export default function Post(props) {
  const { postdata, siteconfig, preview, aspect } = props;
  const [datas, setdatas] = useState();

  const router = useRouter();
  //console.log(router.query.category);


  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer 00D8d000006v4Eu!AQ8AQFgUiG1fiOy0Hjy25Gr18eQChlS1lXLX9E8w7q0UyMeANo1.bSmbTFQy8yNHJt5emiAJLWW44x8_J_Imz50JXKZ4G5jE`
    }
  }
  const data1 = async () => {

    const info = await fetch('https://mms2-dev-ed.my.salesforce.com/services/apexrest/Portfolio', options)
      .then(res => res.json())
      .then(json => {
        console.log('json', json)
        setdatas(json)
      })



  };
  useEffect(() => {
    data1();
  }, []);

  const { data: posts } = usePreviewSubscription(postquery, {
    initialData: postdata,
    enabled: preview || router.query.preview !== undefined
  });


  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });
  //console.log(posts);
  const ogimage = siteConfig?.openGraphImage
    ? GetImage(siteConfig?.openGraphImage).src
    : defaultOG.src;
  return (
    <>
      {posts && siteConfig && (
        <Layout {...siteConfig}>
          {/* <NextSeo
            title={`${siteConfig?.title}`}
            description={siteConfig?.description || ""}
            canonical={siteConfig?.url}
            openGraph={{
              url: siteConfig?.url,
              title: `${siteConfig?.title}`,
              description: siteConfig?.description || "",
              images: [
                {
                  url: ogimage,
                  width: 800,
                  height: 600,
                  alt: ""
                }
              ],
              site_name: "Stablo"
            }}
            twitter={{
              cardType: "summary_large_image"
            }}
          /> */}
          <Container>
            <div className="grid  gap-10 lg:gap-10 grid-cols-3 ">
              {datas ? datas.map(post => (
                <div key={post.id} className="cursor-pointer group">
                  <div
                    className={cx(
                      "relative overflow-hidden transition-all bg-gray-100 rounded-md dark:bg-gray-800   hover:scale-105",
                      aspect === "landscape" ? "aspect-video" : "aspect-square"
                    )}>
                    <Link href={`https://github.com/MmSARGIN`}>
                      <a>
                        <Image className="flex" src={post.Images__c} alt='melih' width={500} height={600} loader={myLoader}>

                        </Image>
                        {/* <img src={post.image} alt="melih">
                        </img> */}
                        {/* {
                  imageProps ? (
                    <Image
                      src={imageProps.src}
                      loader={imageProps.loader}
                      blurDataURL={imageProps.blurDataURL}
                      alt={post.mainImage.alt || "Thumbnail"}
                      placeholder="blur"
                      sizes="80vw"
                      //sizes="(max-width: 640px) 90vw, 480px"
                      layout="fill"
                      objectFit="cover"
                      priority={preloadImage ? true : false}
                      className="transition-all"
                    />
                  ) : (
                    <span className="absolute w-16 h-16 text-gray-200 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <PhotographIcon />
                    </span>
                  )} */}
                      </a>
                    </Link>
                  </div>

                  <h2 className="mt-2 text-lg font-semibold tracking-normal text-brand-primary dark:text-white">

                    <span
                      className="     bg-gradient-to-r from-green-200 to-green-100 dark:from-purple-800 dark:to-purple-900
              bg-[length:0px_10px]
              bg-left-bottom
              bg-no-repeat
              transition-[background-size]
              duration-500
              hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]">
                      {post.Name}
                    </span>

                  </h2>
                  <h2 className="mt-2 text-lg font-semibold tracking-normal text-brand-primary dark:text-white">

                    <span
                      className="     bg-gradient-to-r from-green-200 to-green-100 dark:from-purple-800 dark:to-purple-900
              bg-[length:0px_10px]
              bg-left-bottom
              bg-no-repeat
              transition-[background-size]
              duration-500
              hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]">
                      {post.Description__c}
                    </span>

                  </h2>

                  {/* <div className="hidden">
              {post.excerpt && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                  <Link href={`/post/${post.slug.current}`}>
                    {post.excerpt}
                  </Link>
                </p>
              )}
            </div> */}

                  {/* <div className="flex items-center mt-3 space-x-3 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0 w-5 h-5">
                  {post.author.image && (
                    <Image
                      src={AuthorimageProps.src}
                      blurDataURL={AuthorimageProps.blurDataURL}
                      loader={AuthorimageProps.loader}
                      objectFit="cover"
                      layout="fill"
                      alt={post?.author?.name}
                      placeholder="blur"
                      sizes="30px"
                      className="rounded-full"
                    />
                  )}
                </div>
                <span className="text-sm">{post.author.name}</span>
              </div>
              <span className="text-xs text-gray-300 dark:text-gray-600">
                &bull;
              </span>
              <time
                className="text-sm"
                dateTime={post?.publishedAt || post._createdAt}>
                {format(
                  parseISO(post?.publishedAt || post._createdAt),
                  "MMMM dd, yyyy"
                )}
              </time>
            </div> */}
                </div>
              )) : console.log("loading")
              }
            </div>
            <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
              {posts.slice(2).map(post => (
                <PostList
                  key={post._id}
                  post={post}
                  aspect="square"
                />
              ))}
            </div>
          </Container>
        </Layout>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(postquery);
  const config = await getClient(preview).fetch(configQuery);

  // const categories = (await client.fetch(catquery)) || null;

  return {
    props: {
      postdata: post,

      // categories: categories,
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}
