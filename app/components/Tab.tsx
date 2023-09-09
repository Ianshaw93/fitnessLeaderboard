"use client"
import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import Leaderboard from './Leaderboard';
import MyGroups from './MyGroups';

const renderTabTriggers = (userGroups) => {
  const groupKeys = Object.keys(userGroups);
  return groupKeys.map((key) => {
    const currentGroup = userGroups[key];
    return (
      <>
      <Tabs.Trigger
        className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
        value={`tab-${key}`}
      >
        {currentGroup.groupName}
      </Tabs.Trigger>
      </>
    );
  });
};

const renderTabContents = (userGroups, allPRs) => {
  const groupKeys = Object.keys(userGroups);
  return groupKeys.map((key) => {
    const currentGroup = userGroups[key];
    return (
      <>
      <Tabs.Content
        className="grow bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        value={`tab-${key}`}
      >
        <Leaderboard allPRs={allPRs} groupMembers={currentGroup.userIds} groupName={currentGroup.groupName}/>
      </Tabs.Content>
      </>
    );
  });
};

const GroupTabs = ({allPRs, userGroups}) => {
  // call for groups
  console.log("userGroups: ", userGroups)

return (
    <Tabs.Root
      className=""
      defaultValue="tab1"
    >
      {userGroups && <>
      <Tabs.List className="shrink-0 flex border-b border-mauve6" aria-label="Manage your account">
        <Tabs.Trigger
          className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
          value="tab1"
        >
          All
        </Tabs.Trigger>
        {renderTabTriggers(userGroups)}
        {/* TODO: add group icon */}
        <Tabs.Trigger
          className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
          value="myGroupstab"
        >
          ...
        </Tabs.Trigger>        
        {/* then on click -> show my groups, add, search */}
      </Tabs.List>
      </>
      
      }
      <Tabs.Content
        className="grow bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        value="tab1"
      >
        <Leaderboard allPRs={allPRs}/>
      </Tabs.Content>
      {userGroups && <>
      {/* map through userGroups */}
      {renderTabContents(userGroups, allPRs)}
      <Tabs.Content
        className="grow bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        value="myGroupstab"
      >
        <MyGroups userGroups={userGroups}/>
      </Tabs.Content>
      </>}
    </Tabs.Root>

)
}

;

export default GroupTabs;