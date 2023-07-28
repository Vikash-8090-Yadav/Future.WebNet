import Navbar from './Navbar';
import { IoMdAddCircle } from 'react-icons/io';

const TodoList = ({ input, setInput, addTask }) => (
  <div className='w-[70%] bg-[#FF6F61] py-4 px-9 rounded-[30px] overflow-y-scroll'>
    <Navbar />
    <h2 className='text-4xl font-bold text-white pb-8'>
      What&apos;s up, Varda!
    </h2>
    <div className='py-3 text-[#68421d]'><b>TODAY&apos;S TASKS</b></div>
    <form className='flex items-center justify-center'>
      <input
        className='rounded-[10px] w-full p-[10px] border-none outline-none bg-[#FF988E] text-white mb-[10px]'
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <IoMdAddCircle
        onClick={addTask}
        className='text-[#C03732] text-[50px] cursor-pointer ml-[20px] mb-[10px]'
      />
    </form>
    <ul>
      {/* Loop through all tasks here using the Task component */}
    </ul>
  </div>
);

export default TodoList;
