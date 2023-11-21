import { useState, useEffect } from "react";

import "./App.css";


import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";
import Stories from "./components/Stories";
import Posts from "./components/Posts";
import Camera from "./components/Camera";
import Messages from "./components/Messages";
import Profile from "./components/Profile";
import Chat from "./components/Chat";

/* DATA */
import { storiesData } from "./mocks/stories";
import { userData } from "./mocks/user";
import { postsData } from "./mocks/posts";
import { messagesData } from "./mocks/messages";

function App() {
  const [section, setSection] = useState("home");
  const [stories, setStories] = useState(storiesData);
  const [user, setUser] = useState(userData);
  const [posts, setPosts] = useState(postsData);
  const [messages, setMessages] = useState(messagesData);
  const [messageChat, setMessageChat] = useState(null);

  const handleMessage = (message) => {
    setMessageChat(message);
  };

  useEffect(() => {
    
    fetch("https://api.npoint.io/d92d246c972bb8b31ce7")
      .then((res) => res.json())
      .then((data) => setUser(data));

   
    fetch("https://api.npoint.io/79c365b5c6af193c95e6")
      .then((res) => res.json())
      .then((data) => setPosts(data));

    
    fetch("https://api.npoint.io/b994bff8b2ddc40175e9")
      .then((res) => res.json())
      .then((data) => setStories(data));

   
    fetch("https://api.npoint.io/946961eb1c85e2a20c78")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  
  const homeBySection = () => {
    switch (section) {
      case "home":
        return (
          <>
            <TopBar setSection={setSection} />
            <Stories user={user} stories={stories} />
            <Posts posts={posts} />
            <BottomBar setSection={setSection} />
          </>
        );

      case "camera":
        return (
          <>
            <TopBar setSection={setSection} />
            <Camera />
          </>
        );

      case "igtv":
        return (
          <>
            <TopBar setSection={setSection} />
            <h3>Not Available</h3>
            <BottomBar setSection={setSection} />
          </>
        );

      case "messanger":
        return (
          <>
            <Messages
              messages={messages}
              setSection={setSection}
              handleMessage={handleMessage}
            />
            <BottomBar setSection={setSection} />
          </>
        );

      case "profile":
        return (
          <>
            <Profile user={user} />
            <BottomBar setSection={setSection} />
          </>
        );

      case "chat":
        return (
          <>
            <TopBar setSection={setSection} />
            <Chat messageChat={messageChat} />
            <BottomBar setSection={setSection} />
          </>
        );

      default:
        return (
          <>
            <TopBar setSection={setSection} />
            <Stories user={user} stories={stories} />
            <Posts posts={posts} />
            <BottomBar setSection={setSection} />
          </>
        );
    }
  };

  
  return <>{homeBySection()}</>;
}

export default App;


