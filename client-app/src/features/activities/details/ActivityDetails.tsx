import React from 'react'
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import { IActivity } from '../../../app/Models/activity'

interface Iprop{
  activity: IActivity;
  setEditMode: (editMode: boolean)=> void;
  setSelectedActivity: (activity: IActivity | null ) => void;
}
 const ActivityDetails: React.FC<Iprop> = ({activity, setEditMode, setSelectedActivity}) => {
    return (
        <Card fluid>
    <Image src={`/assets/${activity.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{activity.title}</Card.Header>
      <Card.Meta>
        <span>{activity.date}</span>
      </Card.Meta>
      <Card.Description>
        {activity.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
        <Button.Group widths={2}>
        <Button onClick={()=>setEditMode(true)} basic color='blue' content='Edit'/>
        <Button onClick={()=>setSelectedActivity(null)} basic color='grey' content='cancel'/>
        </Button.Group>
    </Card.Content>
  </Card>
    )
}
export default ActivityDetails