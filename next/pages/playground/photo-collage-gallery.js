import React from "react";
const { useState, useEffect, useRef } = React;
import Layout from "../../components/Layout";
import { Form, Loader, Message } from "semantic-ui-react";
import agent from "lib/agent";
import Gallery from "../../components/Common/Gallery";

const getPhotos = (url) => {
  return agent({
    method: "get",
    url,
  });
};

const clientID = process.env.NEXT_PUBLIC_UNSPLASH_CLIENTID;

const title = "Unsplash Photo Search & Photo Gallery Example - Deni Apps";
const desc = `Using React Hook to search Photos via Unsplash API and view Photos in Gallery. 
Simple masonry/tiles Photos Collage, and Slide show Gallery integrated with NextJs`;

const summary = desc;
const canonical = "https://deniapps.com/playground/photo-collage-gallery";
const image = "https://deniapps.com/images/dna.png";

const seoData = {
  title,
  desc,
  summary,
  canonical,
  image,
};

const Warnings = () => (
  <Message warning>
    <Message.Header>Demo only</Message.Header>
    <p>Unsplash API only allows 50 requests / hour.</p>
  </Message>
);

const UnsplashPhotos = () => {
  let [photos, setPhotos] = useState(null);
  let [query, setQuery] = useState("");
  let [isBottom, setIsBottom] = useState(false);
  let [page, setPage] = useState(1);
  let [active, setActive] = useState(false);
  let [currentIndex, setCurrentIndex] = useState(0);

  const queryInputRef = useRef(null);
  const photoListRef = useRef(null);

  const numberOfPhotos = 30;
  // for demo purpose, only show up to 5 pages
  const maxPages = 5;

  function handleScroll() {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
      setIsBottom(true);
    }
  }

  // add listener to scroll even
  // setIsBottom when reach the bottom

  // option 1:   list has fixed height
  // useEffect(() => {
  //   // use search
  //   const list = photoListRef.current;
  //   console.log(list);

  //   list.addEventListener("scroll", (e) => {
  //     const el = e.target;
  //     if (el.scrollTop + el.clientHeight + 50 === el.scrollHeight) {
  //       setIsBottom(true);
  //     }
  //   });
  //   return () => list.removeEventListener("scroll");
  // }, []);

  // option 2: list does not have fixed height, then use window

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(async () => {
    queryInputRef.current.focus();
    // use random for initial page load
    const randomUrl =
      "https://api.unsplash.com/photos/random/?count=" +
      numberOfPhotos +
      "&client_id=" +
      clientID;

    const url =
      "https://api.unsplash.com/search/photos/?per_page=" +
      numberOfPhotos +
      "&page=" +
      page +
      "&client_id=" +
      clientID;

    const photosUrl = query ? `${url}&query=${query}` : randomUrl;

    // only fetch one for ramdomulr
    // when there is query, it's using search API
    if (page === 1 || (query && isBottom && page <= maxPages)) {
      try {
        const data = await getPhotos(photosUrl);
        console.log(data);
        // random photo api returns array, but search api returns object
        const photoFetched = Array.isArray(data) ? data : data.results;
        if (photos === null) {
          photos = photoFetched;
        } else {
          photos = photos.concat(photoFetched);
        }

        setPhotos(photos);
        // if photo found, increase page
        if (photoFetched.length > 0) {
          setPage(page + 1);
          setIsBottom(false);
        }
      } catch (error) {
        setPhotos([]);
        console.log(error);
      }
    }
  }, [query, isBottom]);

  const searchPhotos = (e) => {
    // console.log(queryInputRef.current.value);
    e.preventDefault();
    setPhotos(null); //show loading
    setPage(1);
    setQuery(queryInputRef.current.value);
  };

  return (
    <div className="dnx-box">
      {/* <form onSubmit={searchPhotos}>
        <Input
          size="large"
          icon="search"
          id="dnx-unsplash-search-input"
          ref={queryInputRef}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Photos on Unsplash"
          fluid
        />
      </form> */}
      <Form
        id="unsplash-search"
        className="unsplash-search"
        onSubmit={searchPhotos}
      >
        <input
          id="dnx-unsplash-search-input"
          ref={queryInputRef}
          placeholder="Search Photos on Unsplash"
          type="search"
          className="input"
        />
      </Form>

      <Warnings />
      {photos === null && <Loader active inline="centered" />}
      {photos !== null && photos.length === 0 && <p>No results</p>}

      <ul className="dnx-photo-grid" ref={photoListRef}>
        {photos !== null &&
          photos.length > 0 &&
          photos.map((photo, idx) => {
            return (
              <li key={photo.id}>
                <img
                  src={photo.urls.regular}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setActive(true);
                  }}
                />
              </li>
            );
          })}
      </ul>

      {photos !== null && photos.length > 0 && (
        <Gallery
          active={active}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClickOutside={() => setActive(false)}
          onClose={() => setActive(false)}
          keyboardNavigation={true}
          images={photos}
        />
      )}
    </div>
  );
};

const unsplashSearch = () => {
  return (
    <Layout seoData={seoData}>
      <h1>Unsplash Photo Search, Masonry Grid, Collage, and Gallery</h1>
      <UnsplashPhotos />
    </Layout>
  );
};
export default unsplashSearch;
