import styled from "styled-components";
import { useState } from "react";
import ReactPlayer from "react-player";
import { UserAuth } from "../context/authContext";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase";

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [sharedImage, setSharedImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");
  const { user } = UserAuth();

  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert("Not an image, the file is a " + typeof image);
      return;
    }
    setSharedImage(image);
  };

  const db = getFirestore(app);
  const newPost = async () => {
    await addDoc(collection(db, "linkedin-posts"), {
      date: new Date(),
      description: editorText,
      image: sharedImage,
      video: videoLink,
      likes: 0,
      id: user.uid,
    });
  };

  const switchAssetArea = (assetArea) => {
    setSharedImage("");
    setVideoLink("");
    setAssetArea(assetArea);
  };

  const reset = (e) => {
    setEditorText("");
    setSharedImage("");
    setVideoLink("");
    setAssetArea(assetArea);
    props.handleClick(e);
  };

  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(e) => reset(e)}>
                <img src="/images/close-icon.svg" alt="close icon" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <img src="/images/user.svg" alt="user" />
                )}
                <span>{user.displayName}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk about ?"
                  autoFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg, image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file">Select an image to share</label>
                    </p>
                    {sharedImage && (
                      <img
                        src={URL.createObjectURL(sharedImage)}
                        alt="shared"
                      />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="Please input a video link"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <SharedCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src="/images/shared-image.svg" alt="shared" />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src="/images/shared-video.svg" alt="shared" />
                </AssetButton>
              </AttachAssets>

              <SharedComment>
                <AssetButton>
                  <img src="/images/shared-comment.svg" alt="shared comment" />
                  Anyone
                </AssetButton>
              </SharedComment>

              <PostButton
                onClick={(e) => {
                  newPost();
                  reset(e);
                }}
                disabled={!editorText ? true : false}
              >
                Post
              </PostButton>
            </SharedCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.1s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 015);
    svg,
    img {
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background-color: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
`;

const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;

const SharedComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    svg {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${(props) =>
    props.disabled ? "rgba(0, 0, 0, 0.8)" : "#0a66c2"};
  color: rgba(0, 0, 0, 0.8);
  &:hover {
    background: ${(props) =>
      props.disabled ? "rgba(0, 0, 0, 0.08)" : "#004182"};
    cursor: pointer;
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    width: -webkit-fill-available;
    min-height: 100px;
    resize: none;
    padding: 20px;
  }

  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

export default PostModal;
