
import Graph from './components/Graph';
import TableArea from './TableArea';

const page = () => {
return (
  <div>
  <TableArea/>
  <div className="w-1/2">
      <div className="bg-white shadow-lg rounded-xl p-5 h-full">
        <Graph />
      </div>
    </div>
  </div>

)
}

export default page;
