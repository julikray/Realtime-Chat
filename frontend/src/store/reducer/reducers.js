// // import { reducerCases } from "./constants.js";

// // export const initialState = {
// //   videoCall: undefined,
// //   voiceCall: undefined,
// //   incomingVoiceCall: undefined,
// //   incomingVideoCall: undefined,
// // };

// // const reducer = (state, action) => {
// //   switch (action.type) {
// //     case reducerCases.SET_VIDEO_CALL:
// //       return {
// //         ...state,
// //         videoCall: action.videoCall,
// //       };
// //     case reducerCases.SET_VOICE_CALL:
// //       return {
// //         ...state,
// //         voiceCall: action.voiceCall,
// //       };

// //     case reducerCases.SET_INCOMING_VOICE_CALL:
// //       return {
// //         ...state,
// //         incomingVoiceCall: action.incomingVoiceCall,
// //       };

// //     case reducerCases.SET_INCOMING_VIDEO_CALL:
// //       return {
// //         ...state,
// //         incomingVideoCall: action.incomingVideoCall,
// //       };

// //     case reducerCases.END_CALL:
// //       return {
// //         ...state,
// //         voiceCall: undefined,
// //         videoCall: undefined,
// //         incomingVideoCall: undefined,
// //         incomingVoiceCall: undefined,
// //       };

// //     default:
// //       return state; // Return current state for unknown actions
// //   }
// // };



// // reducer.js

// // Action types
// export const reducerCases = {
//     SET_VIDEO_CALL: 'SET_VIDEO_CALL',
//     SET_VOICE_CALL: 'SET_VOICE_CALL',
//     END_CALL: 'END_CALL',
//     SET_INCOMING_VOICE_CALL: 'SET_INCOMING_VOICE_CALL',
//     SET_INCOMING_VIDEO_CALL: 'SET_INCOMING_VIDEO_CALL',
//   };
  
//   // Initial state
//   export const initialState = {
//     videoCall: undefined,
//     voiceCall: undefined,
//     incomingVoiceCall: undefined,
//     incomingVideoCall: undefined,
//   };
  
//   // Reducer function to handle actions
//   const reducer = (state = initialState, action) => {
//     switch (action.type) {
//       case reducerCases.SET_VIDEO_CALL:
//         return {
//           ...state,
//           videoCall: action.videoCall,
//         };
//       case reducerCases.SET_VOICE_CALL:
//         return {
//           ...state,
//           voiceCall: action.voiceCall,
//         };
//       case reducerCases.SET_INCOMING_VOICE_CALL:
//         return {
//           ...state,
//           incomingVoiceCall: action.incomingVoiceCall,
//         };
//       case reducerCases.SET_INCOMING_VIDEO_CALL:
//         return {
//           ...state,
//           incomingVideoCall: action.incomingVideoCall,
//         };
//       case reducerCases.END_CALL:
//         return {
//           ...state,
//           voiceCall: undefined,
//           videoCall: undefined,
//           incomingVideoCall: undefined,
//           incomingVoiceCall: undefined,
//         };
//       default:
//         return state; // Return current state for unknown actions
//     }
//   };
  
  
  // reducer.js

// Action types
export const reducerCases = {
  SET_VIDEO_CALL: 'SET_VIDEO_CALL',
  SET_VOICE_CALL: 'SET_VOICE_CALL',
  END_CALL: 'END_CALL',
  SET_INCOMING_VOICE_CALL: 'SET_INCOMING_VOICE_CALL',
  SET_INCOMING_VIDEO_CALL: 'SET_INCOMING_VIDEO_CALL',
};

// Initial state
export const initialState = {
  videoCall: undefined,
  voiceCall: undefined,
  incomingVoiceCall: undefined,
  incomingVideoCall: undefined,
};

// Reducer function to handle actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case reducerCases.SET_VIDEO_CALL:
      return { ...state, videoCall: action.videoCall };
    case reducerCases.SET_VOICE_CALL:
      return { ...state, voiceCall: action.voiceCall };
    case reducerCases.SET_INCOMING_VOICE_CALL:
      return { ...state, incomingVoiceCall: action.incomingVoiceCall };
    case reducerCases.SET_INCOMING_VIDEO_CALL:
      return { ...state, incomingVideoCall: action.incomingVideoCall };
    case reducerCases.END_CALL:
      return {
        ...state,
        voiceCall: undefined,
        videoCall: undefined,
        incomingVideoCall: undefined,
        incomingVoiceCall: undefined,
      };
    default:
      return state; // Return current state for unknown actions
  }
};

export default reducer;
