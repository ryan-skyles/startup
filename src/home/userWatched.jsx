import React from 'react';
import { WatchedEvent, WatchedNotifier } from './watchedNotifier';
import './players.css';

export function Players({ userName }) {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    // Add event listener on mount
    WatchedNotifier.addHandler(handleWatchedEvent);

    // Remove event listener on unmount
    return () => {
      WatchedNotifier.removeHandler(handleWatchedEvent);
    };
  }, [events]);

  function handleWatchedEvent(event) {
    setEvents((prev) => [...prev, event]);
  }

  function renderMessage(event) {
    let message = '';
    switch (event.type) {
      case WatchedEvent.Start:
        message = 'started a new game';
        break;
      case WatchedEvent.End:
        message = `scored ${event.value.score}`;
        break;
      case WatchedEvent.System:
        message = event.value.msg;
        break;
      default:
        message = 'unknown event';
    }

    return (
      <div key={event.timestamp || Math.random()} className="event">
        <span className="player-event">
          {event.from.split('@')[0]}:
        </span>{' '}
        {message}
      </div>
    );
  }

  return (
    <div className="players">
      <div className="player-header">
        Player: <span className="player-name">{userName}</span>
      </div>
      <div id="player-messages">
        {events.map((event, i) => renderMessage(event))}
      </div>
    </div>
  );
}


// import React from 'react';

// import { WatchedEvent, WatchedNotifier } from './watchedNotifier';
// import './players.css';

// export function Players(props) {
//   const userName = props.userName;

//   const [events, setEvent] = React.useState([]);

//   React.useEffect(() => {
//     WatchedNotifier.addHandler(handleWatchedEvent);

//     return () => {
//       watchedNotifier.removeHandler(handleWatchedEvent);
//     };
//   });

//   function handleWatchedEvent(event) {
//     setEvent((prev) => [...prev, event]);
//   }
  
//   function createMessageArray() {
//     const messageArray = [];
  
//     for (const [i, event] of events.entries()) {
//       let message = '';
  
//       if (event.type === WatchedEvent.End && event.value.message) {
//         // Custom movie review broadcast
//         message = event.value.message;
//       } else if (event.type === WatchedEvent.System) {
//         // System messages like connection status
//         message = event.value.msg;
//       } else if (event.type === WatchedEvent.Start) {
//         // Placeholder if you ever use 'Start' event type
//         message = 'started a new movie session';
//       } else {
//         // Fallback
//         message = 'did something movie-related!';
//       }
  
//       messageArray.push(
//         <div key={i} className="event">
//           <span className="player-event">{event.from}</span> {message}
//         </div>
//       );
//     }
  
//     return messageArray;
//   }
  
// }

//   function handleWatchedEvent(event) {
//     setEvent([...events, event]);
//   }

//   function createMessageArray() {
//     const messageArray = [];
//     for (const [i, event] of events.entries()) {
//       let message = 'unknown';
//       if (event.type === WatchedEvent.End) {
//         message = `scored ${event.value.score}`;
//       } else if (event.type === WatchedEvent.Start) {
//         message = `started a new game`;
//       } else if (event.type === WatchedEvent.System) {
//         message = event.value.msg;
//       }

//       messageArray.push(
//         <div key={i} className='event'>
//           <span className={'player-event'}>{event.from.split('@')[0]}</span>
//           {message}
//         </div>
//       );
//     }
//     return messageArray;
//   }

//   return (
//     <div className='players'>
//       Player
//       <span className='player-name'>{userName}</span>
//       <div id='player-messages'>{createMessageArray()}</div>
//     </div>
//   );

