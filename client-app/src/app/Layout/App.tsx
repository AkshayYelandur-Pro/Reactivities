import React, {useState, useEffect, Fragment} from 'react';
import { Container, Header, Icon, List } from 'semantic-ui-react';
import axios from 'axios';
import { IActivity } from '../Models/activity';
import { NavBar} from '../../features/nav/NavBar';
import ActivityDashborad from '../../features/activities/dashboard/ActivityDashborad';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';

interface IState{
  activities: IActivity[]
}

const App = ()=> {
const [activities, SetActivities] = useState<IActivity[]>([])
const  [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
const [editMode, setEditMode] = useState(false);
const [loading, setLoading] = useState(true);

const handleSelectActivity= (id: string) => {
  setSelectedActivity(activities.filter(a=> a.id===id)[0]);
  setEditMode(false);
};

const handleOpenCreateFor =()=> {
  setSelectedActivity(null);
  setEditMode(true);
}

const handleCreateActivity=(activity: IActivity) => {
  agent.Activities.create(activity).then(()=> {
    SetActivities([...activities, activity])
    setSelectedActivity(activity);
    setEditMode(false);
  })

}


const handleEditActivity=(activity: IActivity) => {
  agent.Activities.update(activity).then(()=>{
    SetActivities([...activities.filter(a=>a.id!== activity.id), activity])
    setSelectedActivity(activity);
    setEditMode(false);
  })

}

const handleDeleteActivity =(id: string) =>{
  agent.Activities.delete(id).then(()=>{
    SetActivities([...activities.filter(a=>a.id!== id)])
  })

}

useEffect(()=> {
 agent.Activities.list()
  .then((response)=> {
    let activities: IActivity[] =[];
    response.forEach((activity)=> {
      activity.date= activity.date.split('.')[0]
      activities.push(activity);
    })
       SetActivities(activities);
     }).then(()=> setLoading(false));
}, []);

if (loading) return <LoadingComponent content='Loading'/>

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateFor}/>
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashborad
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity!}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity ={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );


}

export default App;
