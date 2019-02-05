import React from 'react'

import ProfilePic from './ProfilePic'
import BioEditor from './BioEditor'

const Profile = (props) => (
    <div className="profile__container">
        <ProfilePic 
            picture={props.picture}
            uploader={props.uploader}
        />
        <div className="profil__info">
            <div className="profile__name">{props.name}</div>
            <BioEditor bio={props.bio} showBio={props.showBio} />
        </div>
        
    </div>
)

export default Profile

// <div className="blood">
//     <div className="shine"></div>
// </div>
// <div className="drip"></div>