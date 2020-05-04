import React from "react";
import contacts from "../contacts";

function Card(props) {
    return (
        <div>
            <div className="card">
                <div className="top">
                    <h2 class="name">{contacts[0].name}</h2>
                    <img className="circle-img" src={contacts[0].imgURL} alt="img" />
                </div>
                <div className="bottom">
                    <p className="info">{contacts[0].phone}</p>
                    <p className="info">{contacts[0].email}</p>
                </div>
            </div>
            <div className="card">
                <div className="top">
                    <h2 class="name">{contacts[1].name}</h2>
                    <img className="circle-img" src={contacts[1].imgURL} alt="img" />
                </div>
                <div className="bottom">
                    <p className="info">{contacts[1].phone}</p>
                    <p className="info">{contacts[1].email}</p>
                </div>
            </div>
            <div className="card">
                <div className="top">
                    <h2 class="name">{contacts[2].name}</h2>
                    <img className="circle-img" src={contacts[2].imgURL} alt="img" />
                </div>
                <div className="bottom">
                    <p className="info">{contacts[2].phone}</p>
                    <p className="info">{contacts[2].email}</p>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <div>
            <h1 className="heading">My Contacts</h1>
            <Card />
        </div>
    );
}

export default App;
