const WatchedEvent = {
    System: 'system',
    End: 'gameEnd',
    Start: 'gameStart',
  };
  
  class EventMessage {
    constructor(from, type, value) {
      this.from = from;
      this.type = type;
      this.value = value;
    }
  }
  
  class WatchedEventNotifier {
    events = [];
    handlers = [];
  
    constructor() {
      let port = window.location.port;
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
  
      this.socket.onopen = () => {
        this.receiveEvent(new EventMessage('System', WatchedEvent.System, { msg: 'connected' }));
      };
  
      this.socket.onclose = () => {
        this.receiveEvent(new EventMessage('System', WatchedEvent.System, { msg: 'disconnected' }));
      };
  
      this.socket.onmessage = async (msg) => {
        try {
          const event = JSON.parse(await msg.data.text());
          this.receiveEvent(event);
        } catch (e) {
          console.error('Error parsing incoming WebSocket message:', e);
        }
      };
    }
  
    broadcastEvent(from, type, value) {
      const event = new EventMessage(from, type, value);
      this.socket.send(JSON.stringify(event));
    }
  
    addHandler(handler) {
      this.handlers.push(handler);
    }
  
    removeHandler(handler) {
      this.handlers = this.handlers.filter((h) => h !== handler);
    }
  
    receiveEvent(event) {
      this.events.push(event);
      this.handlers.forEach((handler) => handler(event));
    }
  }
  
  // ✅ Export correctly here
  const WatchedNotifier = new WatchedEventNotifier();
  
  export { WatchedEvent, WatchedNotifier };
  

// const WatchedEvent = {
//     System: 'system',
//     MovieWatched: 'movieWatched',
//     EnteredTop5: 'enteredTop5',
//   };
  
//   class EventMessage {
//     constructor(from, type, value) {
//       this.from = from;
//       this.type = type;
//       this.value = value;
//     }
//   }
  
//   class WatchedEventNotifier {
//     events = [];
//     handlers = [];
  
//     constructor() {
//       let port = window.location.port;
//       const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
//       this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
//       this.socket.onopen = (event) => {
//         this.receiveEvent(new EventMessage('WhatyaWatchin', WatchedEvent.System, { msg: 'connected' }));
//       };
//       this.socket.onclose = (event) => {
//         this.receiveEvent(new EventMessage('WhatyaWatchin', WatchedEvent.System, { msg: 'disconnected' }));
//       };
//       this.socket.onmessage = async (msg) => {
//         try {
//           const event = JSON.parse(await msg.data.text());
//           this.receiveEvent(event);
//         } catch {}
//       };
//     }
  
//     broadcastEvent(from, type, value) {
//       const event = new EventMessage(from, type, value);
//       this.socket.send(JSON.stringify(event));
//     }
  
//     addHandler(handler) {
//       this.handlers.push(handler);
//     }
  
//     removeHandler(handler) {
//       this.handlers.filter((h) => h !== handler);
//     }
  
//     receiveEvent(event) {
//       this.events.push(event);
  
//       this.events.forEach((e) => {
//         this.handlers.forEach((handler) => {
//           handler(e);
//         });
//       });
//     }
//   }
  
//   const watchedNotifier = new WatchedEventNotifier();
//   export { WatchedEvent, watchedNotifier };