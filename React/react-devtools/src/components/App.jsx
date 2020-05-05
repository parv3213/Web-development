import React from "react";
import Card from "./Card";
import contacts from "../contacts";
import Avatar from "./Avatar";

function App() {
    return (
        <div>
            <h1 className="heading">My Contacts</h1>
            <Avatar img="https://media-exp1.licdn.com/dms/image/C5103AQEnKQCm0Imwtw/profile-displayphoto-shrink_200_200/0?e=1594252800&v=beta&t=UqiO7CnMIlgKKEJr29iH1iikILvJwaUMwAiGqlSxlsk" />
            <Card
                name={contacts[0].name}
                img={contacts[0].imgURL}
                tel={contacts[0].phone}
                email={contacts[0].email}
            />
            <Card
                name={contacts[1].name}
                img={contacts[1].imgURL}
                tel={contacts[1].phone}
                email={contacts[1].email}
            />
            <Card
                name={contacts[2].name}
                img={contacts[2].imgURL}
                tel={contacts[2].phone}
                email={contacts[2].email}
            />
        </div>
    );
}

export default App;
