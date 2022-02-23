import { FaTimes } from 'react-icons/fa';


const Task = ({task, onDelete, toggle}) => {
  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={()=> toggle(task.id)}>
        <h3>{task.text} <FaTimes onClick={() => onDelete(task.id)} style={{color: 'red'}} /></h3> 
        <p>{task.day}</p>
    </div>
  )
}

export default Task