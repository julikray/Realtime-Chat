// import { useAppStore } from '@/store'
// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

// function Chat() {

//   const { userInfo } = useAppStore();
//   const navigate = useNavigate();

//   useEffect(()=>{
//     if(!userInfo.profileSetup){
//       toast("Please setup profile to continue.");
//       navigate("/profile");
//     }
 
//   },[userInfo, navigate]);

//   return (
//     <div>Chat.....</div>
//   )
// }

// export default Chat


import { useAppStore } from '@/store';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ContactsContainer from './components/contacts-container/ContactsContainer';
import EmptyChatContainer from './components/empty-chat-container/EmptyChatContainer';
import ChatContainer from './components/chat-container/ChatContainer';

function Chat() {
  const { userInfo, selectedChatType } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      // Redirect to login if userInfo is undefined
      toast.error("Unauthorized access. Redirecting to login.");
      navigate("/auth");
      return;
    }

    if (!userInfo.profileSetup) {
      toast("Please setup your profile to continue.");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return (
    <div className='flex h-[100vh] text-white overflow-hidden ' >
      <ContactsContainer/>
      {
        selectedChatType === undefined ? (
          <EmptyChatContainer/>
        ) : (
          <ChatContainer/>
        )
      }

      {/* <EmptyChatContainer/> */}
      {/* <ChatContainer/> */}
    </div>
  );
}

export default Chat;
