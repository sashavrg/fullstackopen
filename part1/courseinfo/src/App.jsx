const Course = ({ course }) => {
  return (
    <div>
    <Header course={course} />
    <Content course={course} />
    </div>)
  }

const Header = ({course}) => {
  console.log('Header props:', course.name)
  return (
    <>
      <h1>{course.name}</h1>
    </>
  )
}


const Part = ({part, exercises}) => {
  console.log('Part props:', part, exercises)
  return (
    <>
    <li>
      <p>{part} {exercises}</p>
    </li>
    </>
  )
}

const Content = ({ course }) => {
  console.log('Content props:', course)
  return (
    <div>
      <ul>
        {course.parts.map((part, i) => (
          <Part key={i} part={part.name} exercises={part.exercises} />
        ))}
      </ul>
   </div>
  )
}

const Total = ({course}) => {
  console.log('Total props', course)
  const totalEx = course.parts.reduce((sum, part) => sum + part.exercises, 0)
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