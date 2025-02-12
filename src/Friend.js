// import FriendsList from "./FriendsList";
import Button from "./Button";
  
  export default function Friend({ friend, onSelection, selectedFriend }) {
    //selectedFriend could be null, so we need to set an optional shaping '?'
    const isSelected = friend.id === selectedFriend?.id;
    return (
      <div className={isSelected?"selected" : ""}>
        <li id={friend.id}>
          <img src={friend.image} alt={friend.name} />
          <h3>{friend.name}</h3>
          <div className="friend-btn-frame">
            {friend.balance === 0 && (
              <div className="blue text">"You are even!"</div>
            )}
            {friend.balance > 0 && (
              <div className="green text">
                {" "}
                "{friend.name} owes you ${friend.balance}"
              </div>
            )}
            {friend.balance < 0 && (
              <div className="red text">
                "You owe {friend.name} ${Math.abs(friend.balance)} $"
              </div>
            )}
            <Button onClick={() => onSelection(friend)}>{!isSelected? "select" : "close"}</Button>
          </div>
        </li>
      </div>
    );
  }