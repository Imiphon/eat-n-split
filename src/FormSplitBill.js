import { useState } from "react";
import Button from "./Button";

export default function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState(0);
  const [userPays, setUserPays] = useState(0);
  const [usersBillPart, setUsersBillPart] = useState(0);
  const [inputType, setInputType] = useState("%");

  function handleBillChange(value) {
    if (isNaN(value) || value === "") {
      setBill(0);
      setUsersBillPart(inputType === "%" ? 0 : usersBillPart);
      return;
    }
    const newBill = Number(value);
    setBill(newBill);
    setUsersBillPart(inputType === "%" ? (newBill * 50) / 100 : usersBillPart);
  }

  function handleUsersBillPartChange(value) {
    if (isNaN(value) || value === "") {
      setUsersBillPart(0);
      return;
    }
    const numValue = Number(value);
    if (inputType === "%") {
      setUsersBillPart((bill * numValue) / 100);
    } else {
      setUsersBillPart(numValue);
    }
  }

  function handleInputTypeChange(value) {
    setInputType(value);
    setUsersBillPart(value === "%" ? (bill * 50) / 100 : usersBillPart);
  }

  const currResult = userPays && userPays - usersBillPart;
  const friendsBillPart = bill - usersBillPart;

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill) return;
    onSplitBill(currResult);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a Bill with {selectedFriend?.name}</h2>

      <label>💰 Our bill</label>
      <input
        type="text"
        value={bill || ""}
        placeholder="0"
        onFocus={(e) => (e.target.placeholder = "")}
        onBlur={(e) => (e.target.placeholder = "0")}
        onChange={(e) => handleBillChange(e.target.value)}
      />

      <label>💰 My part of the bill</label>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={
            inputType === "%"
              ? (usersBillPart / bill) * 100 || ""
              : usersBillPart || ""
          }
          placeholder="50"
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "50")}
          onChange={(e) => handleUsersBillPartChange(e.target.value)}
        />
        <select
          value={inputType}
          onChange={(e) => handleInputTypeChange(e.target.value)}
        >
          <option value="%">%</option>
          <option value="$">$</option>
        </select>
      </div>
      
      <label style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px"
      }}> <img src={selectedFriend.image} alt={selectedFriend.nam} style={{width: "2em"}}></img>{selectedFriend?.name}'s part</label>
      <input type="text" value={friendsBillPart || ""} disabled />

      <label>💰 You give</label>
      <input
        type="text"
        value={userPays || ""}
        placeholder="0"
        onFocus={(e) => (e.target.placeholder = "")}
        onBlur={(e) => (e.target.placeholder = "0")}
        onChange={(e) => {
          const value = e.target.value;
          if (isNaN(value) || value === "") {
            setUserPays(0);
            return;
          }
          setUserPays(Number(value));
        }}
      />

      <Button>Split Bill</Button>
    </form>
  );
}
