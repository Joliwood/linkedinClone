import styled from "styled-components";
import { UserAuth } from "../context/authContext";
import PostModal from "./PostModal";
import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { app } from "../firebase";
import ReactPlayer from "react-player";
import firebase from "firebase/app";

const Main = (props) => {
  const { user } = UserAuth();
  const [showModal, setShowModal] = useState("close");
  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };

  const [postsDatas, setpostsDatas] = useState([]);

  const incrementCounter = (Firebase) => {
    const db = firebase.firestore();
    const increment = firebase.firestore.FieldValue.increment(1);
    const storyRef = db
      .collection("linkedin-posts")
      .doc("bpCyV4YyKabcnhCpo73l");
    storyRef.update({ reads: increment });
  };

  // bpCyV4YyKabcnhCpo73l -> id du document qu'on cherche à obtenir

  const db = getFirestore(app);
  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "linkedin-posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let postsDatasArr = [];
      querySnapshot.forEach((doc) => {
        postsDatasArr.push({ ...doc.data(), id: doc.id });
      });
      setpostsDatas(
        postsDatasArr.sort((a, b) =>
          a.date.toDate().toLocaleDateString() >
          b.date.toDate().toLocaleDateString()
            ? -1
            : 1
        )
      );
    });
    return () => unsubscribe();
  }, []);

  const filteredPosts = postsDatas.filter((data) => data.authid === user.uid);

  return (
    <Container>
      <ShareBox>
        Share
        <div>
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName}
              referrerPolicy="no-referrer"
            />
          ) : (
            <img src="images/user.svg" alt="user" />
          )}
          <button onClick={handleClick}>Start a post</button>
        </div>
        <div>
          <button>
            <img src="/images/photo-icon.svg" alt="camera" />
            <span>Photos</span>
          </button>

          <button>
            <img src="/images/video-icon.svg" alt="video" />
            <span>Video</span>
          </button>

          <button>
            <img src="/images/event-icon.svg" alt="event" />
            <span>Event</span>
          </button>

          <button>
            <img src="/images/article-icon.svg" alt="article" />
            <span>Write article</span>
          </button>
        </div>
      </ShareBox>
      <div>
        {filteredPosts.map((data, index) => (
          <Article key={index}>
            <SharedActor>
              <i>
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <img src="images/user.svg" alt="user" />
                )}
                <div>
                  <span>{user.displayName}</span>
                  <span>{user.email}</span>
                  <span>{data.date.toDate().toLocaleDateString()}</span>
                </div>
              </i>
              <button>
                <img src="/images/ellipsis.svg" alt="ellipsis" />
              </button>
            </SharedActor>
            <Description>{data.description}</Description>
            <SharedImage>
              <i>
                {data.video ? (
                  <ReactPlayer width={"100%"} url={data.video} />
                ) : data.image ? (
                  <img src={data.image} alt="shared" />
                ) : (
                  ""
                )}
              </i>
            </SharedImage>
            <SocialCounts>
              <li>
                <button>
                  <img src="/images/like.svg" alt="like" />
                  <img src="/images/clap.svg" alt="clap" />
                  <img src="/images/light.svg" alt="light" />
                  {data.likes}
                </button>
              </li>
              <li>
                <p>3 comments</p>
              </li>
            </SocialCounts>
            <SocialActions>
              <button onClick={incrementCounter}>
                <img src="/images/likeButton.svg" alt="like button" />
                <span>Like</span>
              </button>

              <button>
                <img src="/images/commentButton.svg" alt="comment button" />
                <span>Comments</span>
              </button>

              <button>
                <img src="/images/repostButton.svg" alt="repost button" />
                <span>Repost</span>
              </button>

              <button>
                <img src="/images/sendButton.svg" alt="send button" />
                <span>Send</span>
              </button>
            </SocialActions>
          </Article>
        ))}
      </div>

      <PostModal showModal={showModal} handleClick={handleClick} />
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a,
  i {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;

      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImage = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66c2;

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

export default Main;
