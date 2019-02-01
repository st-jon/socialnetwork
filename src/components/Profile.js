import React from 'react'

import ProfilePic from './ProfilePic'
import BioEditor from './BioEditor'

export default function Profile(props) {
    return (
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
}