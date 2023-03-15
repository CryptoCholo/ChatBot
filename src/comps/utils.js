export default function emitEvent(input) {
    let event;
    if (input) {
        switch(Number(input)) {
          case 1:
            event = "place_order";
            break;
          case 99:
            event = "checkout_order";
            break;
          case 98:
            event = "order_history";
            break;
          case 97:
            event = "current_order";
            break;
          case 0:
            event = "cancel_order";
            break;
          case 10:
            event = "grilled_options";
            break;
          case 20:
            event = "peppersoup_options";
            break;
          case 30:
            event = "sides_options";
            break;
          case 40:
            event = "beverage_options";
            break;
          default:
            return;
        }
        
      } else {
        socket.emit('message', {text: 'Invalid input, please try again'});
    }
    return event
}