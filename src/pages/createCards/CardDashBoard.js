import React, { useEffect, useState , useContext } from 'react';
import './CardDashBoard.css';
import notebook_icon from '../../assets/images/notebook_icon.png';
import { useHistory } from 'react-router-dom';
import API from '../../services/axiosConfig'; // Adjust the import path to where your API is defined
import {wordContext} from "../../contexts/wordContext";

const CreateCardDashBoard = () => {
    const [folders, setFolders] = useState([]);
    const history = useHistory();
    const { isLoggedIn, setIsLoggedIn } = useContext(wordContext);


    useEffect(() => {
        API.get(`${process.env.REACT_APP_API_URL}:3006/decks`) // Use Axios instance to make the GET request
            .then(response => {
                const folderData = response.data.map(deck => ({
                    name: deck.deck_name,
                    icon: notebook_icon,
                    route: `deck/${deck.deck_name}`
                }));
                // Add the extra folder here
                const extraFolder = { name: 'add+', icon: notebook_icon, route: '/create_card' };
                folderData.push(extraFolder); // Append the additional folder to the array

                setFolders(folderData);            })
            .catch(error => console.error("There was an error fetching the decks:", error));
    }, [isLoggedIn]); // Dependency array now includes isLoggedIn

    const FolderBox = ({ name, icon, route }) => {
        return (
            <div className="folder-box" onClick={() => history.push(route)}>
                <img src={icon} alt={name} />
                <p>{name}</p>
            </div>
        );
    };

    return (
        <div className="cardDashBoard">
            <div className="dash-header">Hello</div>
            <div className="dash-body">
                {folders.map((folder, index) => (
                    <FolderBox key={index} name={folder.name} icon={folder.icon} route={folder.route} />
                ))}
            </div>
        </div>
    );
};

export default CreateCardDashBoard;
