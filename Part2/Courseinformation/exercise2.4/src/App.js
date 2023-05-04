const Parts = ({ part }) => {
  return (
    <div>

      {part.map(partElement => <p key={partElement.id}>
        {partElement.name}
        {partElement.exercises}</p>
      )}
      <strong>total of <Total part={part} /> exercises</strong>
    </div>
  )
}

const Content = ({ course }) => {

  return (
    <div>
      <Parts part={course.parts} />

    </div>
  )

}

const Courses = ({ course }) => {

  return (
    <div>
      <Header name={course.name} />
    </div>
  )
}


const Header = ({ name }) => {
  return (
    <>{name}</>
  )
}
const Total = ({ part }) => {
  const initialValue = 0
  const total = part.reduce((sum, partElem) => sum + partElem.exercises, initialValue)
  return <>
    {total}
  </>
}



function App() {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <h2><Courses course={courses[0]} /></h2>
      <Content course={courses[0]} />
      <h2><Courses course={courses[1]} /></h2>
      <Content course={courses[1]} />
    </div>
  );
}

export default App;
