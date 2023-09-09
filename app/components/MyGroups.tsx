import React from 'react'


const mapGroups = (userGroups) => {
    console.log("userGroups: ", userGroups)
    const groupKeys = Object.keys(userGroups);
    return groupKeys.map((key) => {
      const currentGroup = userGroups[key];
      console.log("currentGroup: ", currentGroup)
    //   perhaps dropdown?
      return (
        <>
                {currentGroup.groupName}
        </>
      )
    })

}
const MyGroups = ({userGroups}) => {
    console.log("userGroups: ", userGroups)
    return (
        <>
            <div>
                {mapGroups(userGroups)}

            </div>
            {/* <div>
                search
                // allow user to find group and join with passkey
            </div> */}
            <div>
                add
                {/* 
                api call -> add new group
                check that group name is unique 
                allow other users to be added/invited -> search user names?
                or have passkey to join group?
                */}
            </div>        
        </>
    )
}

export default MyGroups