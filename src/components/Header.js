import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { UserAuth } from "../context/authContext";
import "../index.css";

const Header = () => {
  const { logOut, user } = UserAuth();
  const [searchBar, isSearchBar] = useState(false);
  const inputRef = useRef(null);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmbedSearchBarClick = () => {
    isSearchBar(true);
  };

  const handleInputBlur = () => {
    isSearchBar(false);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, [searchBar]);

  return (
    <div>
      <Container>
        <Content>
          <Logo>
            <a href="#">
              <img src="/images/home-logo.svg" alt="home logo" />
            </a>
          </Logo>

          <EmbedSearchBar
            onClick={handleEmbedSearchBarClick}
            className={searchBar ? "search-active" : ""}
          >
            <SearchIcon>
              <img src="/images/search-icon.svg" alt="search icon" />
            </SearchIcon>
            {searchBar && (
              <input
                type="text"
                placeholder="Search"
                ref={inputRef}
                onBlur={handleInputBlur}
              />
            )}
          </EmbedSearchBar>

          <Search>
            <div>
              <input type="text" placeholder="Search" />
            </div>
            <SearchIcon>
              <img src="/images/search-icon.svg" alt="search icon" />
            </SearchIcon>
          </Search>

          {!searchBar && (
            <Nav>
              <NavListWrap>
                <NavList className="active">
                  <i>
                    <img src="/images/nav-home.svg" alt="nav home" />
                    <span>Home</span>
                  </i>
                </NavList>

                <NavList className="bloquedArea">
                  <i>
                    <img src="/images/nav-network.svg" alt="nav network" />
                    <span>My network</span>
                  </i>
                </NavList>

                <NavList className="bloquedArea">
                  <i>
                    <img src="/images/nav-jobs.svg" alt="nav jobs" />
                    <span>Jobs</span>
                  </i>
                </NavList>

                <NavList className="bloquedArea">
                  <i>
                    <img src="/images/nav-messaging.svg" alt="nav messaging" />
                    <span>Messaging</span>
                  </i>
                </NavList>

                <NavList className="bloquedArea">
                  <i>
                    <img
                      src="/images/nav-notifications.svg"
                      alt="nav-notification"
                    />
                    <span>Notifications</span>
                  </i>
                </NavList>

                <User>
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
                    <span>
                      Me
                      <img src="/images/down-icon.svg" alt="down" />
                    </span>
                  </i>

                  <SignOut>
                    <i>
                      <button onClick={handleSignOut}>Logout</button>
                    </i>
                  </SignOut>
                </User>
                <Work className="bloquedArea">
                  <i>
                    <img src="/images/nav-work.svg" alt="" />
                    <span>
                      Work
                      <img src="/images/down-icon.svg" alt="" />
                    </span>
                  </i>
                </Work>
              </NavListWrap>
            </Nav>
          )}
        </Content>
      </Container>
    </div>
  );
};

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  left: 0;
  padding: 0 24px;
  position: fixed;
  top: 0;
  width: calc(100vw - 48px);
  z-index: 100;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`;

const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
  cursor: pointer;
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  @media (max-width: 768px) {
    flex-grow: unset;
    height: 52px;
    width: 70px;
    display: none;
    align-self: center;
    justify-content: center;
    :hover {
      cursor: pointer;
      background-color: #f7f7f7;
    }
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    position: relative;
    top: 0;
  }
  img {
    @media (max-width: 768px) {
      width: 24px;
    }
  }
`;

const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    margin-left: unset;
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;

const NavList = styled.li`
  display: flex;
  align-items: center;

  i {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;

    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      @media (max-width: 768px) {
        display: none;
      }
    }
    @media (max-width: 768px) {
      min-width: 70px;
    }
  }
  &:hover,
  &:active {
    background-color: #f7f7f7;
    cursor: pointer;
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;

const SignOut = styled.div`
  position: absolute;
  top: 45px;
  background: white;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  transition-duration: 167ms;
  text-align: center;
  display: none;
`;

const User = styled(NavList)`
  i > svg {
    width: 24px;
    border-radius: 50%;
  }
  i > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  span {
    display: flex;
    align-items: center;
  }
  &:hover {
    ${SignOut} {
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
`;

const EmbedSearchBar = styled.div`
  flex-grow: unset;
  height: 52px;
  width: 70px;
  display: none;
  align-self: center;
  justify-content: center;
  :hover {
    cursor: pointer;
    background-color: #f7f7f7;
  }
  input {
    display: flex;
    position: absolute;
    border: none;
    box-shadow: none;
    background-color: #eef3f8;
    border-radius: 2px;
    color: rgba(0, 0, 0, 0.9);
    padding: 0 8px 0 60px;
    left: 75px;
    right: 30px;
    top: 9px;
    line-height: 1.75;
    font-weight: 400;
    font-size: 14px;
    height: 34px;
    border-color: #dce6f1;
    vertical-align: text-top;
    border-radius: 4px;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

export default Header;
