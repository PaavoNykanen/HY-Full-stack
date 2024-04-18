const Header = (props) => {
    return <h1>{props.course}</h1>
  }
  
  const Total = (props) => {
    return <p>Total of {props.sumOfExercises} exercises</p>
  }
  
  const Part = ({name, exercises}) => {
    return (
      <p>
        {name} {exercises}
      </p>
    )
  }
  
  const Content = ({parts}) => {
    const sumOfExercises = parts.reduce((sum, part) => sum += part.exercises, 0)
  
    return (
      <div>
        {parts.map(part => (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
        <Total sumOfExercises={sumOfExercises} />
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
      </div>
    )
  }

  export default Course