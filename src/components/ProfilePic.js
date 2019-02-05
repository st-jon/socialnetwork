import React from 'react'

export default function ProfilePic(props) {
        return (
            <div className="profile__pic">
                {props.picture ? <img className="user__profilPic" onClick={props.uploader} src={props.picture} /> : 
                <svg onClick={props.uploader} className="default__profilPic" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 48 48" x="0px" y="0px">
                    <path d="M23.15,17.31a.27.27,0,0,0,.28-.25v-.95a.27.27,0,0,0-.28-.25.27.27,0,0,0-.29.25v.95A.27.27,0,0,0,23.15,17.31Z"/>
                    <path d="M24.85,17.31a.27.27,0,0,0,.29-.25v-.95a.27.27,0,0,0-.29-.25.27.27,0,0,0-.28.25v.95A.27.27,0,0,0,24.85,17.31Z"/>
                    <path d="M20.93,20.5h.89V21a.28.28,0,1,0,.56,0V20.5h.7V21a.29.29,0,1,0,.57,0V20.5h.7V21a.29.29,0,1,0,.57,0V20.5h.7V21a.28.28,0,1,0,.56,0V20.5h.89a.29.29,0,1,0,0-.57h-.89v-.45a.28.28,0,0,0-.56,0v.45h-.7v-.45a.29.29,0,0,0-.57,0v.45h-.7v-.45a.29.29,0,0,0-.57,0v.45h-.7v-.45a.28.28,0,0,0-.56,0v.45h-.89a.29.29,0,1,0,0,.57Z"/>
                    <path d="M44.72,34.29a14.54,14.54,0,0,0-2.35-5.93c-1.35-1.81-3.43-2.1-5.28-2.23-.3,0-.63,0-1,0l-1,0H34a8.58,8.58,0,0,1-2.49-.27.94.94,0,0,1-.6-.7,3.92,3.92,0,0,1-.13-1.46,3.7,3.7,0,0,0,.28-.28,10.32,10.32,0,0,0,2.64-5,5.47,5.47,0,0,0,1.66-1.76,3.92,3.92,0,0,0,.55-2.46,2.93,2.93,0,0,0-2-2.39v-1.6s0,0,0-.05,0-.06,0-.09a10.41,10.41,0,0,0-1.45-5.23l-.09.5c-.83,1.18-2.65.55-3.16-.61-.27-.61.21-2.26-1-2-2.13.52-2.41-1-1.73-2.46A9.75,9.75,0,0,0,24,0h0a9.66,9.66,0,0,0-7,3,10.41,10.41,0,0,0-2.89,7.12v1.74a2.94,2.94,0,0,0-2,2.38,3.92,3.92,0,0,0,.55,2.46,5.3,5.3,0,0,0,1.67,1.76A10.44,10.44,0,0,0,17,23.39l.27.26a3.79,3.79,0,0,1-.13,1.51.94.94,0,0,1-.6.7,8.61,8.61,0,0,1-2.5.27H13l-1,0c-.41,0-.74,0-1,0-1.85.13-3.93.42-5.28,2.23a14.54,14.54,0,0,0-2.35,5.93,15.11,15.11,0,0,0,.09,6.46,1.19,1.19,0,0,0,.17.36A13.43,13.43,0,0,0,8,44.66,25.76,25.76,0,0,0,14.24,47a41.39,41.39,0,0,0,9.54,1A.83.83,0,0,0,24,48a.83.83,0,0,0,.22,0,41.48,41.48,0,0,0,9.55-1A25.84,25.84,0,0,0,40,44.66a13.85,13.85,0,0,0,4.48-3.55,1.19,1.19,0,0,0,.17-.36A15.11,15.11,0,0,0,44.72,34.29ZM33.86,13.44a1.47,1.47,0,0,1,.64,1,2.7,2.7,0,0,1-.6,1.85h0a.51.51,0,0,0,0-.13s0,0,0,0ZM14.1,16.26v0a2.59,2.59,0,0,1-.59-1.85,1.4,1.4,0,0,1,.6-1C14.1,14.89,14.1,16.23,14.1,16.26ZM37.89,34a.35.35,0,0,1,0,.69.35.35,0,1,1,0-.69Zm-6.83-.69a.35.35,0,0,1-.34.35.35.35,0,0,1-.35-.35.35.35,0,0,1,.35-.34A.34.34,0,0,1,31.06,33.32ZM16.33,16.13V10.24a8.7,8.7,0,0,1,.25-2.11c.06.13.13.26.2.39.29.61.6,1.24,1.22,1.24s.94-.63,1.24-1.24.59-1.2,1.16-1.2a1.44,1.44,0,0,1,1.17.7,1.56,1.56,0,0,0,1.23.72A1.54,1.54,0,0,0,24,8a1.44,1.44,0,0,1,1.17-.7c.57,0,.87.92,1.16,1.82S27,11,27.6,11s.93-.95,1.23-1.87S29.42,7.32,30,7.32a1.47,1.47,0,0,1,1.18.7c.06.08.14.16.21.24a9.24,9.24,0,0,1,.21,2v5.89A7.89,7.89,0,0,1,24,24.31,7.88,7.88,0,0,1,16.33,16.13Zm7.67,19a21.83,21.83,0,0,1-3-3.28,15.93,15.93,0,0,1-1.73-3,10.33,10.33,0,0,1-.64-1.91,3.62,3.62,0,0,0,.51-1,5.43,5.43,0,0,0,.16-.67,9.52,9.52,0,0,0,4.57,1.25.67.67,0,0,0,.2,0,9.39,9.39,0,0,0,4.55-1.22,4.05,4.05,0,0,0,.17.64,3.35,3.35,0,0,0,.5,1C29,28.43,27.8,31.61,24,35.09Zm6.37,6.28a.5.5,0,1,1,.49-.49A.49.49,0,0,1,30.37,41.37Zm8.48-3.94c-.22,1-1,.08-1.49.34s.55,1.25.32,1.74c-.13.27-.36.58-.69.57s-.34-.65-.66-.75c-.68-.22.27,1.68-.72,1.6-.38,0-.5-.44-.63-.72-.67-1.37-.9.64-1.13.95a.85.85,0,0,1-1.56-.57c0-.3,1.29-1.63.38-1.73-.27,0-.6.26-.8.4-.53.34-1.13.71-1.36-.14-.42-1.53,1.28-.44,1-1.42s-1.74.29-1.65-.82.82-.26,1.18-.7-.8-.76-.37-1.45,1.25.6,1.8,0S31,34,32.53,33s.8.87,1.94,1.32c.59.24.31-.67.34-.93.07-.63.83-.68,1.29-.49a1,1,0,0,1,.71.89c0,.73-.82,1.06-.57,1.4s.81-.17,1-.22c.5-.16,1.32.23.8.8-.11.12-1.06.37-1,.49C37.19,36.54,39.09,36.34,38.85,37.43Zm-.47-3.76a.49.49,0,1,1,.49-.49A.49.49,0,0,1,38.38,33.67Z"/>
                </svg>}
                
            </div>
        )
} 