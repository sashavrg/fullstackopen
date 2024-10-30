const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course} />
          <Content course={course} />
          <Total course={course} />
        </div>
      ))}
    </div>
  )
}
const Header = ({course}) => {
  console.log('Header props:', course.name)
  return (
    <>
      <h2>{course.name}</h2>
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
        {course.parts.map((part) => (
          <Part key={part.id} part={part.name} exercises={part.exercises} />
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
      <p><b>Total number of exercises: {totalEx}</b></p>
    </>
  )
}

export default Course