import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import ImageCard from "../components/ImageCard";
import { CircularProgress } from "@mui/material";
import { GetPosts } from "../api";

const Container = styled.div`
  padding: 30px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
  background: ${({ theme }) => theme.bg};
`;

const HeadLine = styled.div`
  font-size: 34px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const Span = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.secondary};
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 32px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardWrapper = styled.div`
  display: grid;
  gap: 20px;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 640px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 639px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPost] = useState([]);

  // const item = {
  //   photo:
  //     "data:image/jpeg;base64,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",
  //   author: "Ismaeil",
  //   prompt: "Hey Prompt!",
  // };

  const getPosts = async () => {
    setLoading(true);
    await GetPosts()
      .then((res) => {
        setPosts(res?.data?.data);
        setFilteredPost(res?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  // Search
  useEffect(() => {
    if (!search) {
      setFilteredPost(posts);
    }
    const SearchFilteredPosts = posts.filter((post) => {
      const promptMatch = post?.prompt
        ?.toLowerCase()
        .includes(search.toString().toLowerCase());
      const authorMatch = post?.author
        ?.toLowerCase()
        .includes(search.toString().toLocaleLowerCase());

      return promptMatch || authorMatch;
    });

    if (search) {
      setFilteredPost(SearchFilteredPosts);
    }
  }, [posts, search]);

  return (
    <Container>
      <HeadLine>
        Explore popular posts in the Community
        <Span>⦿ Generated with AI ⦿</Span>
      </HeadLine>
      <SearchBar search={search} setSearch={setSearch} />
      <Wrapper>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {loading ? (
          <CardWrapper>
            {filteredPosts.length === 0 ? (
              <>No Posts Found</>
            ) : (
              <>
                {filteredPosts
                  .slice()
                  .reverse()
                  .map((item, index) => (
                    <ImageCard key={index} item={item} />
                  ))}
              </>
            )}
          </CardWrapper>
        ) : (
          <CircularProgress />
        )}
      </Wrapper>
    </Container>
  );
};

export default Home;
