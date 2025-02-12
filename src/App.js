// import './App.css';
import Button from "./Button";
import FormSplitBill from "./FormSplitBill";
import FormAddFriend from "./FormAddFriend";
import FriendsList from "./FriendsList";
import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


export default function App() {
  const [isShowAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleSelection(friend){
    setSelectedFriend((selected) => selectedFriend?.id === friend.id? null : friend);
    console.log(friend);
    setShowAddFriend(false);
  }

  function handleAddFriendForm() {
    setShowAddFriend((isShowAddFriend) => !isShowAddFriend);
    setSelectedFriend(null);
  }
  
  function handleNewFriend(newFriend) {
    setFriends(friends => [...friends, newFriend])
    //Alt. to onAddNewFriend is here: setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    const newBalance = selectedFriend.balance + Number(value);
    selectedFriend.balance = newBalance;
    setSelectedFriend(friend => [selectedFriend]);
    handleSelection(selectedFriend);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends = {friends} selectedFriend={selectedFriend} onSelection = {handleSelection}/>

        {isShowAddFriend && <FormAddFriend onNewFriend={handleNewFriend} onAddNewFriend={handleAddFriendForm}/>}
        <Button onClick={handleAddFriendForm}>
          {!isShowAddFriend ? "Add new friend" : "Close"}
        </Button>
      </div>
      {/* default selectedFriend: null */}
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill}/>}
    </div>
  );
}





