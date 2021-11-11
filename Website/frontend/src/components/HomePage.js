import React, { Component } from "react";
import AboutUs from "./AboutUs";
import Message from "./Message";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [{
                username: "Medical Assistant",
                content: <p>Hello</p>
            }],
            image: null,
        };

        this.handleImageUpload = this.handleImageUpload.bind(this);
    }

    componentDidMount() {
        this.scrollToBot();
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    // Automatic scroll to bottom of chat
    scrollToBot() {
        document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
    }

    useMessageData() {
        fetch("/api/") // need to change to text model
            .then((response) => response.json())
            .then((data) => this.submitReport(data)); 
    }

//     submitReport(messageContent) {
//         this.setState({
//             messages: this.state.messages.concat([{
//                 username: "Medical Assistant",
//                 content: <p>{messageContent}</p>,
//             }])
//         });
//     }
    
    submitReport(name, confidence) {
        var response = "I did not detect any infections or burns.";
        var percent = confidence * 100 // I'm assuming that confidence is a value between 0-1, so this just converts to percentage.
        
//         if(name.toLowerCase() == "cellulitis") {
//             response = "I\'ve detected a cellulitis infection with " + percent + "% accuracy. Here are some treatment plans:\n\n(1) Cellulitis treatment usually includes a prescription oral antibiotic. Within 3 days of starting an antibiotic, let your doctor know whether the infection is responding to treatment. You’ll need to take the antibiotic for as long as your doctor directs (usually 5 to 10 days).\n\n(2) In the meantime, try these steps to ease any pain and swelling:\n- Place a cool, damp cloth on the affected area as often as needed for your comfort.\n- Ask your doctor to suggest an over-the-counter pain medication to treat pain.\n- Elevate the affected part of your body.\n- Ask your doctor whether it might help to wear compression wraps or stockings.";
//         } else if(name.toLowerCase() == "first degree burn") {
//             response = "I\'ve detected a first-degree burn with " + percent + "% accuracy. Here are some treatment plans:\n\n(1) Cool the burn. Immediately immerse the burn in cool tap water or apply cold, wet compresses.\n(2) Apply petroleum jelly two to three times daily.\n(3) Cover the burn with a nonstick, sterile bandage.\n(4) Consider taking over-the-counter pain medication.\n(5) Protect the area from the sun.";
//         } else if(name.toLowerCase() == "second degree burn") {
//             response = "I\'ve detected a second-degree burn with " + percent + "% accuracy. Here are some treatment plans:\n\n(1) Rinse the burn with cool water until the pain stops (15-30 minutes). Do not use ice or ice water, which can cause tissue damage.\n(2) Clean the burn. Do not touch the burn with your hands or anything dirty, because open blisters can easily be infected.\n(3) Bandaging the burn. No need to do this if the burned skin or blister is not broken open.\n(4) If the burn is on a leg or an arm, keep the limb raised as much as possible for the first 24 to 48 hours to decrease swelling.";
//         } else if(name.toLowerCase() == "third degree burn") {
//             response = "I\'ve detected a third-degree burn with " percent + "% accuracy. Here are some treatment plans:\n\n(1) Surgery: Third degree burns typically require multiple surgeries to remove burned tissue from the burn site.\n(2) Skin graft: As third degree burns do not heal by themselves, a skin graft is often necessary. A doctor may use a combination of natural skin grafts, artificial skin products, or laboratory-grown skin.\n(3) Intravenous fluids: Some people may receive extra fluids to maintain their blood pressure and prevent shock.\n(4) Medication: A person will likely receive several different medications, such as antibiotics and pain medication, to prevent infection and ease pain.\n(5) Tetanus shot: As tetanus bacteria are more likely to trigger infections through burn wounds, a person may receive a tetanus shot to prevent this.";
//         }
        switch(name.toLowerCase()) {
            case "cellulitis":
                response = "I\'ve detected a cellulitis infection with " + percent + "% accuracy. Here are some treatment plans:\n\n(1) Cellulitis treatment usually includes a prescription oral antibiotic. Within 3 days of starting an antibiotic, let your doctor know whether the infection is responding to treatment. You’ll need to take the antibiotic for as long as your doctor directs (usually 5 to 10 days).\n\n(2) In the meantime, try these steps to ease any pain and swelling:\n- Place a cool, damp cloth on the affected area as often as needed for your comfort.\n- Ask your doctor to suggest an over-the-counter pain medication to treat pain.\n- Elevate the affected part of your body.\n- Ask your doctor whether it might help to wear compression wraps or stockings.";
                break;
            case "first degree burn":
                response = "I\'ve detected a first-degree burn with " + percent + "% accuracy. Here are some treatment plans:\n\n(1) Cool the burn. Immediately immerse the burn in cool tap water or apply cold, wet compresses.\n(2) Apply petroleum jelly two to three times daily.\n(3) Cover the burn with a nonstick, sterile bandage.\n(4) Consider taking over-the-counter pain medication.\n(5) Protect the area from the sun.";
                break;
            case "second degree burn":
                response = "I\'ve detected a second-degree burn with " + percent + "% accuracy. Here are some treatment plans:\n\n(1) Rinse the burn with cool water until the pain stops (15-30 minutes). Do not use ice or ice water, which can cause tissue damage.\n(2) Clean the burn. Do not touch the burn with your hands or anything dirty, because open blisters can easily be infected.\n(3) Bandaging the burn. No need to do this if the burned skin or blister is not broken open.\n(4) If the burn is on a leg or an arm, keep the limb raised as much as possible for the first 24 to 48 hours to decrease swelling.";
                break;
            case "third degree burn":
                response = "I\'ve detected a third-degree burn with " + percent + "% accuracy. Here are some treatment plans:\n\n(1) Surgery: Third degree burns typically require multiple surgeries to remove burned tissue from the burn site.\n(2) Skin graft: As third degree burns do not heal by themselves, a skin graft is often necessary. A doctor may use a combination of natural skin grafts, artificial skin products, or laboratory-grown skin.\n(3) Intravenous fluids: Some people may receive extra fluids to maintain their blood pressure and prevent shock.\n(4) Medication: A person will likely receive several different medications, such as antibiotics and pain medication, to prevent infection and ease pain.\n(5) Tetanus shot: As tetanus bacteria are more likely to trigger infections through burn wounds, a person may receive a tetanus shot to prevent this.";
                break;
            default:
                "I did not detect any infections or burns.";
        }
        
        // this part is just modeled after the original submitReport function (commented above)
        this.setState({
            messages: this.state.messages.concat([{
                username: "A.M.A.N.D.A.",
                content: <p>{response}</p>,
            }])
        });
    }

    handleImageUpload = async (e) => {
        e.preventDefault();
        await this.setState({ image: e.target.files[0] });

        // Create formData object to post to API
        let formData = new FormData();
        formData.append('name', this.state.image.name);
        formData.append('image', this.state.image);

        // Post image data to API
        await axios.post("/api/", formData, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
            .then(res => {
              console.log(res.data);
            })
            .catch(err => console.log(err));

        // Send "Uploaded (image name) message"
        this.setState({
            messages: this.state.messages.concat([{
                username: "User",
                content: <p>Uploaded {this.state.image.name}</p>,
            }])
        });

        // Send message on message area
        this.useMessageData();
      };

    render() {
        const username = "User";
        const { messages } = this.state;

        return (
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <div className="chatroom">
                            <h4>Medical Assistant</h4>
                            <ul className="messages" id="messages">
                                {messages.map((message) => <Message message={message} user={username} />)}
                            </ul>
                            <div className="input">
                                <input type="file" accept="image/png, image/jpeg" hidden id="image-upload" onChange={this.handleImageUpload} />
                                <button onClick={() => document.getElementById("image-upload").click()} id="image-upload-button">Upload</button>
                            </div>
                        </div>
                    </Route>
                    <Route path='/about' component={AboutUs} />
                </Switch>
            </Router>
        )
    }
}
