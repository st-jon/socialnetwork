import React from 'react'

export default function ProfilePic(props) {
        return (
            <div className="profile__pic">
                {props.picture ? <img className="user__profilPic" onClick={props.uploader} src={props.picture} /> : 
                <svg onClick={props.uploader} className="default__profilPic" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 64 80" xmlSpace="preserve">
                    <g>
                    <path d="M38,18c1.654,0,3-1.346,3-3s-1.346-3-3-3s-3,1.346-3,3S36.346,18,38,18z M38,14c0.552,0,1,0.448,1,1s-0.448,1-1,1   s-1-0.448-1-1S37.448,14,38,14z"/>
                    <path d="M29,15c0-1.654-1.346-3-3-3s-3,1.346-3,3s1.346,3,3,3S29,16.654,29,15z M25,15c0-0.552,0.448-1,1-1s1,0.448,1,1   s-0.448,1-1,1S25,15.552,25,15z"/>
                    <path d="M49.29,33.1L39,31.17v-2.198c0.012-0.016,0.021-0.035,0.033-0.052c2.893-1.866,4.87-4.723,5.618-7.987   C47.098,20.611,49,18.534,49,16c0-2.533-1.9-4.61-4.346-4.934c-0.113-0.486-0.255-0.96-0.421-1.423l2.084-0.695l-0.633-1.896   l-2.258,0.753c-0.582-1.068-1.312-2.043-2.158-2.904l1.564-2.346l-1.664-1.109l-1.425,2.137C37.577,1.968,34.903,1,32,1   c-1.341,0-2.674,0.208-3.959,0.619l-1.169,0.372l0.601,1.069c0.143,0.255,0.25,0.516,0.335,0.78   c-2.287,0.946-4.193,2.642-5.404,4.806c-0.255-0.114-0.505-0.245-0.738-0.414l-0.99-0.716L20.17,8.63   c-0.36,0.792-0.629,1.607-0.823,2.436C16.901,11.39,15,13.467,15,16c0,2.534,1.902,4.611,4.349,4.934   c0.747,3.257,2.718,6.108,5.6,7.973c0.016,0.022,0.035,0.04,0.051,0.062v2.201L14.71,33.1C11.401,33.72,9,36.613,9,39.979V63h46   V39.979C55,36.613,52.599,33.72,49.29,33.1z M17,16c0-1.318,0.86-2.428,2.044-2.829C19.026,13.447,19,13.721,19,14v4   c0,0.281,0.035,0.555,0.053,0.832C17.864,18.433,17,17.321,17,16z M29,29c-1.654,0-3-1.346-3-3c0-1.302,0.839-2.402,2-2.816V25h2   v-2h4v2h2v-1.816c1.161,0.414,2,1.514,2,2.816c0,0.91-0.409,1.569-0.753,1.962L37,28.244V37c0,0.552-0.448,1-1,1s-1-0.448-1-1v-8   H29z M27,30.576C27.614,30.846,28.288,31,29,31h4v3.929C32.68,34.973,32.348,35,32,35c-3.771,0-4.822-2.606-5-3.149V30.576z M47,16   c0,1.321-0.864,2.433-2.053,2.832C44.965,18.555,45,18.281,45,18v-4c0-0.28-0.024-0.553-0.042-0.829C46.141,13.573,47,14.683,47,16   z M27.849,6.028c-0.409,1.525-1.688,2.683-3.277,2.914C25.41,7.716,26.535,6.715,27.849,6.028z M21,18v-4   c0-1.202,0.195-2.381,0.583-3.517C22.343,10.823,23.162,11,24,11c3.309,0,6-2.691,6-6c0-0.599-0.093-1.188-0.276-1.761   C30.473,3.08,31.234,3,32,3c1.363,0,2.664,0.261,3.87,0.716L33,6.586V9h-3v2h3v2h2V7.414l2.765-2.765C40.9,6.59,43,10.05,43,14v4   c0,2.885-1.104,5.578-3.041,7.598C39.751,23.032,37.619,21,35,21h-6c-2.619,0-4.751,2.032-4.959,4.598   C22.105,23.578,21,20.885,21,18z M15.079,35.064L18,34.517V37h-1v2h1v3.104l-2.699,0.3l-0.32-1.601l-1.961,0.393l0.286,1.43   L11,42.882v-2.903C11,37.575,12.716,35.508,15.079,35.064z M45,61V46h-2v15H21V46h-2v15h-8V44.895l2.699-0.3l0.32,1.601   l1.961-0.393l-0.286-1.43l2.525-0.281c1.015-0.111,1.78-0.967,1.78-1.988V39h2v-2h-2v-2.858l5.362-1.005   C26.155,34.814,28.166,37,32,37c0.343,0,0.674-0.026,1-0.06V37c0,1.654,1.346,3,3,3s3-1.346,3-3v-3.795l4.178,0.783l0.75,3.752   l-3.709,4.636l1.562,1.25l4.291-5.364l-0.775-3.876l3.624,0.679C51.284,35.508,53,37.575,53,39.979v2.09   c-1.188,0.149-2.293,0.559-3.261,1.172l-0.844-1.689l-1.789,0.895l1.053,2.105C46.824,45.982,46,47.895,46,50   c0,2.026,0.763,3.873,2.009,5.284l-0.938,2.345l1.857,0.742l0.677-1.693c0.998,0.659,2.152,1.097,3.394,1.253V61H45z    M49.071,52.629l-0.193,0.481C48.325,52.202,48,51.139,48,50c0-1.305,0.423-2.511,1.134-3.496l0.972,1.944l1.789-0.895   l-1.259-2.518c0.697-0.474,1.501-0.799,2.364-0.945V55.91c-0.977-0.165-1.873-0.565-2.63-1.143l0.558-1.396L49.071,52.629z"/>
                    <polygon points="30.293,48.293 27.5,51.086 24.707,48.293 23.293,49.707 26.086,52.5 23.293,55.293 24.707,56.707 27.5,53.914    30.293,56.707 31.707,55.293 28.914,52.5 31.707,49.707  "/>
                    <path d="M36,42c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S37.654,42,36,42z M36,46c-0.552,0-1-0.448-1-1s0.448-1,1-1   s1,0.448,1,1S36.552,46,36,46z"/></g>
                </svg>}
            </div>
        )
} 