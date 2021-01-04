import React, {useState, useEffect, Fragment} from 'react';
import { Container, Header, Icon, List } from 'semantic-ui-react';
import axios from 'axios';
import { IActivity } from '../Models/activity';
import { NavBar} from '../../features/nav/NavBar';
import ActivityDashborad from '../../features/activities/dashboard/ActivityDashborad';

interface IState{
  activities: IActivity[]
}

const App = ()=> {
const [activities, SetActivities] = useState<IActivity[]>([])
const  [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
const [editMode, setEditMode] = useState(false);

const handleSelectActivity= (id: string) => {
  setSelectedActivity(activities.filter(a=> a.id===id)[0]);
  setEditMode(false);
};

const handleOpenCreateFor =()=> {
  setSelectedActivity(null);
  setEditMode(true);
}

const handleCreateActivity=(activity: IActivity) => {
  SetActivities([...activities, activity])
  setSelectedActivity(activity);
  setEditMode(false);
}


const handleEditActivity=(activity: IActivity) => {
  SetActivities([...activities.filter(a=>a.id!== activity.id), activity])
  setSelectedActivity(activity);
  setEditMode(false);
}

const handleDeleteActivity =(id: String) =>{
  SetActivities([...activities.filter(a=>a.id!== id)])
}

useEffect(()=> {
  axios.get<IActivity[]>('http://localhost:5000/api/activities').then((response)=> {
    let activities: IActivity[] =[];
    response.data.forEach(activity=>{
      activity.date= activity.date.split('.')[0]
      activities.push(activity);
    });
       SetActivities(activities);
     });
}, []);


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
