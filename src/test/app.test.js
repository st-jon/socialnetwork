import React from 'react'
import axios from '../axios'
import {shallow} from 'enzyme'

import App from '../components/App'

jest.mock('../axios')

test('Puts retrieved data in state', async () => {

    axios.get.mockResolvedValue({
        data: {
           rows: [{
            firstName: 'christophe',
            lastName: 'johanny',
            profilePic: '/defaultpic.jpg',
            id: 1
            }]    
        }
    })
    const wrapper = shallow(<App />, {
        disableLifecycleMethods: true
    })
    await wrapper.instance().componentDidMount()

    expect(wrapper.find('ProfilePic').length).toBe(1)
})
