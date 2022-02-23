import Button from "./Button"
const Header = ({ showAddTask, changeButtonTextOntoggle }) => {

  return (
    <header className="header">
      <h2>Todo-Task-Tracker</h2>
      <Button color={changeButtonTextOntoggle ? 'red' : 'green'} text={changeButtonTextOntoggle ? 'Close' : 'Add'} onclick={showAddTask} />
    </header>
  )
}

export default Header