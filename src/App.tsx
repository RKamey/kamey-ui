import { Btn } from './Button/Button';
import { Typography } from 'antd';
import './index.css';

const { Title } = Typography;

function App() {

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Title>
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
