import { Btn } from './Button/Button';
import Title from './Title/Title';

function App() {

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Title
        level={2}
        className="text-red-500"
      >
        KameyUI
      </Title>
      <Btn
      
      >
        Click me
      </Btn>
    </div>
  )
}

export default App
