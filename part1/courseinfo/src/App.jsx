const Course = ({ course }) => {
  return (
    <div>
    <Header course={course} />
    <Content course={course} />
    </div>)
  }

const Header = (props) => {
  console.log(props)
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}


const Part = (props) => {
  console.log(props)
  return (
    <>
      <p>{props.part} {props.exercises}</p>
    </>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
    <Part part={props.course.parts[0].name} exercises={props.course.parts[0].exercises}/>
    <Part part={props.course.parts[1].name} exercises={props.course.parts[1].exercises}/>
    <Part part={props.course.parts[2].name} exercises={props.course.parts[2].exercises}/>
   </div>
  )
}

const Total = (props) => {
  console.log(props)
  const totalEx = props.course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <>
      <p>Number of exercises {totalEx}</p>
    </>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <>
      <Course course={course} />
      <Total course={course}/>
    </>
  )
}


export default App