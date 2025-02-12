import Button from './Button';
import { useState } from 'react';

export default function FormAddFriend({onNewFriend, onAddNewFriend}) {
  const [friendName, setFriendName] = useState("");
  const [friendPic, setUrl] = useState("path to pic or nothin'");

  function handleSubmit(event) {
    event.preventDefault();
    const id = ("000000" + Math.floor(Math.random() * 1000000)).slice(-6); //works not in every browser!
    if (friendName) {
      const newFriend = {
        id: id,
        name: friendName,
        image: "https://i.pravatar.cc/" + id, 
        balance: 0,
      };
      onNewFriend(newFriend);
      setUrl("path to pic or nothin'");
      setFriendName("");
      onAddNewFriend();
    } else {
      return;
    }
  }
  
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 New friend</label>
      <input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />
      <label>✉️ random Pic</label>
      <input
        type="text"
        value={friendPic}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}