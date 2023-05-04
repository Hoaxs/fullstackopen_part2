
const Course = ({ course }) => {

  return (
    <div>
      {course}
    </div>
  )

}
const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <strong><p>Total of  {sum} exercises</p></strong>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    <Part
      part={parts[0]}
    />
    <Part
      part={parts[1]}
    />
    <Part
      part={parts[2]}
    />
    <Part
      part={parts[3]}
    />
  </>

function App() {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    },
    {
      name: 'Redux',
      exercises: 11
    }
  ]
  const initialValue = 0
  const total = parts.reduce((sum, part) => sum + part.exercises, initialValue)

  return (
    <div>
      <h1><Course course={course} /></h1>
      <Content parts={parts} />
      <Total sum={total} />
    </div>
  );
}

export default App;
