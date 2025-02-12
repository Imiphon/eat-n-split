import Friend from "./Friend";
// import Button from "./Button";

export default function FriendsList({friends, onSelection, selectedFriend}) {
    return (
      <ul>
        {friends.map((elem) => (
          <Friend friend={elem} key={elem.id} selectedFriend={selectedFriend} onSelection={onSelection}/>
        ))}
      </ul>
    );
  }