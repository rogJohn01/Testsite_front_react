
import './CardDashBoard.css';

import notebook_icon from '../../src/assets/images/notebook_icon.png'

const CreateCardDashBoard = () => {

    const folders = [
        { name: 'Folder 1', icon: notebook_icon },
        { name: 'Folder 2', icon: notebook_icon } ,
        { name: 'Folder 1', icon: notebook_icon },
        { name: 'Folder 2', icon: notebook_icon } ,
        { name: 'Folder 1', icon: notebook_icon },
        { name: 'Folder 2', icon: notebook_icon } ,
        { name: 'Folder 1', icon: notebook_icon },
        { name: 'Folder 2', icon: notebook_icon } ,
        { name: 'Folder 2', icon: notebook_icon } ,
        { name: 'add+', icon: notebook_icon } ,
    ];

    const FolderBox = ({ name, icon }) => {
        return (
            <div className="folder-box">
                <img src={icon} alt={name} />
                <p>{name}</p>
            </div>
        );
    };



    return (
        <div className="cardDashBoard">
            <div className="dash-header">
                Hello
            </div>
            <div className="dash-body">
                {folders.map((folder, index) => (
                    <FolderBox key={index} name={folder.name} icon={folder.icon} />
                ))}
            </div>
        </div>
    )

}

export default CreateCardDashBoard ;