// import './App.css';

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

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [isShowAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleSelection(friend){
    setSelectedFriend(friend);
    console.log(friend);
    
  }

  function handleAddFriendForm() {
    setShowAddFriend((isShowAddFriend) => !isShowAddFriend);
  }
  
  function handleNewFriend(newFriend) {
    setFriends(friends => [...friends, newFriend])
    //Alt to onAddNewFriend is here: setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends = {friends} onSelection = {handleSelection}/>

        {isShowAddFriend && <FormAddFriend onNewFriend={handleNewFriend} onAddNewFriend={handleAddFriendForm}/>}
        <Button onClick={handleAddFriendForm}>
          {!isShowAddFriend ? "Add new friend" : "Close"}
        </Button>
      </div>
      {selectedFriend && <FormSplitBill />}
    </div>
  );
}

function FormAddFriend({onNewFriend, onAddNewFriend}) {
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

function FriendsList({friends, onSelection}) {
  return (
    <ul>
      {friends.map((elem) => (
        <Friend friend={elem} key={elem.id} onSelection={onSelection}/>
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection }) {
  return (
    <>
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
          <Button onClick={() => onSelection(friend)}>select</Button>
        </div>
      </li>
    </>
  );
}

function FormSplitBill(params) {
  return (
    <form className="form-split-bill">
      <h2> Split a Bill with X</h2>
      <label>💰 Bill</label>
      <input type="text" />
      <label>💰 Your expance</label>
      <input type="text" />
      <label>💰 X's expance</label>
      <input type="text" disabled />
      <label>💰 Who pays the bill?</label>
      <select>
        <option value="user">me</option>
        <option value="friend">X</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
